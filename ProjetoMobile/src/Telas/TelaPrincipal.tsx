import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, ImageBackground } from 'react-native';

import { PrincipalProps } from '../navigation/HomeNavigator';
import ListaFlat from '../ListaFlat';

const TelaPrincipal = ({ navigation, route }: PrincipalProps) => {

    return (
        <ImageBackground source={require ("../imagens/PaisagemPrincipal.jpg")} style={styles.container}>

            <Text style={styles.titulo}>Bem Vindo</Text>

            {/* <Text style={styles.subtitulo}>Clientes</Text> */}

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaCadClientes')}}>
                    <Text style={styles.desc_botao}>Cadastro de Clientes</Text>
            </Pressable>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaConClientes')}}>
                    <Text style={styles.desc_botao}>Consulta de Clientes</Text>
            </Pressable>

            {/* <Text style={styles.subtitulo}>Atendimentos</Text> */}

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaCadAtendi')}}>
                    <Text style={styles.desc_botao}>Cadastro de Atendimento</Text>
            </Pressable>

            <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaConAtendi')}}>
                    <Text style={styles.desc_botao}>Consulta de Atendimento</Text>
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
        backgroundColor: '#4682B4',
        marginTop: 80,
        marginBottom: 60,
        textAlign: 'center',
        fontWeight: '900',
        padding: 10,
        marginHorizontal: 100,
        borderRadius: 0,
        fontSize: 20,
        color: 'white',
   },
   subtitulo:{
    marginTop: 20,
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: '900',
    fontSize: 20,
    color: 'white',
   },
   botao: {
    elevation: 10,
    backgroundColor: '#4682B4',
    alignItems: 'center',
    width: 300,
    marginLeft: 45,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
},
desc_botao: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
}
});
