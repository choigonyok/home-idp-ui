import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

const CloseButton = styled.button`
margin-top: 16px;
padding: 8px 16px;
background: #333;
color: white;
border: none;
border-radius: 8px;
cursor: pointer;
`;

const ButtonRow = styled.div`
display: flex;
align-items: center;
gap: 16px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  `;

const PopupContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

// display: flex;           /* Flexbox 적용 */
  // width: 100%;
  // padding: 20px;
  // justify-content: space-between;  /* 공간을 균등하게 배치 */
  // align-items: flex-start; /* 세로 정렬 설정 */
  
const Title = styled.h2`
  margin-bottom: 16px;
  color: #333;
`;

const Popup = ({ onSave, onClose, onDelete, title, children, title2, children2, title3, children3, useDelete }) => {
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleClosePopup = () => {
    onClose()
    return
  };
  
  return (
    <Overlay className="overlay">      
      {children2 && children3 ? 
        <PopupContainer>
          <Title>{title2}</Title>
          {children2}
          <br/>
          <Title>{title3}</Title>
          {children3}
        </PopupContainer>
      :""}    
      <PopupContainer>
        <Title>{title}</Title>
        {children}
      <ButtonRow>
        <CloseButton onClick={onSave}>Save</CloseButton>
        {useDelete?
          <CloseButton onClick={onDelete}>Delete</CloseButton>
        :""}
        <CloseButton onClick={handleClosePopup}>Close</CloseButton>
      </ButtonRow>          
      </PopupContainer>  
    </Overlay>
  );
};

export default Popup;
