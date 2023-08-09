export declare function getAccountBalance(accountNumber: string): Promise<number | undefined>;
export declare function updateAccountBalance(accountNumber: string, newBalance: number): Promise<void>;
export declare function checkAccountBalance(accountNumber: string, amount: number): Promise<boolean>;
