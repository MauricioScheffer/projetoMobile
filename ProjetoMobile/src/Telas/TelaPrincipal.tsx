import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import auth from "@react-native-firebase/auth";
import { PrincipalProps } from '../navigation/HomeNavigator';
import ListaFlat from '../ListaFlat';

const TelaPrincipal = ({ navigation, route }: PrincipalProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Bem Vindo!</Text>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('Aprovado')}}>
                    <Text style={styles.desc_botao}>Calcular Média</Text>
            </Pressable>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaCadNotas')}}>
                    <Text style={styles.desc_botao}>Cadastrar Nota</Text>
            </Pressable>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('TelaConNotas')}}>
                    <Text style={styles.desc_botao}>Consultar Nota</Text>
            </Pressable>

            <ListaFlat/>
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
        paddingTop: 30,
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
