import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type Produto = {
    id: string | undefined,
    nome: string,
    codBarras: string,
    preco: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {Produto};