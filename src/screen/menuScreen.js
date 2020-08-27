import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Image, StyleSheet, Text, BackHandler, Alert} from 'react-native';
import Botao from '../components/Button';
import {useRoute} from '@react-navigation/native';
const IMAGEM = require('../assets/github.png');

function MenuScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [email] = useState(route.params.email);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Espere!', 'Tem certeza que deseja sair do App?', [
        {
          text: 'Não',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View>
      <View style={styles.containerPerfil}>
        <Text>Email: {email}</Text>

        <Botao
          onPress={() => navigation.navigate('Alterar', {email: email})}
          title="Alterar dados"
          type="outline"
        />
      </View>

      <View style={styles.ComponentButton}>
        <Botao
          title="Buscar Git"
          type="outline"
          onPress={() => navigation.navigate('Buscas', {email: email})}
        />
        <Botao
          onPress={() => navigation.navigate('Camera', {email: email})}
          title="Câmera"
          type="outline"
        />
      </View>
      <View style={styles.ComponentImage}>
        <Image source={IMAGEM} style={styles.ImageGit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ComponentButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  ComponentImage: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  ImageGit: {
    opacity: 0.3,
    marginTop: 100,
    width: 150,
    height: 150,
  },
  containerPerfil: {
    padding: 20,
  },
});
export default MenuScreen;
