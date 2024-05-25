import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type INotas = {
    id: string | undefined,
    titulo: string,
    descricao: string,
    created_at: FirebaseFirestoreTypes.FieldValue
}

export type {INotas};