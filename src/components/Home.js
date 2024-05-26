import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export function Home() {
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
    // Faz a chamada para buscar os dados
    fetch('http://192.168.1.7:3000/dados')
      .then(response => response.json())
      .then(data => {
        console.log('Dados recebidos:', data);
        //setSensorData({
          //sala: data.salaDeEstar[0] ? { temp: data.salaDeEstar[0].temperatura, ur: data.salaDeEstar[0].umidade } : { temp: null, ur: null },
          //quarto: data.quarto[0] ? { temp: data.quarto[0].temperatura, ur: data.quarto[0].umidade } : { temp: null, ur: null },
         // cozinha: data.cozinha[0] ? { temp: data.cozinha[0].temperatura, ur: data.cozinha[0].umidade } : { temp: null, ur: null },
          //banheiro: data.banheiro[0] ? { temp: data.banheiro[0].temperatura, ur: data.banheiro[0].umidade } : { temp: null, ur: null },
       // });
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  const handleConfigUpdate = () => {
    const configData = {
      minTemp: parseFloat(minTemp),
      maxTemp: parseFloat(maxTemp),
      minUR: parseFloat(minUR),
      maxUR: parseFloat(maxUR),
    };

    fetch('http://localhost:3000/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error('Erro ao atualizar configurações:', error);
      });
  };

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
        <Text style={styles.valores}>Valores Mínimo e Máximo</Text>
        
        <View style={styles.bloco}>
          <View>
            <Text>TEMPERATURA</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Min Temp:"
              placeholderTextColor="#888"
              value={String(minTemp)}
              onChangeText={(text) => setMinTemp(text)}
              onBlur={handleConfigUpdate}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.textinput}
              placeholder="Max Temp:"
              placeholderTextColor="#888"
              value={String(maxTemp)}
              onChangeText={(text) => setMaxTemp(text)}
              onBlur={handleConfigUpdate}
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
              onChangeText={(text) => setMinUR(text)}
              onBlur={handleConfigUpdate}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.textinput}
              placeholder="Max UR:"
              placeholderTextColor="#888"
              value={String(maxUR)}
              onChangeText={(text) => setMaxUR(text)}
              onBlur={handleConfigUpdate}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
      <View style={styles.sensores}>
        <View style={styles.item}>
          <Text style={styles.itemText}>Sala</Text>
          <Text style={getTempTextStyle(sensorData.sala.temp)}>{sensorData.sala.temp ? sensorData.sala.temp + '°C' : 'N/A'}</Text>
          <Text style={getURTextStyle(sensorData.sala.ur)}>{sensorData.sala.ur ? sensorData.sala.ur + '%' : 'N/A'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Quarto</Text>
          <Text style={getTempTextStyle(sensorData.quarto.temp)}>{sensorData.quarto.temp ? sensorData.quarto.temp + '°C' : 'N/A'}</Text>
          <Text style={getURTextStyle(sensorData.quarto.ur)}>{sensorData.quarto.ur ? sensorData.quarto.ur + '%' : 'N/A'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Cozinha</Text>
          <Text style={getTempTextStyle(sensorData.cozinha.temp)}>{sensorData.cozinha.temp ? sensorData.cozinha.temp + '°C' : 'N/A'}</Text>
          <Text style={getURTextStyle(sensorData.cozinha.ur)}>{sensorData.cozinha.ur ? sensorData.cozinha.ur + '%' : 'N/A'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Banheiro</Text>
          <Text style={getTempTextStyle(sensorData.banheiro.temp)}>{sensorData.banheiro.temp ? sensorData.banheiro.temp + '°C' : 'N/A'}</Text>
          <Text style={getURTextStyle(sensorData.banheiro.ur)}>{sensorData.banheiro.ur ? sensorData.banheiro.ur + '%' : 'N/A'}</Text>
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
    fontSize: 30,
  },
  bloco: {
    flexDirection: "row",
    gap: 50,
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
    fontSize: 25,
  },
  valores: {
    padding: 15,
  },
  textinput: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  valueText: {
    fontSize: 20,
    color: "white",
    marginHorizontal: 10,
  },
  valueTextWarning: {
    color: "red",
  },
});
