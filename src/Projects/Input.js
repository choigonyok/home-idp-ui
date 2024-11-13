import React from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  width: 400px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #191b27;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 8px;
`;

const StyledInput = styled.input`
  font-size: 16px;
  padding: 12px;
  border-radius: 8px;
  outline: none;
`;

const StyledInputError = styled.input`
  font-size: 16px;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  border-color: red;
`;

const Input = ({ label, type = "text", value, onTextChange, placeholder, error, errorNoTitle }) => {
  const handleTextChange = (e) => {
    onTextChange(e.target.value);
  };

  return (
    <Container>
      <StyledInputWrapper>
        <Label>
          <Icon>🔗</Icon> {label}
        </Label>
        {error ?
          <StyledInputError type={type} value={value}  onChange={handleTextChange} placeholder={placeholder}/>
          :
          <StyledInput type={type} value={value} style={errorNoTitle ? {border: "2px solid red"}:{border: "2px solid #ccc"}} onChange={handleTextChange} placeholder={placeholder}/>
        }
      </StyledInputWrapper>
    </Container>
  );
};

export default Input;
