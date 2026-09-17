// Vite probes mapped drives on Windows with `net use`. This workspace forbids
// inspecting network drives, so suppress that optional probe before loading Vite.
import childProcess from 'node:child_process';
import { syncBuiltinESMExports } from 'node:module';
const originalExec = childProcess.exec;
childProcess.exec = function (command, ...args) {
  if (typeof command === 'string' && /^\s*net\s+use\s*$/i.test(command)) {
    const callback = args.findLast(arg => typeof arg === 'function');
    if (callback) queueMicrotask(() => callback(new Error('Network-drive discovery disabled by workspace policy'), '', ''));
    return new childProcess.ChildProcess();
  }
  return originalExec.call(this, command, ...args);
};
syncBuiltinESMExports();
process.argv.push('--configLoader', 'native');
await import('vite/bin/vite.js').catch(async error => {
  if (error.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') throw error;
  const { pathToFileURL } = await import('node:url');
  const { dirname, resolve } = await import('node:path');
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  await import(pathToFileURL(resolve(dirname(require.resolve('vite/package.json')), 'bin/vite.js')).href);
});
