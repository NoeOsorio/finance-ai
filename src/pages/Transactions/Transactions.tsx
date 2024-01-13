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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TextInput from "../../components/NLInputField/NLInputField";
import { firestore } from "../../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { handleOnSend } from "../../backend/getFinanceInfo";
import { Card, CardContent } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import './Transactions.css';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  title: string;
  category: string;
}

const RecentTransactions: React.FC = () => {
  const { userId } = useAuth();
  const [finances, setFinances] = useState<Transaction[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchFinances = async () => {
      try {
        const financesCol = collection(firestore, `/users/${userId}/transactions`);

        const unsubscribe = onSnapshot(financesCol, (snapshot) => {
          const financeList: Transaction[] = snapshot.docs.map((doc) => ({
            ...(doc.data() as Transaction),
            id: doc.id,
          }));
          setFinances(financeList);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchFinances();
  }, [userId]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
    >
      <p>
        Mediante el uso de lenguaje natural escribe tus gastos o ingresos. Deja
        que la IA se encargue de clasificarlos y organizarlos.
      </p>
      <TextInput onSend={(input) => handleOnSend(userId, input)} />
      <h2>Finanzas</h2>
      {isMobile ? (
        <div className="card-container">
          {finances.map((finance) => {
            const isIncome = finance.type === "INCOME";
            return (
              <Card key={finance.id} variant="outlined">
                <CardContent>
                  <h3>{finance.title}</h3>
                  <p className="description">{finance.description}</p>
                  <section>
                    <p className={isIncome ? "income" : "spent"}>{`${
                      isIncome ? "+" : "-"
                    } $${finance.amount}`}</p>
                    <p>{finance.category}</p>
                  </section>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
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
                <TableCell>Título</TableCell>
                {/* <TableCell>Fecha</TableCell> */}
                <TableCell>Descripción</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finances.map((transaction, index) => {
                const isIncome = transaction.type === "INCOME";
                return (
                  <TableRow key={index}>
                    {/* <TableCell>{transaction.date}</TableCell> */}
                    <TableCell>{transaction.title}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className={isIncome ? "income" : "spent"}>
                      {" "}
                      {`${isIncome ? "+" : "-"}`} ${transaction.amount}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" size="large">
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="large">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default RecentTransactions;
