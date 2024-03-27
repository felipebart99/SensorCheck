import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>SENSORES</Text>
      </View>
      <View style={styles.sensores}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Sala</Text>
          <TextInput placeholder="Temp" />
          <TextInput placeholder="UR" />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Quarto</Text>
          <TextInput placeholder="Temp" />
          <TextInput placeholder="UR" />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Cozinha</Text>
          <TextInput placeholder="Temp" />
          <TextInput placeholder="UR" />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Banheiro</Text>
          <TextInput placeholder="Temp" />
          <TextInput placeholder="UR" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#297FB8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    backgroundColor: "white",
    padding: 10,
    borderRadius:10
  },
  titleText: {
    fontSize: 30, // Tamanho da fonte do título
    
  },
  sensores: {
    paddingTop: 20,
    alignItems:'center',
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 70,
  },
  itemText: {
    fontSize: 25, // Tamanho da fonte dos itens
    
  },
});
