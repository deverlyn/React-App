import 'react-native-gesture-handler';
import React, {useState} from 'react';
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
} from 'react-native';
import STRINGS from '../helper/strings';

var AWS = require('aws-sdk');

function RegisterScreen() {

  var dynamodb = new AWS.DynamoDB({
    region: STRINGS.region,
    accessKeyId: STRINGS.accessKeyId,
    secretAccessKey: STRINGS.secretAccessKey,
  });

  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  function validateEmail() {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function Register() {
    setLoading(true);
    validateEmail(email);
    if (nome.indexOf(' ') < 0 || nome.length <= 10) {
      // verifica nome e sobrenome
      Alert.alert(null, 'Digite seu nome completo!');
      setLoading(false);
    } else if (!validateEmail(email)) {
      //Verifica se o e-mai esta nos padrões
      Alert.alert(null, email + ' não é um e-mail válido!');
      setLoading(false);
    } else if (senha.length < 6) {
      //verifica se a senha tem 6 caracteres no minimo
      Alert.alert(null, 'A senha deve conter ao menos 6 caracteres!');
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
            setLoading(false);
          } // an error occurred
          else {
            console.log(data);
            if (Object.keys(data).length > 0) {
              Alert.alert('Email já cadastrado');
              setLoading(false);
            } else {
              dynamodb.putItem(
                {
                  TableName: 'tbl_users_reactapp',
                  Item: {
                    user_email: {S: email},
                    user_name: {S: nome},
                    user_password: {S: senha},
                  },
                },
                (err, data) => {
                  if (err) {
                    setLoading(false);
                    console.log(err);
                    Alert.alert(null, 'erro ' + toString(err));
                  } else {
                    setLoading(false);
                    console.log(data);
                    navigation.navigate('Menu');
                    Alert.alert(null, 'Cadastrado com sucesso!');
                    //this.props.navigation.navigate('MenuScreen', {
                    // email: email,
                    //});
                  }
                },
              );
            }
          }
        },
      );
    }
    Keyboard.dismiss();
  }

  // onChangeText={nome =>{this.setState({nome})}}
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else if (loading == false) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView style={styles.Container}>
          <View style={styles.ContainerLogin}>
            <Text>Digite seu nome Completo...</Text>
            <TextInput
              placeholder="Nome"
              onChangeText={(nome) => {
                setNome(nome);
              }}
            />
            <Text>Digite seu e-mail...</Text>
            <TextInput
              placeholder="E-mail"
              onChangeText={(email) => {
                setEmail(email);
              }}
            />
            <Text>Crie uma senha de no mínimo 6 caracteres...</Text>
            <TextInput
              textContentType="password"
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={(senha) => {
                setSenha(senha);
              }}
            />
            <TouchableOpacity style={styles.ButtonCadastrar} onPress={Register}>
              <Text style={styles.TextButton}>CADASTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ButtonCadastrarFacebook}>
              <Text style={styles.TextButton}>ENTRAR COM FACEBOOK</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ButtonCadastrarGmail}>
              <Text style={styles.TextButton}>ENTRAR COM GMAIL</Text>
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
  ButtonCadastrarFacebook: {
    backgroundColor: '#3b5998',
    marginTop: 20,
    justifyContent: 'center',
    width: 250,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  ButtonCadastrarGmail: {
    backgroundColor: '#D44638',
    justifyContent: 'center',
    width: 250,
    marginTop: 20,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default RegisterScreen;

/*import React from 'react';
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
} from 'react-native';

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  region: 'us-east-1',
  accessKeyId: 'AKIAQWI7J5NXNCTSFG5I',
  secretAccessKey: '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',
});

export default class RegisterScreen extends React.Component {
  //página de cadastro
  static navigationOptions = {
    title: 'CADASTRO',
  };

  state = {
    nome: '',
    email: '',
    senha: '',
    EmailTable: '',
    loading: false,
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  /**
   *  @description função de cadastro
   *  @param email
   *  @param nome
   *  @param senha
   *  return cadastra os dados no banco se eles estiverem corretos
   */

/*Register = async () => {
    this.setState({
      loading: true,
    });
    this.validateEmail;
    if (this.state.nome.indexOf(' ') < 0 || this.state.nome.length <= 10) {
      // verifica nome e sobrenome
      Alert.alert(null, 'Digite seu nome completo!');
      this.setState({
        loading: false,
      });
    } else if (!this.validateEmail(this.state.email)) {
      //Verifica se o e-mai esta nos padrões
      Alert.alert(null, this.state.email + ' não é um e-mail válido!');
      this.setState({
        loading: false,
      });
    } else if (this.state.senha.length < 6) {
      //verifica se a senha tem 6 caracteres no minimo
      Alert.alert(null, 'A senha deve conter ao menos 6 caracteres!');
      this.setState({
        loading: false,
      });
    } else {
      dynamodb.getItem(
        {
          Key: {
            user_email: {
              S: this.state.email,
            },
          },
          TableName: 'tbl_users_reactapp',
        },
        (err, data) => {
          if (err) {
            console.log(err);
            this.setState({
              loading: false,
            });
          } // an error occurred
          else {
            console.log(data);
            if (Object.keys(data).length > 0) {
              Alert.alert('Email já cadastrado');
              this.setState({
                loading: false,
              });
            } else {
              dynamodb.putItem(
                {
                  TableName: 'tbl_users_reactapp',
                  Item: {
                    user_email: {S: this.state.email},
                    user_name: {S: this.state.nome},
                    user_password: {S: this.state.senha},
                  },
                },
                (err, data) => {
                  if (err) {
                    this.setState({
                      loading: false,
                    });
                    console.log(err);
                    Alert.alert(null, 'erro ' + toString(err));
                  } else {
                    this.setState({
                      loading: false,
                    });
                    console.log(data);
                    Alert.alert(null, 'Cadastrado com sucesso!');
                    this.props.navigation.navigate('MenuScreen', {
                      email: this.state.email,
                    });
                  }
                },
              );
            }
          }
        },
      );
    }
    Keyboard.dismiss();
  };

  // onChangeText={nome =>{this.setState({nome})}}
  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    } else if (this.state.loading == false) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <ScrollView style={styles.Container}>
            <View style={styles.ContainerLogin}>
              <Text>Digite seu nome Completo...</Text>
              <TextInput
                placeholder="Nome"
                onChangeText={(nome) => {
                  this.setState({nome});
                }}
              />
              <Text>Digite seu e-mail...</Text>
              <TextInput
                placeholder="E-mail"
                onChangeText={(email) => {
                  this.setState({email});
                }}
              />
              <Text>Crie uma senha de no mínimo 6 caracteres...</Text>
              <TextInput
                textContentType="password"
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={(senha) => {
                  this.setState({senha});
                }}
              />
              <TouchableOpacity
                style={styles.ButtonCadastrar}
                onPress={this.Register}>
                <Text style={styles.TextButton}>CADASTRAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ButtonCadastrarFacebook}>
                <Text style={styles.TextButton}>ENTRAR COM FACEBOOK</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ButtonCadastrarGmail}>
                <Text style={styles.TextButton}>ENTRAR COM GMAIL</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      );
    }
  }
}


*/
