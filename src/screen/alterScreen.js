import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import STRINGS from '../helper/strings';


var AWS = require('aws-sdk');
function alterScreen() {

  var dynamodb = new AWS.DynamoDB({
    region: STRINGS.region,
    accessKeyId: STRINGS.accessKeyId,
    secretAccessKey: STRINGS.secretAccessKey,
  });
  
  const navigation = useNavigation();
  const route = useRoute();
  const Email = route.params.email;
  const [nome, setNome] = useState(' ');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [novaSenha, setnovaSenha] = useState('');
  const [novaSenha1, setnovaSenha1] = useState('');
  const [Verify, setVerify] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(Email.replace('"', ''));
    var buscaEmail = email.replace('"','');
    dynamodb.getItem(
      {
        Key: {
          user_email: {
            S: buscaEmail,
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
          if (nome === ' ') {
            setNome(data.Item.user_name.S);
            if(Verify==''){
              setVerify(data.Item.user_password.S);
            }
          }
        }
      },
    );
  });

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  /**
   *
   *  @description Busca por usuario e altera dados na tabela
   *  @param email
   *  @param nome
   *  @param senha
   *  return atualiza dados do usuário
   *
   */

  function Altera() {
    if (nome === '') {
      Alert.alert(null, 'O nome não pode ficar vazio');
    } else if (senha === '') {
      Alert.alert(null, 'O campo senha está vazio!');
    } else {
      if (novaSenha.length === 0 || novaSenha1.length === 0) {
        Alert.alert(null, 'A senha não pode ser vazio');
      } else if (novaSenha !== novaSenha1) {
        Alert.alert(null, 'As senhas não combinam');
      } else {
        if (nome.length < 10 || nome.indexOf(' ') < 0) {
          Alert.alert(null, 'Digite seu nome completo!');
        } else if (Verify !== senha) {
          Alert.alert(null, 'Senha incorreta!');
        }else{
          dynamodb.putItem(
            {
              TableName: 'tbl_users_reactapp',
              Item: {
                user_email: {S: email},
                user_name: {S: nome},
                user_password: {S: novaSenha},
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
                Alert.alert(null, 'Alterado com Sucesso!');
                setVerify(novaSenha);
              }
            },
          );
        }
      }
    }
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.Container}>
        <Text>Alterar dados de: {email.replace('"','')}</Text>
        <Text>Nome:</Text>
        <TextInput
          placeholder="Novo nome"
          onChangeText={(nome) => setNome(nome)}>
          {nome}
        </TextInput>
        <Text>Antiga senha:</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Senha"
          onChangeText={(senha) => setSenha(senha)}
        />
        <Text>Nova senha:</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Nova senha"
          onChangeText={(novaSenha) => setnovaSenha(novaSenha)}
        />
        <Text>Repita senha:</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Nova senha"
          onChangeText={(novaSenha1) => setnovaSenha1(novaSenha1)}
        />
        <TouchableOpacity style={styles.ButtonAltera} onPress={Altera}>
          <Text>Alterar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fffedb',
  },
  ButtonAltera: {
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

export default alterScreen;
