import { useState, useEffect } from "react";
import TextInput from "../components/NLInputField";
import { firestore } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { handleOnSend } from "../backend/getFinanceInfo";
import "./Home.css";
import { Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

interface Finance {
  id: string;
  type: string;
  quantity: number;
  description: string;
  title: string;
  category: string;
}

export function Home() {
  const { userId } = useAuth();
  const [finances, setFinances] = useState<Finance[]>([]);
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
  return (
    <>
    <Navbar />
    <div className="container">
      <h1>Finanzas Personales</h1>
      <p>
        Mediante el uso de lenguaje natural escribe tus gastos o ingresos. Deja
        que la IA se encargue de clasificarlos y organizarlos.
      </p>
      <TextInput onSend={(input)=>handleOnSend(userId, input)} />
      <h2>Finanzas</h2>
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
                  } $${finance.quantity}`}</p>
                  <p>{finance.category}</p>
                </section>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
    </>
  );
}
