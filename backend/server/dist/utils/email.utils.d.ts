declare const checkEmailExist: (email: string) => Promise<boolean>;
declare const sendEmail: (email: string, password: number, accountNumber: number, cardNumber: number, code: number, CCV: number, expirationDate: string, typeOfCard: string) => Promise<void>;
export { checkEmailExist, sendEmail };
