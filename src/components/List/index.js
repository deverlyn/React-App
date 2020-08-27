import React, { Component } from 'react';

import { Text } from 'react-native-elements';


export default class Lista extends React.Component{
    render(){
        return(
            <Text>
                {this.props.Text}
            </Text>
        );
    }
}