import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela Inicial</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={text => setName(text)}
      />

      <Button
        title="Ir para Segunda Tela"
        onPress={() => navigation.navigate('Second', { userName: name })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
