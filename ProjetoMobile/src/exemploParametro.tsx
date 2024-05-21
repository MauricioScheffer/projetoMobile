import React from 'react';
import {Text} from 'react-native';

type Props = {
    nome:string;
    sobrenome: string;
}

const NomePersonalizado = (props: Props) => {
  return (
    <Text style={{fontSize: 40, color: 'red'}}>
        {props.nome + ' ' + props.sobrenome}
    </Text>
  )
};

export default NomePersonalizado;