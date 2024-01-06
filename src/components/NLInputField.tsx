import React, { useState, FC } from 'react';

interface TextInputProps {
  onSend: (input: string) => void;
}

const TextInput: FC<TextInputProps> = ({ onSend }) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <label htmlFor="finance-input">Ingreso de Gastos/Ingresos:</label>
      <input
        type="text"
        id="finance-input"
        value={input}
        onChange={handleChange}
      />
      <button onClick={() => onSend(input)}>Enviar</button>
    </div>
  );
};

export default TextInput;
