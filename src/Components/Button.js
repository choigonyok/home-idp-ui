import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #34495e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #3b5998;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background-color: #9E9E9E;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Button = ({ onClick, label, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {label}
    </StyledButton>
  );
};

export default Button;
