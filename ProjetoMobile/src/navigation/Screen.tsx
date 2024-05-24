import { Button, StyleSheet } from 'react-native';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import Cadastro from '../Telas/Cad';
import TelaLogin from '../Telas/TelaLogin';
import TelaPrincipal from '../Telas/TelaPrincipal';
import Aprovado from '../Telas/Aprovado2';


type RootStackParamList = {
  TelaLogin: undefined;
  Cadastro: undefined;
  TelaPrincipal: undefined;
  Aprovado: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName= "TelaLogin" screenOptions={{headerShown:false}}>
        <Stack.Screen name="TelaLogin" component={TelaLogin}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal}/>
        <Stack.Screen name="Aprovado" component={Aprovado}/>
        <Stack.Screen name="TelaCadNotas" component={TelaCadNotas}/>
      </Stack.Navigator>
  );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

type CadUsuarioProps = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;

type AprovadoProps = NativeStackScreenProps<RootStackParamList, 'Aprovado'>;

type NotasProps = NativeStackScreenProps<RootStackParamList, 'TelaCadNotas'>;

export default HomeNavigator;
export type {LoginProps, CadUsuarioProps, PrincipalProps, AprovadoProps, NotasProps};