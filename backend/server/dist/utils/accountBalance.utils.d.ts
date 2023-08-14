export declare function getAccountBalance(accountNumber: number): Promise<number | undefined>;
export declare function updateAccountBalance(accountNumber: number, amount: number, operation: "add" | "subtract"): Promise<void>;
export declare function checkAccountBalance(accountNumber: number, amount: number): Promise<boolean>;
export declare function getSavingAccountBalance(SavingAccountNumber: number): Promise<number | undefined>;
export declare function updateSavingAccountBalance(SavingAccountNumber: number, amount: number, operation: "add" | "subtract"): Promise<void>;
export declare function checkSavingAccountBalance(SavingAccountNumber: number, amount: number): Promise<boolean>;
