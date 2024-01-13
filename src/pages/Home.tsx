import {
  Container,
} from "@mui/material";
import "./Home.css";
import FinancialSummary from "../components/FinancialSummary";


export function Dashboard() {
  // Datos de ejemplo, puedes reemplazarlos con datos reales
  const balance = 5000;
  const income = 3000;
  const expenses = 1500;

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <FinancialSummary balance={balance} income={income} expenses={expenses} />
      {/* Aquí puedes agregar más componentes o contenido */}
    </Container>
  );
}
