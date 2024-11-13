import { useState } from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  width: 400px;
  height: 600px;
`;

const Title = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #191b27;
  `;
  
const StyledTextarea = styled.textarea`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  height: 600px;
  padding: 12px;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: #f9f9f9;
`;

const CustomTextarea = ({ errorNotJson, value, onTextChange, placeholder, label }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;

      const newValue =
        value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);

        onTextChange(newValue);

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    onTextChange(value);
  };

  return (
    <Container>
      <StyledInputWrapper>
        <Title>🔗 {label}</Title>
          <StyledTextarea
            style={!errorNotJson? {border: "2px solid #ccc"}:{border: "2px solid red"}}
            placeholder={placeholder}
            onKeyDown={handleKeyDown} 
            value={value}
            onChange={handleTextChange}
          />
      </StyledInputWrapper>
    </Container>
  );
};

export default CustomTextarea;
