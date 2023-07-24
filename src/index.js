import React from 'react';
import ReactDOM from 'react-dom/client';
import EquipmentForm from './EquipmentForm';
import './style.css';
import Sidebar from './sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Sidebar />
  <div className="app">
    <h1 className="title">裝備卷軸計算機</h1>
    <div className="container">
      <EquipmentForm />
    </div>
  </div>
  </React.StrictMode>
);
