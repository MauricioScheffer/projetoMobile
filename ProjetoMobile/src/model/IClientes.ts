import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type IClientes = {
    id: string | undefined,
    cliente: string,
    atendimento: string,
    nome : string,
    cpf: string,
    rua: string,
    numero: string,
    bairro: string
    cidade: string,
    estado: string,
    email: string,
    senha: string,
    dataNasc: Date,
    created_at: FirebaseFirestoreTypes.FieldValue
    
}

export type {IClientes};