import { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TextInput from "../components/NLInputField";
import { firestore } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { handleOnSend } from "../backend/getFinanceInfo";
import "./Home.css";
import { Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import SideNavigationBar from "../components/SideNavigationBar";
import FinancialSummary from "../components/FinancialSummary";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

interface Finance {
  id: string;
  type: string;
  quantity: number;
  description: string;
  title: string;
  category: string;
}

export function Dashboard() {
  const { userId } = useAuth();
  const [finances, setFinances] = useState<Finance[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    const fetchFinances = async () => {
      try {
        const financesCol = collection(firestore, `/users/${userId}/finances`);

        const unsubscribe = onSnapshot(financesCol, (snapshot) => {
          const financeList: Finance[] = snapshot.docs.map((doc) => ({
            ...(doc.data() as Finance),
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

  // <>
  //   <Navbar />
  //   <div className="container">
  //     <SideNavigationBar />
  //     <h1>Finanzas Personales</h1>
  //     <p>
  //       Mediante el uso de lenguaje natural escribe tus gastos o ingresos.
  //       Deja que la IA se encargue de clasificarlos y organizarlos.
  //     </p>
  //     <TextInput onSend={(input) => handleOnSend(userId, input)} />
  //     <h2>Finanzas</h2>
  //     <div className="card-container">
  //       {finances.map((finance) => {
  //         const isIncome = finance.type === "INCOME";
  //         return (
  //           <Card key={finance.id} variant="outlined">
  //             <CardContent>
  //               <h3>{finance.title}</h3>
  //               <p className="description">{finance.description}</p>
  //               <section>
  //                 <p className={isIncome ? "income" : "spent"}>{`${
  //                   isIncome ? "+" : "-"
  //                 } $${finance.quantity}`}</p>
  //                 <p>{finance.category}</p>
  //               </section>
  //             </CardContent>
  //           </Card>
  //         );
  //       })}
  //     </div>
  //   </div>
  // </>
  // Datos de ejemplo, puedes reemplazarlos con datos reales
  const balance = 5000;
  const income = 3000;
  const expenses = 1500;

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavigationBar
        isOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: `calc(100% - ${isMobile ? 0 : 240}px)`,
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              Dashboard Principal
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <FinancialSummary
            balance={balance}
            income={income}
            expenses={expenses}
          />
          {/* Aquí puedes agregar más componentes o contenido */}
        </Container>
      </Box>
    </Box>
  );
}
