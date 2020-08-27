'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styled from 'styled-components';

export default class PhotoScreen extends Component {
  static navigationOptions = {
    title: 'CÂMERA',
  };
  //url da imagem tirada pelo usuário
  state = {
    uri: '',
    modal: false,
  };

  //Tela de tirar Foto
  render() {
    return (
      <Container>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.CamPreview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permissão para usar a câmera',
            message:
              'Precisamos da sua permissão para usar a câmera do celular',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <ButtonCapture onPress={this.takePicture} />
          <ButtonFotos
            onPress={() => {
              this.props.navigation.navigate('Fotos', {
                nome: this.state.uri,
              });
            }}>
            <Text>Fotos</Text>
          </ButtonFotos>
        </View>
      </Container>
    );
  }

  /**
   * @description função para tirar fotos e setar a url da imagem na variável uri
   * @param data [objeto]
   * @param options [array]
   * @param quality [float]
   * @param base64 [boolean]
   * @param data [string]
   */
  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        uri: data.uri,
      });
      console.log(data.uri);
    }
  };
}
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: black;
`;
const ButtonCapture = styled.TouchableOpacity`
  background-color: #fff000;
  border-radius: 200;
  width: 70;
  margin-start: 15%;
  height: 70;
`;

const ButtonFotos = styled.TouchableOpacity`
  background-color: #ff0000;
  width: 60;
  padding-top: 10;
  height: 40;
  align-self: center;
  align-items: center;
  border-radius: 10;
  margin-start: 10;
`;
const styles = StyleSheet.create({
  CamPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
