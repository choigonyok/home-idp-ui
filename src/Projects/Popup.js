import React from 'react';
import './Popup.css';  // 팝업 스타일 정의
import DockerfileInput from './DockerfileInput';

function Popup({ handleClose }) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
          <DockerfileInput/>
      </div>
    </div>
  );
}

export default Popup;