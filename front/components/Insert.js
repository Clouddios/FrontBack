import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";

const DadosInsert = ({ refetch }) => {
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");

const Add = () => {
  const camposPreenchidos = cliente?.trim() && produto?.trim() && quantidade;

  if (!camposPreenchidos) {
    alert("Por favor, preencha todos os campos obrigatórios: Cliente, Produto e Quantidade.");
    return;
  }

    fetch("http://localhost:3000/add", {
      method: "POST",
      body: JSON.stringify({
        cliente,
        produto,
        quantidade: Number(quantidade),
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch(); // Atualiza a lista
        setCliente("");
        setProduto("");
        setQuantidade("");
      })
      .catch((err) => console.error("Erro ao cadastrar:", err));
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Novo Pedido" />
      <Card.Content>
        <TextInput
          label="Cliente"
          mode="outlined"
          value={cliente}
          onChangeText={setCliente}
          style={styles.input}
        />
        <TextInput
          label="Produto"
          mode="outlined"
          value={produto}
          onChangeText={setProduto}
          style={styles.input}
        />
        <TextInput
          label="Quantidade"
          mode="outlined"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button mode="contained" onPress={Add} style={styles.button}>
          Cadastrar Pedido
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default DadosInsert;
