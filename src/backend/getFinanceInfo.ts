import { firestore } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";

interface FinanceData {
  type: string;
  quantity: number;
  description: string;
  title: string;
  category: string;
}

const handleOnSend = async (userInput: string): Promise<void> => {
  let financeData: FinanceData;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        max_tokens: 100,
        messages: [
          {
            role: "system",
            content: `Analiza el siguiente texto y categoriza si es un gasto o ingreso. Luego, extrae y devuelve los detalles relevantes en un formato JSON. El texto es: '${userInput}'. El JSON debe contener los campos: 'type' (que debe ser 'SPENT' para un gasto o 'INCOME' para un ingreso), 'quantity' (monto del gasto o ingreso), 'description' (una breve descripción), 'title' (un título resumido), y 'category' (la categoría del gasto o ingreso, basada en el contexto del texto).`,
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
      quantity: responseJson.quantity,
      description: responseJson.description,
      title: responseJson.title,
      category: responseJson.category,
    };
  } catch (error) {
    console.error("Error al obtener la respuesta de OpenAI: ", error);
    return;
  }

  try {
    const userId = process.env.REACT_APP_USER_ID;
    const financesCol = collection(firestore, `/users/${userId}/finances`);
    await addDoc(financesCol, financeData);
  } catch (error) {
    console.error("Error al guardar en Firestore: ", error);
  }
};

export { handleOnSend };
