import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;


const Input = styled.input`
font-size: 16px;
padding: 12px;
border: 1px solid #ccc;
border-radius: 8px;
outline: none;
`;

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 150px;
  overflow-y: auto;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
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

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  width: 400px;
`;


// AutoComplete Component
function AutoComplete({ label, suggestions, onAdd }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 입력 변경 처리
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.key.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // 리스트 아이템 클릭 시 입력값 설정
  const handleSuggestionClick = (suggestion) => {
    setInputValue('');
    onAdd(suggestion);
    setShowSuggestions(false);
  };

  return (
    <Container>
      <StyledInputWrapper>
      <Label>
          <Icon>🔗</Icon> {label}
        </Label>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="TEST_KEY"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <SuggestionsList>
          {filteredSuggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.key}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
      </StyledInputWrapper>
    </Container>
  );
}

export default AutoComplete;
