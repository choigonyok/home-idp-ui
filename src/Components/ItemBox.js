import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: #2c2c2c; /* 항목 박스 배경 */
  color: white;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const RemoveButton = styled.button`
  display: flex;
  background: none;
  border: none;
  color: #ff4c4c;
  font-size: 16px;
  margin-left: 12px;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #ff0000;
  }
`;


const ItemBox = ({content, onDelete}) => {
  return <Box>
    {content.name}
    <RemoveButton onClick={() => onDelete(content.id)}>X</RemoveButton>
  </Box>
}

export default ItemBox;


