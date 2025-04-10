import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";

export default function App() {
  const [name, setName] = useState(""); // Estado para capturar o nome do usuário
  const [userId, setUserId] = useState(""); // Estado para capturar o ID do usuário a ser atualizado
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários

  const addUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          nome: name, // Envia o nome capturado dinamicamente
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  const Exibir = async () => {
    try {
      const response = await fetch("http://localhost:3000/getUsers");
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data); // Armazena os usuários no estado
    } catch (error) {
      console.error("Erro ao exibir usuários:", error);
    }
  };

  const Atualizar0 = async () => {
    try {
      const response = await fetch(`http://localhost:3000/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          nome: name, // Atualiza o nome capturado dinamicamente
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const Excluir = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      setUsers(users.filter(user => user._id !== id)); // Remove o usuário excluído do estado
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o nome do usuário"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
          width: "80%",
        }}
      />
      <TouchableOpacity
        onPress={addUser}
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 5, marginBottom: 10 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Adicionar Usuário</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={Exibir}
        style={{ backgroundColor: "blue", padding: 10, borderRadius: 5, marginBottom: 10 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Exibir Usuários</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Digite o ID do usuário para atualizar"
        value={userId}
        onChangeText={setUserId}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          marginBottom: 10,
          width: "80%",
        }}
      />
      <TouchableOpacity
        onPress={Atualizar0}
        style={{ backgroundColor: "green", padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Atualizar Usuário</Text>
      </TouchableOpacity>
      <View>
        {users.map(user => (
          <View key={user._id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text>{`ID: ${user._id}, Nome: ${user.nome}`}</Text>
            <TouchableOpacity
              onPress={() => Excluir(user._id)}
              style={{ backgroundColor: "red", padding: 5, marginLeft: 10, borderRadius: 5 }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});