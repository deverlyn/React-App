import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components/native';
import {useRoute} from '@react-navigation/native';
import 'react-native-gesture-handler';

function mainScreen() {
  const route = useRoute();

  const [nome] = useState(route.params.email);
  const [imagem] = useState(route.params.foto);
  const [dados, setDados] = useState();

  useEffect(() => {
    fetch('https://api.github.com/users/' + nome)
      .then((res) => res.json())
      .then((data) => {
        setDados({
          dados: data,
        });
        console.log(dados.dados.avatar_url);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  //Página explicação
  return (
    <View>
      <Container>
        <Texto>{nome}</Texto>
        <Image
          source={{uri: imagem}}
          style={{width: 100, height: 100}}
        />
      </Container>
    </View>
  );
}

const Texto = styled.Text`
  margin-top: 50;
  font-size: 20;
`;
const Container = styled.View`
  align-self: center;
`;

export default mainScreen;
