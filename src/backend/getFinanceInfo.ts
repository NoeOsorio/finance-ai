import { firestore } from "../firebase/firebaseConfig";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import axios from "axios";

interface FinanceData {
  type: string;
  amount: number;
  description: string;
  title: string;
  category: string;
  date: Date;
}

const handleOnSend = async (
  userId: string | null,
  userInput: string
): Promise<void> => {
  let financeData: FinanceData;
  if (!userId) return;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        max_tokens: 100,
        messages: [
          {
            role: "system",
            content: `Analiza el siguiente texto y categoriza si es un gasto o ingreso. Luego, extrae y devuelve los detalles relevantes en un formato JSON. El texto es: '${userInput}'. El JSON debe contener los campos: 'type' (que debe ser 'SPENT' para un gasto o 'INCOME' para un ingreso), 'amount' (monto del gasto o ingreso), 'description' (una breve descripción), 'title' (un título resumido), y 'category' (la categoría del gasto o ingreso, basada en el contexto del texto).`,
          },
        ],
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = JSON.parse(response.data.choices[0].message.content);

    financeData = {
      type: responseJson.type,
      amount: responseJson.amount,
      description: responseJson.description,
      title: responseJson.title,
      category: responseJson.category,
      date: new Date(),
    };
  } catch (error) {
    console.error("Error al obtener la respuesta de OpenAI: ", error);
    return;
  }

  try {
    const financesCol = collection(firestore, `/users/${userId}/transactions`);
    await addDoc(financesCol, financeData);

    // Actualizar el estado financiero del usuario
    const userDocRef = doc(firestore, `/users/${userId}`);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      let { balance = 0, income = 0, expenses = 0, transactionCount = 0 } = userData;
      console.log("userData: ", userData);
      if (financeData.type === "INCOME") {
        balance += financeData.amount;
        income += financeData.amount;
      } else if (financeData.type === "SPENT") {
        balance -= financeData.amount;
        expenses += financeData.amount;
      }

      await updateDoc(userDocRef, {
        balance,
        income,
        expenses,
        transactionCount: transactionCount + 1,
        lastTransactionDate: new Date(),
      });
    }
  } catch (error) {
    console.error("Error al guardar en Firestore: ", error);
  }
};

export { handleOnSend };
