import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, ImageBackground } from 'react-native';

import { PrincipalProps } from '../navigation/HomeNavigator';
import ListaFlat from '../ListaFlat';

const TelaPrincipal = ({ navigation, route }: PrincipalProps) => {

    return (
        <ImageBackground source={require ("../imagens/wallpaper.jpg")} style={styles.container}>

            <Text style={styles.titulo}>Bem Vindo!</Text>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaConClientes')}}>
                    <Text style={styles.desc_botao}>Lista de Clientes</Text>
            </Pressable>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaConAtendi')}}>
                    <Text style={styles.desc_botao}>Alterar</Text>
            </Pressable>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaCadAtendi')}}>
                    <Text style={styles.desc_botao}>Cadastro de Atendimento</Text>
            </Pressable>

            <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaCadClientes')}}>
                    <Text style={styles.desc_botao}>Cadastra Clientes</Text>
             </Pressable>

        </ImageBackground>
    )
    
}

export default TelaPrincipal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   titulo: {
        marginTop: 95,
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
   },
   botao: {
    elevation: 10,
    backgroundColor: 'grey',
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
