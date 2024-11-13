import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #2f3542;
  color: #dcdde1;
`;

const TableHead = styled.thead`
  background-color: #57606f;
  color: white;
  text-transform: uppercase;
`;

const TableRow = styled.tr`
`;

const TableCell = styled.td`
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #57606f;
  &:hover {
    background-color: #4b4f57;
  }
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  border-bottom: 2px solid #2f3542;
  font-weight: bold;
`;

const RoleTable = ({ data, columns, onClickRole}) => {
  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.accessor}>{column.Header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} onClick={()=>onClickRole(row)}>
              {columns.map((column, index) => (
                <TableCell>{row[column.accessor]}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default RoleTable;