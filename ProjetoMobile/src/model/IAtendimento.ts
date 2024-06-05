import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type IAtendimento = {
    id: string | undefined,
    nome: string,
    exame: string,
    descricao: string,
    dia: string,
    hora: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {IAtendimento};