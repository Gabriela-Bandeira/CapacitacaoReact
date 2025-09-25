import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, StyleSheet, Button, TextInput, Dimensions, ActivityIndicator } from 'react-native';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;

export default function GallerySearchScreen() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(''); // termo de busca
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (searchTerm) => {
    setLoading(true);
    try {
      // Usando Picsum como placeholder (não suporta busca real)
      // Se quiser busca real, pode usar Unsplash API
      const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=20`);
      const data = await response.json();
      // Filtra localmente pelo autor (como exemplo de busca)
      const filtered = data.filter(item => item.author.toLowerCase().includes(searchTerm.toLowerCase()));
      // Adiciona altura aleatória
      const dataWithHeight = filtered.map(item => ({
        ...item,
        height: Math.floor(Math.random() * 100) + 150,
      }));
      setImages(dataWithHeight);
    } catch (error) {
      console.log('Erro ao buscar imagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchImages(query);
  };

  const openImage = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderItem = ({ item }) => {
    const imageWidth = screenWidth / numColumns - 15;
    return (
      <TouchableOpacity onPress={() => openImage(item.download_url)} style={{ margin: 5 }}>
        <Image
          source={{ uri: item.download_url }}
          style={{ width: imageWidth, height: item.height, borderRadius: 10 }}
        />
        <Text style={{ marginTop: 5, fontSize: 14 }}>{item.author}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeria com Busca</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o autor da imagem..."
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="tomato" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={{ marginTop: 20 }}>Nenhuma imagem encontrada</Text>}
        />
      )}

      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={styles.fullImage} />
          <Button title="Fechar" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  searchContainer: { flexDirection: 'row', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, flex: 1, marginRight: 10, borderRadius: 5 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: { width: 300, height: 300, borderRadius: 10, marginBottom: 20 },
});
