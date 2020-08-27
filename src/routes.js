import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import imageScreen from './screen/imageScreen'; //imagem das fotos
import MenuScreen from './screen/menuScreen'; //menu de opções do app
import alterScreen from './screen/alterScreen'; // alterar dados
import RegisterScreen from './screen/registerScreen'; //tela de cadastro do usuario
import LoginScreen from './screen/loginScreen'; //Tela de login
import homeScreen from './screen/homeScreen'; //tela de busca do perfil e github
import mainScreen from './screen/mainScreen'; // tela de perfil user
import PhotoScreen from './screen/photoScreen'; //tela de utilização da câmera

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
        <Stack.Screen name="Fotos" component={imageScreen} />
        <Stack.Screen name="Perfil" component={mainScreen} />
        <Stack.Screen name="Camera" component={PhotoScreen} />
        <Stack.Screen name="Buscas" component={homeScreen} />
        <Stack.Screen name="Alterar" component={alterScreen} />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{headerLeft: null}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
