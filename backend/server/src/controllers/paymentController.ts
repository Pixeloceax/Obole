import { Request, Response } from "express";
import Payment from "../models/payment.model";
import UserModel from "../models/user.model";
import {
  getAccountBalance,
  updateAccountBalance,
  checkAccountBalance,
} from "../utils/accountBalance.utils";

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
    const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
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

async function validateCCV(CCV: string): Promise<boolean> {
  try {
    const user = await UserModel.findOne({
      "Card.CCV": CCV,
    });
    if (CCV.length != 3) {
      throw new Error(`The CCV ${CCV} is not valid.`);
    } else if (!user) {
      throw new Error(`The CCV ${CCV} was not found.`);
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
      "Card.cardHolderName": cardHolderName,
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

async function validSatus(status: string): Promise<boolean> {
  try {
    if (status != "locked" && status != "opposition") {
      throw new Error(`The status ${status} is not valid.`);
    }
    return true;
  } catch (error: any) {
    throw new Error(`Error while validating status: ${error.message}`);
  }
}

export async function processPayment(amount: number, accountNumber: string) {
  try {
    const currentBalance = await getAccountBalance(accountNumber);
    if (currentBalance === undefined) {
      throw new Error("Balance not available.");
    }
    if (currentBalance < amount) {
      throw new Error("Insufficient funds.");
    }
    const newBalance = currentBalance - amount;
    await updateAccountBalance(accountNumber, newBalance);
  } catch (error: string | any) {
    throw new Error(`Error while processing payment: ${error.message}`);
  }
}

export async function processRefund(transactionId: string, amount: number) {}
