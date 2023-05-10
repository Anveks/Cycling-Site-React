//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import RouteModel from '../../../Models/RouteModel';
import { Close } from '@mui/icons-material';
import RouteDetails from '../../DataArea/RouteDetails/RouteDetails';

interface RouteModalProps {
  route: RouteModel;
  onClose: () => void;
}

const RouteModal: React.FC<RouteModalProps> = ({ route, onClose }) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  return ReactDOM.createPortal(
    <div className="RouteModal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <RouteDetails route={route} />
      </div>
      <div className="modal-overlay" onClick={onClose}></div>
    </div>,
    modalRoot
  ) as React.ReactPortal;
}

export default RouteModal;
