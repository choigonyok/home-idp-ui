import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
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

const CustomSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  outline: none;
`;

const Option = styled.option`
  font-size: 16px;
  color: #333;
`;

const RoleSelect = ({ label, options, onChange, placeholder }) => {
  const [selectedRole, setSelectedRole] = useState("");
  
  const handleSelectChangeTest = (event) => {
    const selectedObject = options.find((item) => item.id === event.target.value);
    setSelectedRole(selectedObject.id);
    onChange(selectedObject);
  };

  return (
    <Container>
      <StyledInputWrapper>
        <Label>
          <Icon>🔽</Icon> {label}
        </Label>
        <CustomSelect value={selectedRole} onChange={handleSelectChangeTest}>
          <Option value="" disabled>
            {placeholder}
          </Option>
          {options.map((option, index) => (
            <Option key={index} value={option.id}>
              {option.name}
            </Option>
          ))}
        </CustomSelect>
      </StyledInputWrapper>
    </Container>
  );
};

export default RoleSelect;