import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Modal.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#e0e0e0', // Cinza claro
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({ alunos, deletarAluno, editaClique, visualizaClique }) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="left">Nome</StyledTableCell>
            <StyledTableCell align="left">Idade</StyledTableCell>
            <StyledTableCell align="center">Profissao</StyledTableCell>
            <StyledTableCell align="right" sx={{ paddingRight: '55px' }}>Sexo</StyledTableCell>
            <StyledTableCell align="right">Ações</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {alunos.map((aluno, index) => (
            <StyledTableRow key={index} className={index === 0 ? 'blue-row' : ''}>
              <StyledTableCell align="left">{aluno.nome}</StyledTableCell>
              <StyledTableCell align="left">{aluno.idade}</StyledTableCell>
              <StyledTableCell align="center">{aluno.profissao}</StyledTableCell>
              <StyledTableCell align="right" sx={{ paddingRight: '40px' }}>{aluno.sexo}</StyledTableCell>
              <StyledTableCell align="right">
                <button className='btnTabelaDelete' onClick={(e) => deletarAluno(aluno, index, e)}><DeleteIcon /></button>
                <button className='btnTabelaEditar' onClick={(e) => editaClique(aluno, index, e)}><EditIcon /></button>
                <button className='btnTabelaVisualizar' onClick={(e) => visualizaClique(aluno, index, e)}><RemoveRedEyeIcon /></button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
