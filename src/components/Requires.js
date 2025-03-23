

import { Paper, Typography, Box, Button, Divider, Grid, Badge, TableContainer } from "@mui/material";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PaperHeader from "./PaperHeader";
import { useLayout } from "providers/LayoutProvider";
import { padding } from "@mui/system";

function createData(name, min, max) {
  return { name, min, max };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Requires() {

  const { getStringLanguage } = useLayout();

  const rows = [
    createData(getStringLanguage('Processador'), '2.8 Ghz', '3.5 Ghz'),
    createData(getStringLanguage('Memória'), '4GB', '8GB'),
    createData(getStringLanguage('Sistema Operacional'), 'Windows 7', 'Windows 10/11'),
    createData('VGA', '1GB', '4GB'),
    createData('Internet', '1 Mbps', '2 Mbps'),
  ];

  return (
    <Box marginY={2} className="flex_col" sx={{ height: '100%' }} >
      <Box mb={4}>
        <PaperHeader icon={<SettingsSuggestIcon color="primary" fontSize="large" />}
          title={getStringLanguage("Requisitos de Sistema")} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow sx={{ paddingY: 16 }}>
              <StyledTableCell>{getStringLanguage('Componente')}</StyledTableCell>
              <StyledTableCell align="center">{getStringLanguage('Mínimo')}</StyledTableCell>
              <StyledTableCell align="center">{getStringLanguage('Recomendado')}</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.min}</StyledTableCell>
                <StyledTableCell align="center">{row.max}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Requires;
