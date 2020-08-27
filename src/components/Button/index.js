import React, {Component} from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

//botão para ser usado comumente no código
export default class Botao extends React.Component {
  render() {
    return (
      <Botoes type={this.props.type} onPress={this.props.onPress}>
        <Text>{this.props.title}</Text>
      </Botoes>
    );
  }
}

const Botoes = styled.TouchableOpacity`
  background-color: #fff000;
  margin-top: 10px;
  width: 100px;
  height: 40px;
  margin-start: 20px;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
`;
