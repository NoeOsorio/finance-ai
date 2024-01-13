// RecentTransactions.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Transaction = {
  date: string;
  category: string;
  description: string;
  amount: number;
};

const RecentTransactions: React.FC = () => {
  const transactions : Transaction[] = [
    {
      date: "2022-01-01",
      category: "Comida",
      description: "Almuerzo",
      amount: 150,
    },
    {
      date: "2022-01-02",
      category: "Transporte",
      description: "Taxi",
      amount: 80,
    },
    // ... otras transacciones
  ];
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "15px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        mt: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>
                <IconButton aria-label="edit" size="large">
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentTransactions;
