import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
}> & Omit<{
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
}>> & Omit<mongoose.FlatRecord<{
    payment?: {
        required?: unknown;
        type?: string | undefined;
    } | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export default _default;
