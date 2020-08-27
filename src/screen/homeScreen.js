import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ToastAndroid,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Botao from '../components/Button';
import Busca from '../components/Search';
import api from '../services/api';

export default class homeScreen extends React.Component {
  static navigationOptions = {
    title: 'GIT EXPLORE',
  };
  //Pesquisa de perfil no Github
  state = {
    nome: '',
    dados: [],
  };
  /**
   * @description busca de perfil pela api do Github a partir da váriavel nome
   * @param nome [string]
   * @return dados [string]
   *
   */

  buscarPerfil = async () => {
    if (this.state.nome === '') {
      ToastAndroid.show('Digite um nome para busca ', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Buscando por ' + this.state.nome, ToastAndroid.SHORT);
      Keyboard.dismiss();
      await api(this.state.nome);
      let data = await data.json();
      this.setState({
        dados: data.items,
      });
      if (this.state.dados && this.state.dados.length === 0) {
        ToastAndroid.show(
          ' Usuário do git não encontrado ',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  /**
   *
   *  @description listagem de usuários da api para Flatlist
   *  @param item
   *  return Image, Text e Button para cada usuário
   *
   */

  renderItem = ({item}) => (
    <View style={styles.ComponentList}>
      <Image //foto do usuário
        source={{uri: item.avatar_url}}
        style={styles.ImagemList}
      />
      <Text style={styles.TextList}>Nome: {item.login}</Text>
      <Botao
        title="Ver mais" //botão que abre modal setando seu estado como true e as váriaveis com os dados do usuário
        type="outline"
        onPress={() => {
          this.props.navigation.navigate('Perfil', {
            email: item.login,
            foto: item.avatar_url,
          });
        }}
        style={styles.BuscaList}
      />
    </View>
  );
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          <View style={styles.containerBusca}>
            <View style={styles.Busca}>
              <Busca
                placeholde="Pesquisar perfil"
                onChangeText={(nome) => {
                  this.setState({nome});
                }}
              />
            </View>
            <Botao
              title="Buscar"
              type="outline"
              style={styles.Button}
              onPress={this.buscarPerfil}
            />
          </View>
          <View>
            <FlatList
              data={this.state.dados}
              keyExtractor={(item) => item.login}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  containerBusca: {
    flex: 2,
    alignContent: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  Busca: {
    width: 200,
    height: 50,
    color: '#000',
  },
  Button: {
    backgroundColor: '#fff000',
    marginTop: 10,
    width: 100,
    paddingTop: 10,
    height: 40,
    marginStart: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  ComponentList: {
    marginTop: 30,
    padding: 20,
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
  },
  BuscaList: {
    alignSelf: 'flex-end',
    width: 100,
    paddingTop: 10,
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff000',
  },
  ImagemList: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  TextList: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  DadosModal: {
    flexDirection: 'column',
    padding: 30,
  },
  ImagemModal: {
    flexDirection: 'row',
    marginStart: 10,
    marginTop: 10,
  },
});
