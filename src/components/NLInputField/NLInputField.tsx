import { Button, TextField } from "@mui/material";
import React, { useState, FC } from "react";
import "./NLInputField.css";

interface TextInputProps {
  onSend: (input: string) => void;
}

const TextInput: FC<TextInputProps> = ({ onSend }) => {
  const [input, setInput] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleOnSend = () => {
    onSend(input);
    setInput("");
  }

  return (
    <div className="textfield-container">
      <TextField
        multiline
        maxRows={4}
        label="Ingreso de Gastos/Ingresos:"
        variant="outlined"
        type="text"
        id="finance-input"
        value={input}
        onChange={handleChange}
        fullWidth
        placeholder="Me compre un cafe por $50 pesos..."
      />
      <Button variant="contained" onClick={handleOnSend}>Guardar</Button>
    </div>
  );
};

export default TextInput;
