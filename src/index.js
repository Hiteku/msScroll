import React from 'react';
import ReactDOM from 'react-dom/client';
import EquipmentForm from './EquipmentForm';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <div className="app">
    <h1 className="title">裝備卷軸計算機</h1>
    <div className="container">
      <EquipmentForm />
    </div>
  </div>
  </React.StrictMode>
);
