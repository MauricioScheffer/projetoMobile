import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import { Exec3Props } from '../navigation/HomeNavigator';

const Exec3 = ({ navigation, route }: Exec3Props) => {


    return (
        <View style={styles.container}>
            <View style={styles.painel_imagem}>
                <Image 
                    style={styles.imagem} 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
            </View>
            
             <View style={styles.container_login}>
              <Text
                    style={styles.titulo_caixa_texto}>
                    ATIVIDADE 3🤌
                </Text>

                <Pressable
                    style={(state) => [styles.botao2, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('Exec1')}}>
                    <Text style={styles.desc_botao}>ATIVIDADE 1🧮</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao2, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('Exec2')}}>
                    <Text style={styles.desc_botao}>ATIVIDADE 2🛒</Text>
                </Pressable>

            </View>
        </View>
    );
}

export default Exec3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey'
    },
    container_login: {
        flex: 2,
        alignItems: 'center'
    },
    titulo_caixa_texto:{
        fontFamily: 'Jacquard',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#61DBFB',
    },
    caixa_texto: {
        elevation: 8,
        width: '70%',
        color: 'black',
        // borderWidth: 3,
        margin: 3,
        backgroundColor: 'white'
    },
    botao2: {
        elevation: 8,
        justifyContent: 'center',
        backgroundColor: '#61DBFB',
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginTop: 20,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    },
    painel_imagem: {
        flex:1,
        alignItems:'center', 
        justifyContent:'center'
    },
    imagem: { 
        width: 200, 
        height: 200, 
        resizeMode: "center"
    }
});
