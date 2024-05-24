import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const Exemplo1 = () => {
  let url = 'https://reactnative.dev/docs/assets/p_cat2.png';
  return (
    <ScrollView>
      <Text style={{fontSize: 40}}>Algum texto</Text>
      <View>
        <Text>Mais Algum Texto</Text>
        <Image
          source={{
            uri: url,
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          
          borderColor: 'gray',
          borderWidth: 1,
          fontSize: 40
        }}
        defaultValue="Digite aqui"
      />
    </ScrollView>
  );
};

export default Exemplo1;

