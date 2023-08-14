import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    Card: {
        locked: boolean;
        opposition: boolean;
        code?: number | undefined;
        limit?: number | undefined;
        cardNumber?: number | undefined;
        expirationDate?: string | undefined;
        CCV?: number | undefined;
        used?: number | undefined;
    }[];
    SavingsAccount: {
        type?: string | undefined;
        savingAccountNumber?: number | undefined;
        savingsBalance?: number | undefined;
        interestRate?: number | undefined;
    }[];
    Information?: {
        address?: string | undefined;
        name?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        gender?: string | undefined;
        country?: string | undefined;
        date_of_birth?: {
            day?: number | undefined;
            month?: number | undefined;
            year?: number | undefined;
        } | undefined;
    } | undefined;
    Account?: {
        accountNumber?: number | undefined;
        hashPassword?: string | undefined;
    } | undefined;
    Balance?: {
        balance?: number | undefined;
    } | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    Card: {
        locked: boolean;
        opposition: boolean;
        code?: number | undefined;
        limit?: number | undefined;
        cardNumber?: number | undefined;
        expirationDate?: string | undefined;
        CCV?: number | undefined;
        used?: number | undefined;
    }[];
    SavingsAccount: {
        type?: string | undefined;
        savingAccountNumber?: number | undefined;
        savingsBalance?: number | undefined;
        interestRate?: number | undefined;
    }[];
    Information?: {
        address?: string | undefined;
        name?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        gender?: string | undefined;
        country?: string | undefined;
        date_of_birth?: {
            day?: number | undefined;
            month?: number | undefined;
            year?: number | undefined;
        } | undefined;
    } | undefined;
    Account?: {
        accountNumber?: number | undefined;
        hashPassword?: string | undefined;
    } | undefined;
    Balance?: {
        balance?: number | undefined;
    } | undefined;
}> & Omit<{
    Card: {
        locked: boolean;
        opposition: boolean;
        code?: number | undefined;
        limit?: number | undefined;
        cardNumber?: number | undefined;
        expirationDate?: string | undefined;
        CCV?: number | undefined;
        used?: number | undefined;
    }[];
    SavingsAccount: {
        type?: string | undefined;
        savingAccountNumber?: number | undefined;
        savingsBalance?: number | undefined;
        interestRate?: number | undefined;
    }[];
    Information?: {
        address?: string | undefined;
        name?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        gender?: string | undefined;
        country?: string | undefined;
        date_of_birth?: {
            day?: number | undefined;
            month?: number | undefined;
            year?: number | undefined;
        } | undefined;
    } | undefined;
    Account?: {
        accountNumber?: number | undefined;
        hashPassword?: string | undefined;
    } | undefined;
    Balance?: {
        balance?: number | undefined;
    } | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    Card: {
        locked: boolean;
        opposition: boolean;
        code?: number | undefined;
        limit?: number | undefined;
        cardNumber?: number | undefined;
        expirationDate?: string | undefined;
        CCV?: number | undefined;
        used?: number | undefined;
    }[];
    SavingsAccount: {
        type?: string | undefined;
        savingAccountNumber?: number | undefined;
        savingsBalance?: number | undefined;
        interestRate?: number | undefined;
    }[];
    Information?: {
        address?: string | undefined;
        name?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        gender?: string | undefined;
        country?: string | undefined;
        date_of_birth?: {
            day?: number | undefined;
            month?: number | undefined;
            year?: number | undefined;
        } | undefined;
    } | undefined;
    Account?: {
        accountNumber?: number | undefined;
        hashPassword?: string | undefined;
    } | undefined;
    Balance?: {
        balance?: number | undefined;
    } | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    Card: {
        locked: boolean;
        opposition: boolean;
        code?: number | undefined;
        limit?: number | undefined;
        cardNumber?: number | undefined;
        expirationDate?: string | undefined;
        CCV?: number | undefined;
        used?: number | undefined;
    }[];
    SavingsAccount: {
        type?: string | undefined;
        savingAccountNumber?: number | undefined;
        savingsBalance?: number | undefined;
        interestRate?: number | undefined;
    }[];
    Information?: {
        address?: string | undefined;
        name?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        gender?: string | undefined;
        country?: string | undefined;
        date_of_birth?: {
            day?: number | undefined;
            month?: number | undefined;
            year?: number | undefined;
        } | undefined;
    } | undefined;
    Account?: {
        accountNumber?: number | undefined;
        hashPassword?: string | undefined;
    } | undefined;
    Balance?: {
        balance?: number | undefined;
    } | undefined;
}>> & Omit<mongoose.FlatRecord<{
    Card: {
        locked: boolean;
        opposition: boolean;
        code?: number | undefined;
        limit?: number | undefined;
        cardNumber?: number | undefined;
        expirationDate?: string | undefined;
        CCV?: number | undefined;
        used?: number | undefined;
    }[];
    SavingsAccount: {
        type?: string | undefined;
        savingAccountNumber?: number | undefined;
        savingsBalance?: number | undefined;
        interestRate?: number | undefined;
    }[];
    Information?: {
        address?: string | undefined;
        name?: string | undefined;
        lastName?: string | undefined;
        phone?: string | undefined;
        email?: string | undefined;
        gender?: string | undefined;
        country?: string | undefined;
        date_of_birth?: {
            day?: number | undefined;
            month?: number | undefined;
            year?: number | undefined;
        } | undefined;
    } | undefined;
    Account?: {
        accountNumber?: number | undefined;
        hashPassword?: string | undefined;
    } | undefined;
    Balance?: {
        balance?: number | undefined;
    } | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export default _default;
