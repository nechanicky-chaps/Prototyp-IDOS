"""Create a concise, sendable PDF from the featured local screenshot catalogue."""
from __future__ import annotations

import json
import math
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parent
WORKSPACE = ROOT.parents[2]
OUTPUT = WORKSPACE / "output" / "pdf" / "prehled-vyberu-cestujicich-mobilni-aplikace.pdf"
PAGE_W, PAGE_H = landscape(A4)


def clean(value: str) -> str:
    return (value.replace("\u2011", "-").replace("\u2013", "-")
            .replace("\u2014", "-").replace("\u00a0", " "))


def load_catalog():
    raw = (ROOT / "catalog.js").read_text(encoding="utf-8")
    prefix = "window.MOBILE_CATALOG = "
    if not raw.startswith(prefix):
        raise ValueError("Unexpected catalogue wrapper")
    return json.loads(raw[len(prefix):].rstrip().removesuffix(";"))


def register_fonts():
    fonts = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("BriefSans", str(fonts / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("BriefSansBold", str(fonts / "arialbd.ttf")))


def lines(text: str, font: str, size: float, width: float):
    words = clean(text).split()
    result, current = [], ""
    for word in words:
        trial = word if not current else current + " " + word
        if pdfmetrics.stringWidth(trial, font, size) <= width:
            current = trial
        else:
            if current:
                result.append(current)
            current = word
    if current:
        result.append(current)
    return result


def draw_wrapped(c, text, x, y, width, font="BriefSans", size=9.2,
                 leading=12, color=HexColor("#435150"), max_lines=None):
    wrapped = lines(text, font, size, width)
    if max_lines and len(wrapped) > max_lines:
        wrapped = wrapped[:max_lines]
        last = wrapped[-1]
        while last and pdfmetrics.stringWidth(last + "...", font, size) > width:
            last = last[:-1]
        wrapped[-1] = last.rstrip() + "..."
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrapped:
        c.drawString(x, y, line)
        y -= leading
    return y


def footer(c, page_number):
    c.setStrokeColor(HexColor("#d7dfdb"))
    c.line(40, 28, PAGE_W - 40, 28)
    c.setFont("BriefSans", 7.5)
    c.setFillColor(HexColor("#6d7a76"))
    c.drawString(40, 15, "Pracovní obrazový přehled - 15. 9. 2026")
    c.drawRightString(PAGE_W - 40, 15, str(page_number))


def crop_panels(screen):
    path = ROOT / screen["src"]
    image = Image.open(path).convert("RGB")
    ratio = image.height / image.width
    if ratio <= 3:
        return [(image, screen["title"])]
    count = min(6, math.ceil(ratio / 2.15))
    panels = []
    for index in range(count):
        top = round(image.height * index / count)
        bottom = round(image.height * (index + 1) / count)
        label = f'{screen["title"]} - část {index + 1}/{count}'
        panels.append((image.crop((0, top, image.width, bottom)), label))
    return panels


def draw_panel_grid(c, panels, x, y, width, height):
    count = len(panels)
    cols = 1 if count == 1 else 2 if count <= 4 else 3
    rows = math.ceil(count / cols)
    gap = 10
    cell_w = (width - gap * (cols - 1)) / cols
    cell_h = (height - gap * (rows - 1)) / rows
    for index, (image, label) in enumerate(panels):
        row, col = divmod(index, cols)
        cell_x = x + col * (cell_w + gap)
        cell_y = y + height - (row + 1) * cell_h - row * gap
        c.setFillColor(white)
        c.setStrokeColor(HexColor("#d5ddda"))
        c.roundRect(cell_x, cell_y, cell_w, cell_h, 6, fill=1, stroke=1)
        caption_h = 22
        max_w, max_h = cell_w - 12, cell_h - caption_h - 12
        scale = min(max_w / image.width, max_h / image.height)
        draw_w, draw_h = image.width * scale, image.height * scale
        image_x = cell_x + (cell_w - draw_w) / 2
        image_y = cell_y + caption_h + (max_h - draw_h) / 2 + 5
        c.drawImage(ImageReader(image), image_x, image_y, draw_w, draw_h,
                    preserveAspectRatio=True, mask="auto")
        c.setFillColor(HexColor("#596762"))
        c.setFont("BriefSans", 7.2)
        caption = clean(label)
        if pdfmetrics.stringWidth(caption, "BriefSans", 7.2) > cell_w - 12:
            caption = lines(caption, "BriefSans", 7.2, cell_w - 12)[0] + "..."
        c.drawCentredString(cell_x + cell_w / 2, cell_y + 8, caption)


def title_page(c, apps):
    c.setFillColor(HexColor("#f3f6f2"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(HexColor("#1f5a49"))
    c.rect(0, 0, 18, PAGE_H, fill=1, stroke=0)
    c.setFont("BriefSans", 10)
    c.setFillColor(HexColor("#577069"))
    c.drawString(54, PAGE_H - 58, "PODKLAD PRO DISKUSI")
    c.setFont("BriefSansBold", 34)
    c.setFillColor(HexColor("#172324"))
    c.drawString(54, PAGE_H - 112, "Výběr cestujících")
    c.drawString(54, PAGE_H - 152, "v mobilních aplikacích")
    c.setFont("BriefSans", 17)
    c.setFillColor(HexColor("#4f605b"))
    c.drawString(54, PAGE_H - 190, "Pracovní obrazový přehled")
    intro = ("Vybrané obrazovky 15 dopravních a tarifních aplikací. U každého příkladu "
             "je krátký popis viditelného řešení a poznámky z uživatelského průzkumu.")
    draw_wrapped(c, intro, 54, PAGE_H - 235, 410, size=11, leading=16)
    c.setFillColor(white)
    c.setStrokeColor(HexColor("#d7dfdb"))
    c.roundRect(505, 68, 280, 445, 12, fill=1, stroke=1)
    c.setFont("BriefSansBold", 11)
    c.setFillColor(HexColor("#172324"))
    c.drawString(530, 483, "Obsažené aplikace")
    y = 452
    for index, app in enumerate(apps, 1):
        c.setFillColor(HexColor(app["color"]))
        c.circle(535, y + 3, 3, fill=1, stroke=0)
        c.setFillColor(HexColor("#263432"))
        c.setFont("BriefSans", 9.5)
        c.drawString(548, y, f'{index:02d}  {clean(app["name"])}')
        y -= 24
    c.setFillColor(HexColor("#e5eee8"))
    c.roundRect(54, 65, 410, 66, 8, fill=1, stroke=0)
    note = ("Rozsah: pouze screenshoty dodané v rámci průzkumu. Dokument není návrhem "
            "IDOS ani úplným tarifním auditem.")
    draw_wrapped(c, note, 70, 105, 375, size=9.2, leading=13, color=HexColor("#315348"))


def provider_page(c, app, page_number):
    featured = [screen for screen in app["screens"] if screen.get("featured", True)]
    accent = HexColor(app["color"])
    c.setFillColor(HexColor("#f7f8f5"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(accent)
    c.rect(0, PAGE_H - 9, PAGE_W, 9, fill=1, stroke=0)
    c.setFont("BriefSans", 8.5)
    c.setFillColor(HexColor("#6d7a76"))
    c.drawString(40, PAGE_H - 39, f'{page_number - 1:02d} / MOBILNÍ APLIKACE')
    c.setFont("BriefSansBold", 25)
    c.setFillColor(HexColor("#172324"))
    c.drawString(40, PAGE_H - 72, clean(app["name"]))
    c.setFont("BriefSans", 9)
    c.setFillColor(HexColor("#65736f"))
    c.drawRightString(PAGE_W - 40, PAGE_H - 62,
                      f'{len(featured)} vybrané obrazovky' if len(featured) != 1 else '1 vybraná obrazovka')

    panels = []
    for screen in featured:
        panels.extend(crop_panels(screen))
    draw_panel_grid(c, panels, 40, 55, 510, 440)

    text_x, text_w = 580, PAGE_W - 620
    y = PAGE_H - 108
    c.setFont("BriefSansBold", 10.5)
    c.setFillColor(HexColor("#1f5a49"))
    c.drawString(text_x, y, "CO JE VIDĚT")
    y -= 24
    for screen in featured:
        c.setFont("BriefSansBold", 9.4)
        c.setFillColor(HexColor("#202d2b"))
        y = draw_wrapped(c, screen["title"], text_x, y, text_w,
                         font="BriefSansBold", size=9.4, leading=12, color=HexColor("#202d2b"), max_lines=2)
        y -= 3
        y = draw_wrapped(c, screen["description"], text_x, y, text_w,
                         size=8.3, leading=11, max_lines=5)
        y -= 14

    notes = []
    for screen in featured:
        notes.extend(screen.get("userNotes") or [])
    if notes and y > 85:
        c.setStrokeColor(HexColor("#d4ddd8"))
        c.line(text_x, y + 4, text_x + text_w, y + 4)
        y -= 17
        c.setFont("BriefSansBold", 10.5)
        c.setFillColor(HexColor("#1f5a49"))
        c.drawString(text_x, y, "POZNATKY Z PRŮZKUMU")
        y -= 21
        for note in notes:
            c.setFillColor(accent)
            c.circle(text_x + 3, y + 3, 2.2, fill=1, stroke=0)
            y = draw_wrapped(c, note, text_x + 13, y, text_w - 13,
                             size=8.3, leading=11, max_lines=5)
            y -= 9
            if y < 48:
                break
    footer(c, page_number)


def build():
    register_fonts()
    apps = load_catalog()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("Výběr cestujících v mobilních aplikacích - pracovní přehled")
    c.setAuthor("CHAPS - pracovní podklad")
    title_page(c, apps)
    footer(c, 1)
    c.showPage()
    for page_number, app in enumerate(apps, 2):
        provider_page(c, app, page_number)
        c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
