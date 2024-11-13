import React, { useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
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

const HiddenFileInput = styled.input`
  display: none;
`;

const CustomFileButton = styled.button`
  padding: 10px 16px;
  background-color: #191b27;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
`;

const FileNameDisplay = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const File = ({ label, onChange }) => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(e);
    }
  };

  return (
    <Container>
      <StyledInputWrapper>
        <Label>
          <Icon>📎</Icon> {label}
        </Label>
          <CustomFileButton type="button" onClick={handleButtonClick}>
            Select File
          </CustomFileButton>
          {fileName && <FileNameDisplay>{fileName}</FileNameDisplay>}
        <HiddenFileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </StyledInputWrapper>
    </Container>
  );
};

export default File;
