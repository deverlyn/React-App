import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useRoute} from '@react-navigation/native';

export default function imageScreen() {
  const route = useRoute();

  const [nome] = useState(route.params.nome);
  //Página explicação
  return (
    <Container>
      <Imagem source={{uri: nome}} />
    </Container>
  );
}

const Imagem = styled.Image`
  width: 100%;
  height: 100%;
`;
const Container = styled.View`
  flex: 1;
`;
