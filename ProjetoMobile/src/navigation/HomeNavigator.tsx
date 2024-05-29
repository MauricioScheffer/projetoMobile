import { Button, StyleSheet } from 'react-native';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import Cadastro from '../Telas/Cad';
import TelaLogin from '../Telas/TelaLogin';
import TelaPrincipal from '../Telas/TelaPrincipal';
import Aprovado from '../Telas/Aprovado2';
import TelaCadAtendimento from '../Telas/TelaCadAtendimento'
import TelaConNotas from '../Telas/TelaConNotas'
import TelaAltNota from '../Telas/TelaAltNotas'
import TelaCadClientes from '../Telas/TelaCadAtendi';


type RootStackParamList = {
  TelaLogin: undefined;
  Cadastro: undefined;
  TelaPrincipal: undefined;
  Aprovado: undefined;
  TelaCadAtendimento: undefined;
  TelaConNotas: undefined;
  TelaAltNota: {id:string}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName= "TelaLogin" screenOptions={{headerShown:false}}>
        <Stack.Screen name="TelaLogin" component={TelaLogin}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal}/>
        <Stack.Screen name="Aprovado" component={Aprovado}/>
        <Stack.Screen name="TelaCadAtendimento" component={TelaCadAtendimento}/>
        <Stack.Screen name="TelaConNotas" component={TelaConNotas}/>
        <Stack.Screen name="TelaAltNota" component={TelaAltNota}/>
      </Stack.Navigator>
  );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

type CadUsuarioProps = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;

type AprovadoProps = NativeStackScreenProps<RootStackParamList, 'Aprovado'>;

type TelaCadAtendimentoProps = NativeStackScreenProps<RootStackParamList, 'TelaCadAtendimento'>;

type TelaConProps = NativeStackScreenProps<RootStackParamList, 'TelaConNotas'>;

type AltNotaProps = NativeStackScreenProps<RootStackParamList, 'TelaAltNota'>;


export default HomeNavigator;
export type {LoginProps, CadUsuarioProps, PrincipalProps, AprovadoProps, TelaCadAtendimentoProps, TelaConProps, AltNotaProps};