import { Button, StyleSheet } from 'react-native';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import Cadastro from '../Telas/Cad';
import TelaLogin from '../Telas/TelaLogin';
import TelaPrincipal from '../Telas/TelaPrincipal';
import Aprovado from '../Telas/Aprovado2';
import TelaCadNotas from '../Telas/TelaCadNotas'
import TelaConNotas from '../Telas/TelaConNotas'
import TelaAltNota from '../Telas/TelaAltNotas'
import TelaCadAtendi from '../Telas/TelaCadAtendi';
import TelaAltClientes from '../Telas/TelaAltClientes';
import Exec1 from '../Atividade/Exec1';
import Exec2 from '../Atividade/Exec2';
import Exec3 from '../Atividade/Exec3';

type RootStackParamList = {
  TelaLogin: undefined;
  Cadastro: undefined;
  TelaPrincipal: undefined;
  Aprovado: undefined;
  TelaCadNotas: undefined;
  TelaConNotas: undefined;
  TelaAltNota: {id:string};
  TelaCadAtendi: undefined;
  TelaAltClientes: {id:string};
  // Exec1: undefined;
  // Exec2: undefined;
  // Exec3: undefined;
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
        <Stack.Screen name="TelaConNotas" component={TelaConNotas}/>
        <Stack.Screen name="TelaAltNota" component={TelaAltNota}/> 
        <Stack.Screen name="TelaCadAtendi" component={TelaCadAtendi}/>
        <Stack.Screen name="TelaAltClientes" component={TelaAltClientes}/> 
        {/* <Stack.Screen name="Exec1" component={Exec1}/>
        <Stack.Screen name="Exec2" component={Exec2}/>
        <Stack.Screen name="Exec3" component={Exec3}/> */}
      </Stack.Navigator>
  );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

type CadUsuarioProps = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;

type AprovadoProps = NativeStackScreenProps<RootStackParamList, 'Aprovado'>;

type TelaCadNotasProps = NativeStackScreenProps<RootStackParamList, 'TelaCadNotas'>;

type TelaConProps = NativeStackScreenProps<RootStackParamList, 'TelaConNotas'>;

type AltNotaProps = NativeStackScreenProps<RootStackParamList, 'TelaAltNota'>;

type AtendimentoProps = NativeStackScreenProps<RootStackParamList, 'TelaCadAtendi'>;

type AltClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaAltClientes'>;


export default HomeNavigator;
export type {LoginProps, CadUsuarioProps, PrincipalProps, AprovadoProps, TelaCadNotasProps, TelaConProps, AltNotaProps, AtendimentoProps, AltClienteProps};