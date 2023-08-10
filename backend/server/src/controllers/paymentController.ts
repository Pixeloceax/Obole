import { Request, Response } from "express";
import Payment from "../models/payment.model";
import UserModel from "../models/user.model";
import {
  getAccountBalance,
  updateAccountBalance,
  checkAccountBalance,
} from "../utils/accountBalance.utils";
import { getAccount } from "../utils/getaccountNumber.utils";

async function validateCreditCardNumber(cardNumber: number): Promise<boolean> {
  try {
    const user = await UserModel.findOne({
      "Card.cardNumber": cardNumber,
    });
    if (!user) {
      throw new Error(`The card number ${cardNumber} was not found.`);
    }
    return true;
  } catch (error: string | any) {
    throw new Error(
      `Error while validating credit card number: ${error.message}`
    );
  }
}

async function validateExpirationDate(
  expirationDate: string
): Promise<boolean> {
  try {
    const user = await UserModel.findOne({
      "Card.expirationDate": expirationDate,
    });
    const date = new Date();
    const currentDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      year: "2-digit",
    });
    if (expirationDate < currentDate) {
      throw new Error(`The expiration date ${expirationDate} is not valid.`);
    } else if (!user) {
      throw new Error(`The expiration date ${expirationDate} was not found.`);
    }
    return true;
  } catch (error: any) {
    throw new Error(`Error while validating expiration date: ${error.message}`);
  }
}

async function validateCCV(CCV: number, cardNumber: number): Promise<boolean> {
  try {
    const user = await UserModel.findOne({
      "Card.cardNumber": cardNumber,
    });

    if (!user) {
      throw new Error(`The card number ${cardNumber} was not found.`);
    }

    const card = user.Card.find((card) => card.cardNumber === cardNumber);
    if (!card) {
      throw new Error(`The card number ${cardNumber} was not found.`);
    }

    if (card.CCV !== CCV) {
      throw new Error(`The CCV ${CCV} is not valid.`);
    }

    return true;
  } catch (error: any) {
    throw new Error(`Error while validating CCV: ${error.message}`);
  }
}

async function validateCardHolderName(
  cardHolderName: string
): Promise<boolean> {
  try {
    const user = await UserModel.findOne({
      "Information.name": cardHolderName,
    });
    if (!user) {
      throw new Error(`The card holder name ${cardHolderName} was not found.`);
    }
    return true;
  } catch (error: any) {
    throw new Error(
      `Error while validating card holder name: ${error.message}`
    );
  }
}

async function validStatus(cardNumber: number): Promise<boolean> {
  try {
    const user = await UserModel.findOne({
      "Card.cardNumber": cardNumber,
    });
    if (!user) {
      throw new Error(`User not found.`);
    }
    const card = user.Card[0];
    if (card.locked === true) {
      throw new Error(`The card is locked.`);
    }
    if (card.opposition === true) {
      throw new Error(`The card is opposition.`);
    }

    return true;
  } catch (error: any) {
    throw new Error(`Error while check status: ${error.message}`);
  }
}

async function getAccountNumberFromCardNumber(cardNumber: number) {
  try {
    const user = await UserModel.findOne({
      "Card.cardNumber": cardNumber,
    });

    if (!user) {
      throw new Error(`No user found with card number ${cardNumber}`);
    }

    if (!user.Account) {
      throw new Error(
        `No account found for user with card number ${cardNumber}`
      );
    }
    const accountNumber = user.Account.accountNumber;

    return accountNumber;
  } catch (error: any) {
    throw new Error(`Error while retrieving account number: ${error.message}`);
  }
}

async function updateUsedCard(cardNumber: number, paymentAmount: number) {
  try {
    const user = await UserModel.findOne({
      "Card.cardNumber": cardNumber,
    });

    if (!user) {
      throw new Error(`No user found with card number ${cardNumber}`);
    }

    const card = user.Card.find((card) => card.cardNumber === cardNumber);

    if (!card) {
      throw new Error(`No card found for user with card number ${cardNumber}`);
    }

    if (card.used === undefined) {
      card.used = 0;
    }

    if (card.limit === undefined) {
      throw new Error(`No limit found for card with card number ${cardNumber}`);
    }

    if (card.used + paymentAmount <= card.limit) {
      card.used += paymentAmount;
      await user.save();
    } else {
      throw new Error(`The limit is exceeded.`);
    }
  } catch (error: any) {
    throw new Error(`Error while updating used card: ${error.message}`);
  }
}

export async function getAllAccountPayments(req: Request, res: Response) {
  try {
    const accountNumber = await getAccount(req, res);

    const payments = await Payment.find({
      accountNumber,
    });

    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ error: `Failed to get payments: ${error.message}` });
  }
}

export async function processPayment(req: Request, res: Response) {
  try {
    const cardNumber = req.body.cardNumber;
    const CCV = req.body.CCV;
    const expirationDate = req.body.expirationDate;
    const cardHolderName = req.body.cardHolderName;
    const paymentAmount = req.body.amount;
    const categorie = req.body.categorie;
    await validateCreditCardNumber(cardNumber);
    await validateExpirationDate(expirationDate);
    await validateCCV(CCV, cardNumber);
    await validateCardHolderName(cardHolderName);
    await validStatus(cardNumber);
    const accountNumber = await getAccountNumberFromCardNumber(cardNumber);
    if (accountNumber === undefined) {
      throw new Error("Account number is undefined");
    }
    await updateUsedCard(cardNumber, paymentAmount);
    await getAccountBalance(accountNumber);
    await checkAccountBalance(accountNumber, paymentAmount);
    await updateAccountBalance(accountNumber, paymentAmount, "subtract");

    const payment = new Payment({
      accountNumber,
      cardNumber,
      cardHolderName,
      amount: paymentAmount,
      categorie,
    });

    await payment.save();

    res.json(payment);
  } catch (error: string | any) {
    res
      .status(500)
      .json({ error: `Failed to process payment: ${error.message}` });
  }
}

export async function processRefund(req: Request, res: Response) {}
