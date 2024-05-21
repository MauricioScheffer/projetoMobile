import React from 'react';
import { Text } from 'react-native';

const getNomeCompleto = (
  primeiroNome: string, 
  nomeMeio: string, 
  ultimoNome: string) => {

  return primeiroNome + ' ' + nomeMeio + ' ' + ultimoNome;
};

const Gato = () => {
  return (
    <Text style={{fontSize: 30, fontWeight: 'bold'}}>
      Olá, eu sou o gato
      {getNomeCompleto('Fulano', 'da Silva', 'Sauro')} !
    </Text>
  )
};

export default Gato;