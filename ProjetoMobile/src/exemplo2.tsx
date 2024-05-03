import React from "react";
import { Text } from "react-native";

const getNomeCompleto = (primeiroNome: string, nomeMeio: string, ultimoNome : string) => {
    return primeiroNome + ' ' + nomeMeio + ' ' + ultimoNome;
}

const Gato = () => {
    return (
        <Text>
            Olá, eu sou o Gato{getNomeCompleto('Fulano', 'da Silva', 'Sauro')}!
        </Text>
    )
}

export default Gato;