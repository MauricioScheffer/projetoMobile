import React from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Cliente = {
    nome: string,
    tipo: String,
}

let listaCliente = [] as Cliente[];

let livro1 = {nome:'O Alquimista', tipo:'Aventura'} as Cliente;
let livro2 = {nome:'Coach Chines', tipo:'Auto-Ajuda'} as Cliente;
let livro3 = {nome:'Uma Breve História Sobre O Muno', tipo:'História'} as Cliente;
let livro4 = {nome:'Dragão de Gelo', tipo:'Aventura'} as Cliente;

listaCliente.push(livro1);
listaCliente.push(livro2);
listaCliente.push(livro3);
listaCliente.push(livro4);

type ItemPros ={
    Cliente: Cliente;
}

const ItemLista = (props: ItemPros) =>{
    
return(
    <View>
        <Text style={styles.item2}>
            {props.Cliente.tipo + ' ' + props.Cliente.nome}
        </Text>
    </View>
);
}

const ListaFlat = () => {
    return (
        <>
            <FlatList
            data={listaCliente}
            renderItem={({ item }) => 
            <Text style={styles.item}>
                {item.nome + '' + item.tipo}
            </Text>} />


            <FlatList
            data={listaCliente}
            renderItem={({ item }) => <ItemLista Cliente={item} /> } />
        
        </>
    )
}

const styles= StyleSheet.create({
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'red'
    },
    item2: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'green'
    }
});

export default ListaFlat;