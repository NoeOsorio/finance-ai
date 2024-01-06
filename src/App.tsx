import React, { useState, useEffect, FC } from 'react';
import TextInput from './components/NLInputField';
import { firestore } from './firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { handleOnSend } from './backend/getFinanceInfo';

interface Finance {
  id: string;
  type: string;
  quantity: number;
  description: string;
  title: string;
  category: string;
}

const App: FC = () => {
  const [finances, setFinances] = useState<Finance[]>([]);
  useEffect(() => {
    const fetchFinances = async () => {
      try {
        const userId = process.env.REACT_APP_USER_ID; // Asegúrate de obtener este valor correctamente
        const financesCol = collection(firestore, `/users/${userId}/finances`);

        const unsubscribe = onSnapshot(financesCol, (snapshot) => {
          const financeList: Finance[] = snapshot.docs.map(doc => ({ ...doc.data() as Finance, id: doc.id }));
          setFinances(financeList);
        });
    
        // Limpiar el listener al desmontar el componente
        return () => unsubscribe();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchFinances();
  }, []);

  return (
    <div>
      <h1>Finanzas Personales</h1>
      <TextInput onSend={handleOnSend} />
      <h2>Finanzas</h2>
      {finances.map(finance => (<p key={finance.id}>{finance.title}</p>))}
    </div>
  );
};

export default App;
