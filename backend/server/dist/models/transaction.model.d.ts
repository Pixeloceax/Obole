import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    type: string;
    description: string;
    status: string;
    currency: string;
    date: Date;
    sourceAccount: string;
    destinationAccount: string;
    amount: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: string;
    description: string;
    status: string;
    currency: string;
    date: Date;
    sourceAccount: string;
    destinationAccount: string;
    amount: number;
}> & Omit<{
    type: string;
    description: string;
    status: string;
    currency: string;
    date: Date;
    sourceAccount: string;
    destinationAccount: string;
    amount: number;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    description: string;
    status: string;
    currency: string;
    date: Date;
    sourceAccount: string;
    destinationAccount: string;
    amount: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: string;
    description: string;
    status: string;
    currency: string;
    date: Date;
    sourceAccount: string;
    destinationAccount: string;
    amount: number;
}>> & Omit<mongoose.FlatRecord<{
    type: string;
    description: string;
    status: string;
    currency: string;
    date: Date;
    sourceAccount: string;
    destinationAccount: string;
    amount: number;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export default _default;
