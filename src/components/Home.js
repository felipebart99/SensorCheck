import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export function Home() {
  // Suponha que você obtenha esses valores de um banco de dados
  const [sensorData, setSensorData] = useState({
    sala: { temp: 22, ur: 55 },
    quarto: { temp: 20, ur: 50 },
    cozinha: { temp: 25, ur: 60 },
    banheiro: { temp: 18, ur: 70 },
  });

  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minUR, setMinUR] = useState('');
  const [maxUR, setMaxUR] = useState('');

  useEffect(() => {
    // Aqui você faria uma chamada ao banco de dados para obter os dados reais
    // Exemplo:
    // fetchSensorData().then(data => setSensorData(data));
  }, []);

  const getTempTextStyle = (temp) => {
    if (temp < minTemp || temp > maxTemp) {
      return [styles.valueText, styles.valueTextWarning];
    }
    return styles.valueText;
  };

  const getURTextStyle = (ur) => {
    if (ur < minUR || ur > maxUR) {
      return [styles.valueText, styles.valueTextWarning];
    }
    return styles.valueText;
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>SENSORES</Text>
      </View>
      <View>
        <Text style={styles.valores}>   Valores Mínimo e Máximo </Text>
        
        <View style={styles.bloco}>
        <View>
          <Text>TEMPERATURA</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Min Temp:"
          placeholderTextColor="#888"
          value={String(minTemp)}
          onChangeText={(text) => setMinTemp(Number(text))}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textinput}
          placeholder="Max Temp:"
          placeholderTextColor="#888"
          value={String(maxTemp)}
          onChangeText={(text) => setMaxTemp(Number(text))}
          keyboardType="numeric"
        />
        </View>
        <View>
          <Text>HUMIDADE</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Min UR:"
          placeholderTextColor="#888"
          value={String(minUR)}
          onChangeText={(text) => setMinUR(Number(text))}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textinput}
          placeholder="Max UR:"
          placeholderTextColor="#888"
          value={String(maxUR)}
          onChangeText={(text) => setMaxUR(Number(text))}
          keyboardType="numeric"
        />
        </View>
        </View>
      </View>
      <View style={styles.sensores}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Sala</Text>
          <Text style={getTempTextStyle(sensorData.sala.temp)}>{sensorData.sala.temp}°C</Text>
          <Text style={getURTextStyle(sensorData.sala.ur)}>{sensorData.sala.ur}%</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Quarto</Text>
          <Text style={getTempTextStyle(sensorData.quarto.temp)}>{sensorData.quarto.temp}°C</Text>
          <Text style={getURTextStyle(sensorData.quarto.ur)}>{sensorData.quarto.ur}%</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Cozinha</Text>
          <Text style={getTempTextStyle(sensorData.cozinha.temp)}>{sensorData.cozinha.temp}°C</Text>
          <Text style={getURTextStyle(sensorData.cozinha.ur)}>{sensorData.cozinha.ur}%</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Banheiro</Text>
          <Text style={getTempTextStyle(sensorData.banheiro.temp)}>{sensorData.banheiro.temp}°C</Text>
          <Text style={getURTextStyle(sensorData.banheiro.ur)}>{sensorData.banheiro.ur}%</Text>
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
    borderRadius: 10,
    marginBottom: 50,
  },
  titleText: {
    fontSize: 30, // Tamanho da fonte do título
  },
  bloco:{
    flexDirection: "row",
    gap: 50
  },
  sensores: {
    paddingTop: 20,
    alignItems: "flex-start",
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
  valores: {
    padding: 15,
  },
  textinput: {
    backgroundColor: "white",
    color: "black", // Defina a cor do texto como preto
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  valueText: {
    fontSize: 20, // Tamanho da fonte dos valores
    color: "white", // Cor do texto dos valores
    marginHorizontal: 10,
  },
  valueTextWarning: {
    color: "red", // Cor do texto para valores fora do intervalo
  },
});
