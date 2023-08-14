import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    date: Date;
    accountNumber: number;
    cardNumber: number;
    amount: number;
    cardHolderName: string;
    categorie: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
<<<<<<< HEAD
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
}> & {
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
}, mongoose.Document<unknown, {}, {
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
=======
    date: Date;
    accountNumber: number;
    cardNumber: number;
    amount: number;
    cardHolderName: string;
    categorie: string;
}> & Omit<{
    date: Date;
    accountNumber: number;
    cardNumber: number;
    amount: number;
    cardHolderName: string;
    categorie: string;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    date: Date;
    accountNumber: number;
    cardNumber: number;
    amount: number;
    cardHolderName: string;
    categorie: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    date: Date;
    accountNumber: number;
    cardNumber: number;
    amount: number;
    cardHolderName: string;
    categorie: string;
}>> & Omit<mongoose.FlatRecord<{
    date: Date;
    accountNumber: number;
    cardNumber: number;
    amount: number;
    cardHolderName: string;
    categorie: string;
>>>>>>> 2667ec7cc07ebd6d1f7b369cabc9558e3f48a8d2
}> & {
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
