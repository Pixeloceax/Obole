import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    date: Date;
    accountNumber: number;
    cardNumber: number;
    amount: number;
    cardHolderName: string;
    categorie: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
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
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export default _default;
