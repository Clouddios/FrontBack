import React, { useState } from "react";
import { FlatList, View, StyleSheet, Modal } from "react-native";
import { Card, Text, Button, TextInput } from "react-native-paper";

const Delete = (id, refetch) => {
  fetch(`http://localhost:3000/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => refetch())
    .catch((err) => console.error("Erro ao deletar:", err));
};

const Update = (id, updatedData, refetch, closeModal) => {
  fetch(`http://localhost:3000/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then(() => {
      refetch();
      closeModal();
    })
    .catch((err) => console.error("Erro ao atualizar:", err));
};

const DadosExibido = ({ campos, refetch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [cliente, setCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const abrirModal = (pedido) => {
    setPedidoSelecionado(pedido);
    setCliente(pedido.cliente);
    setProduto(pedido.produto);
    setQuantidade(String(pedido.quantidade));
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setPedidoSelecionado(null);
    setCliente("");
    setProduto("");
    setQuantidade("");
  };

  return (
    <View>
      <FlatList
        data={campos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>Cliente: {item.cliente}</Text>
              <Text>Produto: {item.produto}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => abrirModal(item)}>Atualizar</Button>
              <Button onPress={() => Delete(item._id, refetch)} textColor="red">
                Deletar
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Modal de Atualização */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              label="Cliente"
              value={cliente}
              onChangeText={setCliente}
              style={styles.input}
            />
            <TextInput
              label="Produto"
              value={produto}
              onChangeText={setProduto}
              style={styles.input}
            />
            <TextInput
              label="Quantidade"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={() =>
                Update(
                  pedidoSelecionado._id,
                  { cliente, produto, quantidade: Number(quantidade) },
                  refetch,
                  fecharModal
                )
              }
            >
              Salvar
            </Button>
            <Button onPress={fecharModal}>Cancelar</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 10,
  },
});

export default DadosExibido;
