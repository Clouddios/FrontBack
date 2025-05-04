import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import DadosExibido from "./components/Exibe";
import DadosInsert from "./components/Insert";

export default function App() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let url = "http://localhost:3000/";

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setPedidos(json);
      });
  };

  const Exibir = () => {
    let url = "http://localhost:3000/";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setPedidos(json);
      });
  };

  const DeleteAll = () => {
    let url = `http://localhost:3000/delete/delete-all`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        fetchData();
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <DadosInsert refetch={fetchData} />

        <Button mode="contained" onPress={Exibir} style={styles.button}>
          Exibir
        </Button>

        <Button
          mode="contained"
          onPress={DeleteAll}
          style={styles.button}
          buttonColor="#ff4d4d"
        >
          Deletar Todos
        </Button>

        <DadosExibido campos={pedidos} refetch={fetchData} />

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
    color: "#000000",
    backgroundColor: "#4d94ff",
  },
});
