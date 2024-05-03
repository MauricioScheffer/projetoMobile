import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert} from 'react-native';
import Aprovado from './Aprovado';

export default () => {   
    const [nome, setNome] = useState('');
    const [nota1, setNota1] = useState(NaN);    
    const [nota2, setNota2] = useState(NaN);

    function media(){
        return (nota1+nota2) / 2;
    }
    function resultado (media:number){
        return media >= 7 ? 'Aprovado' : 'Reprovado';
    }

    // Verifica Campos
    function log(){
        let a = String(nota1);
        let b = String(nota2);
        if (a != 'NaN' && b != 'NaN' && nome != '') {
            Alert.alert(nome + "! Sua media é " + media() + "\nVocê está " + resultado(media()));
        }else{
            Alert.alert("Você precisa preencher todos os campos!");
        }
       
    }



        //alert(email)
        //alert(senha);
    //fuction cadastro(){
    //    alert('ok')
    //}


    return(
        <View style={styles.container}>
           
            <Image style={{width:150,height:150}} source={require('./LogoMobile.png')}/>
            <TextInput placeholder="Digite seu Nome"  style={styles.textInput} onChangeText={text=>setNome(text)}/>
            <TextInput placeholder="Digite a primeira nota" style={styles.textInput} onChangeText={text=>setNota1(Number.parseFloat(text))} />
            <TextInput placeholder="Digite a segunda nota" style={styles.textInput} onChangeText={text=>setNota2(Number.parseFloat(text))} />


            <TouchableOpacity style={styles.btnMedia} onPress={()=>log()}>
                <Text style={{color:'white'}}>Calcular Media</Text>
            </TouchableOpacity>
       
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:20,
        backgroundColor: '#100D28'
    },
    
    textInput:{
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius:20,
        paddingLeft:10,
        marginBottom:10
    },
    btnMedia:{
        width: '30%' , 
        height:40,
        backgroundColor:'#7b42f5',
        borderRadius:20,
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center'
    }
});


