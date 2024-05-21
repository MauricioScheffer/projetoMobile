import React from 'react';
import { Text } from 'react-native';

type Props = {
    nome: string;
    nota1: number;
    nota2: number;
}

function media(nota1: number, nota2: number){
    return (nota1 + nota2) / 2;
}

function resultado(media: number){
    return media >= 7 ? 'Aprovado' : 'Reprovado';
}

const Aprovado = (props: Props) => {
    return (
        <>
            <Text style={{ fontSize: 40 }}>
                Nome: {props.nome}
            </Text>
            <Text style={{ fontSize: 30 }}>
                Nota 1: {props.nota1}
            </Text>
            <Text style={{ fontSize: 30 }}>
                Nota 2: {props.nota2}
            </Text>
            <Text style={{ fontSize: 30 }}>
                Média: {media(props.nota1, props.nota2)}
            </Text>
            <Text style={{ fontSize: 30 }}>
                Resultado: {resultado(media(props.nota1, props.nota2))}
            </Text>
        </>
    )
};

export default Aprovado;