import React, {Component} from 'react';
import styled from 'styled-components/native';

//input para ser usado comumente no código
export default class Busca extends React.Component {
  render() {
    return (
      <Buscar
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}

const Buscar = styled.TextInput`
  margin-top: 10px;
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border-color: #c0c0c0;
  border-style: solid;
  border-width: 1px;
`;
