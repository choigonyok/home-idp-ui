import React from 'react';
import styled from 'styled-components';

// 각 단계의 상태에 따른 색상 정의
const statusColors = {
  END: '#4CAF50',
  START: '#FFC107',
  failed: '#F44336',
  PENDING: 'lightgray',
  none: 'transparent',
};

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; 
  margin: 0 10px;
  height: 80px;
  padding: 10px;
  border: 2px ${({ status }) => statusColors[status] || '#9E9E9E'};
  border-radius: 8px;
  background-color: ${({ status }) => statusColors[status] || '#E0E0E0'};
  color: black;
  text-align: center;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Duration = styled.div`
  font-size: 12px;
`;

function PipelineStep({label, duration, status }) {
  return (
    <StepContainer status={status}>
      <Label>{label}</Label>
      <Duration>{duration}</Duration>
    </StepContainer>
  );
}

export default PipelineStep;