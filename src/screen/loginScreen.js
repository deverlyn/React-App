import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import STRINGS from '../helper/strings';

var AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
});


function LoginScreen() {

  var dynamodb = new AWS.DynamoDB({
    region: STRINGS.region,
    accessKeyId: STRINGS.accessKeyId,
    secretAccessKey: STRINGS.secretAccessKey,
  });

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisable] = useState(false);

  /**
   *  @description Busca por perfil
   *  @param email
   *  @param senha
   *  return dados do usuario encontrado
   */
  async function Login() {
    setLoading(true);
    if (email === '') {
      Alert.alert(null, 'E-mail inválido');
      setLoading(false);
    } else if (senha === '') {
      Alert.alert(null, 'Senha Inválida');
      setLoading(false);
    } else {
      dynamodb.getItem(
        {
          Key: {
            user_email: {
              S: email,
            },
          },
          TableName: 'tbl_users_reactapp',
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } // an error occurred
          else {
            console.log(data);
            if (Object.keys(data).length > 0) {
              if (data.Item.user_password.S === senha) {
                setLoading(false);
                navigation.navigate('Menu', {email: email});
                AsyncStorage.setItem('UID123', JSON.stringify(email), () => {
                  AsyncStorage.getItem('UID123', (err, result) => {
                    console.log(result);
                  });
                });
              } else {
                Alert.alert(null, 'Senha incorreta');
                setLoading(false);
              }
            } else {
              Alert.alert(null, 'Usuário não encontrado!');
              setLoading(false);
            }
            //
          } // successful response
        },
      );
    }
    Keyboard.dismiss();
  }

  useEffect(() => {
    async function fetchData() {
      await AsyncStorage.getItem('UID123', (err, result) => {
        console.log(result);
        if (result !== null) {
          navigation.navigate('Menu', {email: result});
        }
      });
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView style={styles.Container}>
          <View style={styles.ContainerLogin}>
            <Text>Digite seu e-mail</Text>
            <TextInput
              placeholder="E-mail"
              onChangeText={(login) => {
                setEmail(login);
              }}
            />
            <Text>Digite sua senha</Text>
            <TextInput
              textContentType="password"
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={(password) => {
                setSenha(password);
              }}
            />
            <TouchableOpacity
              style={styles.ButtonCadastrar}
              onPress={Login}
              disabled={isDisable}>
              <Text style={styles.TextButton}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonCadastrar}
              onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.TextButton}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fffedb',
  },
  ContainerLogin: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 80,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 30,
  },
  ButtonCadastrar: {
    backgroundColor: '#ffb600',
    justifyContent: 'center',
    width: 250,
    height: 50,
    marginTop: 20,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  TextButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Tahoma',
  },
});

export default LoginScreen;
