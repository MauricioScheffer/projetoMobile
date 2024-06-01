import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import { PrincipalProps } from '../navigation/HomeNavigator';
import ListaFlat from '../ListaFlat';

const TelaPrincipal = ({ navigation, route }: PrincipalProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Bem Vindo!</Text>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('Aprovado')}}>
                    <Text style={styles.desc_botao}>Lista de Clientes</Text>
            </Pressable>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaCadNotas')}}>
                    <Text style={styles.desc_botao}>Notas</Text>
            </Pressable>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaAltClientes')}}>
                    <Text style={styles.desc_botao}>Alterar</Text>
            </Pressable>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaCadAtendi')}}>
                    <Text style={styles.desc_botao}>Atendimento</Text>
            </Pressable>

            <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('Cadastro')}}>
                    <Text style={styles.desc_botao}>Cadastrar-se</Text>
             </Pressable>

             

           {/* <ListaFlat/> */}
        </View>
    )
    
}

export default TelaPrincipal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
   titulo: {
        paddingTop: 50,
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
   },
   botao: {
    elevation: 10,
    backgroundColor: '#61DBFB',
    alignItems: 'center',
    width: 300,
    marginLeft: 45,
    borderRadius: 3,
    padding: 20,
    marginTop: 20
},
desc_botao: {
    fontSize: 20,
    color: '#fff',
}
});
