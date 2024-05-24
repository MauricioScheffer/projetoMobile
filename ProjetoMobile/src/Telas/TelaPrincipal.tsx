import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import auth from "@react-native-firebase/auth";
import { PrincipalProps } from '../navigation/Screen';

const TelaPrincipal = ({ navigation, route }: PrincipalProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Bem Vindo!</Text>

            <Pressable
            style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('Aprovado')}}>
                    <Text style={styles.desc_botao}>Calcular Média</Text>
            </Pressable>
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
        textAlign: 'center',
        color: '#000'
   },
   botao: {
    backgroundColor: 'green',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 10
},
desc_botao: {
    fontSize: 20,
    color: 'white'
}
});
