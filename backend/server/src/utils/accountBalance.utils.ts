import UserModel from "../models/user.model";

export async function getAccountBalance(accountNumber: number) {
  try {
    const user = await UserModel.findOne({
      "Account.accountNumber": accountNumber,
    });
    if (!user) {
      throw new Error("Account not found.");
    }
    return user.Balance?.balance;
  } catch (error: string | any) {
    throw new Error(`Error while getting account balance: ${error.message}`);
  }
}

export async function updateAccountBalance(
  accountNumber: number,
  amount: number,
  operation: "add" | "subtract"
): Promise<void> {
  try {
    const updateQuery: any = {};
    if (operation === "add") {
      updateQuery.$inc = { "Balance.balance": amount };
    } else if (operation === "subtract") {
      updateQuery.$inc = { "Balance.balance": -amount };
    } else {
      throw new Error("Invalid operation.");
    }

    const user = await UserModel.findOneAndUpdate(
      { "Account.accountNumber": accountNumber },
      updateQuery,
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      throw new Error("Account not found.");
    }
  } catch (error: any) {
    throw new Error(`Error while updating account balance: ${error.message}`);
  }
}

export async function checkAccountBalance(
  accountNumber: number,
  amount: number
): Promise<boolean> {
  try {
    const currentBalance = await getAccountBalance(accountNumber);

    if (currentBalance === undefined) {
      throw new Error("Balance not available.");
    }
    if (currentBalance < amount) {
      throw new Error("Insufficient funds.");
    }
    return currentBalance >= amount;
  } catch (error: string | any) {
    throw new Error(`Error while checking account balance: ${error.message}`);
  }
}
