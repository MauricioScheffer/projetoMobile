import React from 'react';
import { Text } from 'react-native';

const getNotas = (NomeAluno: string, nota1: number, nota2: number, media: number, prove: boolean) => {
    media = nota1 + nota2/2;
    if(media >=7){
        return NomeAluno + ' ' + nota1 + ' ' + nota2 + ' ' + media + ' ' + prove;
    }else{
        return NomeAluno + ' ' + nota1 + ' ' + nota2 + ' ' + media + ' ' + prove;
    
}
}

//const Nota = () => { return(
        //<Text>
          // {getNotas('Macaco', '9', '9', '9', 'Aprovado')}
       // </Text>  )}
// type Props = {    aluno: string;    nota1: number;    nota2: number;    media: nota1 + nota2;    prove: boolean;}


  //export default Nota;