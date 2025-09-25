import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SecondScreen({ navigation, route }) {
  const { userName } = route.params; // Recebe o parâmetro enviado

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Segunda Tela</Text>
      <Text style={styles.subtitle}>Olá, {userName}!</Text>

      <Button
        title="Voltar para Tela Inicial"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10 },
});
