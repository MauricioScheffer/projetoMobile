import { Button, StyleSheet } from 'react-native';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import TelaCadClientes from '../Telas/TelaCadClientes';
import TelaLogin from '../Telas/TelaLogin';
import TelaPrincipal from '../Telas/TelaPrincipal';
import TelaCadAtendi from '../Telas/TelaCadAtendi';
import TelaAltClientes from '../Telas/TelaAltClientes';
import TelaConAtendi from '../Telas/TelaConAtendi';
import TelaConClientes from '../Telas/TelaConClientes';
import CadUsuarios from '../Telas/CadUsuarios';

type RootStackParamList = {
  TelaLogin: undefined;
  TelaCadClientes: undefined;
  TelaPrincipal: undefined;
  TelaCadAtendi: undefined;
  TelaAltClientes: {id:string};
  TelaConAtendi: undefined;
  TelaConClientes: undefined;
  CadUsuarios: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName= "TelaLogin" screenOptions={{headerShown:false}}>
        <Stack.Screen name="TelaLogin" component={TelaLogin}/>
        <Stack.Screen name="TelaCadClientes" component={TelaCadClientes}/>
        <Stack.Screen name="TelaPrincipal" component={TelaPrincipal}/>
        <Stack.Screen name="TelaConAtendi" component={TelaConAtendi}/>
        <Stack.Screen name="TelaCadAtendi" component={TelaCadAtendi}/>
        <Stack.Screen name="TelaAltClientes" component={TelaAltClientes}/> 
        <Stack.Screen name="TelaConClientes" component={TelaConClientes}/> 
        <Stack.Screen name="CadUsuarios" component={CadUsuarios}/> 

      </Stack.Navigator>
  );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

//PRINCIPAL
type PrincipalProps = NativeStackScreenProps<RootStackParamList, 'TelaPrincipal'>;
type CadUsuariosProps = NativeStackScreenProps<RootStackParamList, 'CadUsuarios'>;

//CLIENTE
type CadClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaCadClientes'>;
type AltClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaAltClientes'>;
type TelaConClienteProps = NativeStackScreenProps<RootStackParamList, 'TelaConClientes'>;

//ATENDIMENTOS
type TelaConAtendimentoProps = NativeStackScreenProps<RootStackParamList, 'TelaConAtendi'>;
type AtendimentoProps = NativeStackScreenProps<RootStackParamList, 'TelaCadAtendi'>;


export default HomeNavigator;
export type {LoginProps, CadUsuariosProps, CadClienteProps, TelaConClienteProps, PrincipalProps, TelaConAtendimentoProps, AtendimentoProps, AltClienteProps};