import { Container, useMediaQuery, useTheme } from "@mui/material";
import FinancialSummary from "../components/FinancialSummary";
import { Transaction, collection, doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../firebase/firebaseConfig";

type BalanceData = {
  balance: number;
  income: number;
  expenses: number;
};

export function Dashboard() {
  const { userId } = useAuth();
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userDocRef = doc(firestore, `/users/${userId}`);

        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
          const { balance, income, expenses } = snapshot.data() as BalanceData;
          setBalanceData({ balance, income, expenses });
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchBalance();
  }, [userId]);
  const { balance, income, expenses } = balanceData || {
    balance: 0,
    income: 0,
    expenses: 0,
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <FinancialSummary balance={balance} income={income} expenses={expenses} />
      {/* Aquí puedes agregar más componentes o contenido */}
    </Container>
  );
}
