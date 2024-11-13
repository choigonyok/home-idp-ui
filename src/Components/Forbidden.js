import React from "react";
import styled from "styled-components";

const ForbiddenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  background-color: #f9f9f9;
  color: #333;
  height: 100vh;
`;

const IconWrapper = styled.div`
  font-size: 72px;
  color: #e74c3c; /* 경고색 (빨간색) */
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  max-width: 400px;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff; /* 파란색 버튼 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* 호버 시 더 어두운 파란색 */
  }
`;

const Forbidden = ({message}) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <ForbiddenContainer>
      <IconWrapper>🚫</IconWrapper>
      <Title>Insufficient permissions</Title>
      <Description>
        {message}
      </Description>
      <BackButton onClick={handleGoBack}>Go Back</BackButton>
    </ForbiddenContainer>
  );
};

export default Forbidden;
