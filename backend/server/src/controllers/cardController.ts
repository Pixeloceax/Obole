import { Request, Response } from "express";
import User from "../models/user.model";
import { getAccount } from "../utils/getaccountNumber.utils";
import { sendNewCardEmail } from "../utils/email.utils";

export async function addCard(req: Request, res: Response) {
  try {
    const accountNumber = await getAccount(req, res);
    const user = await User.findOne({ "Account.accountNumber": accountNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const cardNumber = Math.floor(Math.random() * 10000000000000000);
    const date = new Date();
    date.setFullYear(date.getFullYear() + 5);
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const expirationDate = `${month.toString().padStart(2, "0")}/${year}`;
    const code = Math.floor(Math.random() * 10000);
    const CCV = Math.floor(Math.random() * 1000);
    const limit = 5000;
    const used = 0;

    const cardData = {
      cardNumber,
      expirationDate,
      code,
      CCV,
      locked: false,
      opposition: false,
      limit,
      used,
    };

    if (user.Information?.email) {
      sendNewCardEmail(
        user.Information.email,
        cardNumber,
        code,
        CCV,
        expirationDate
      );
    }

    user.Card.push(cardData);

    await user.save();

    res.status(201).json({ message: "Card added successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to add card to the user." });
  }
}

export async function getAllCards(req: Request, res: Response) {
  try {
    const accountNumber = await getAccount(req, res);

    const user = await User.findOne({ "Account.accountNumber": accountNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const cards = user.Card;
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to get cards for the user." });
  }
}

export async function updateCard(req: Request, res: Response) {
  try {
    const accountNumber = await getAccount(req, res);
    const cardNumber = req.params.cardNumber;
    const { locked, opposition, limit } = req.body;

    const user = await User.findOne({ "Account.accountNumber": accountNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const cardIndex = user.Card.findIndex(
      (card) => card.cardNumber === Number(cardNumber)
    );

    if (cardIndex === -1) {
      return res.status(404).json({ error: "Card not found for the user." });
    }

    if (locked !== undefined) {
      user.Card[cardIndex].locked = locked;
    }

    if (opposition !== undefined) {
      user.Card[cardIndex].opposition = opposition;
    }

    if (limit !== undefined) {
      user.Card[cardIndex].limit = limit;
    }

    await user.save();

    res.json({ message: "Card updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the card for the user." });
  }
}

export async function deleteCard(req: Request, res: Response) {
  try {
    const accountNumber = await getAccount(req, res);
    const cardNumber = req.params.cardNumber;

    const user = await User.findOne({ "Account.accountNumber": accountNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const cardIndex = user.Card.findIndex(
      (card) => card.cardNumber === Number(cardNumber)
    );

    if (cardIndex === -1) {
      return res.status(404).json({ error: "Card not found for the user." });
    }

    user.Card.splice(cardIndex, 1);

    await user.save();

    res.json({ message: "Card deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the card for the user." });
  }
}
