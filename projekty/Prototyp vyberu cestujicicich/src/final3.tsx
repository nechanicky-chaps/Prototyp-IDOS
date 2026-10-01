import React from 'react';
import ReactDOM from 'react-dom/client';
import Final1Page from './Final1Page';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Final1Page purchaseStartsWithPassengers passengerListDensity="compact" addPassengerControl="plus" inlinePassengerAdd showInlineAddTitle={false} fareSelectAdvances />
  </React.StrictMode>,
);
