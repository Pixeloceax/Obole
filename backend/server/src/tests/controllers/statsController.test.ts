import {
  getPaymentAndTransactionDataForStats,
  formattedTransactions,
  formattedPayments,
  getAllAccountTransactions,
  getAllAccountPayments,
} from "../../controllers/statsController";
import { Request, Response } from "express";

jest.mock("../../controllers/statsController");

describe("Payment and Transaction Statistics", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {} as Request;
    mockResponse = {
      status: jest.fn((code: number) => mockResponse),
      json: jest.fn(),
    } as unknown as Response<any, Record<string, any>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should format and retrieve payment and transaction data for statistics", async () => {
    const mockTransactions = [
      {
        sourceAccount: "435064872023",
        destinationAccount: "788884166645",
        amount: 100,
        currency: "EUR",
        description: "Transfer from savings account",
        type: "Transfer",
        status: "completed",
        date: new Date("2023-08-17T12:48:45.575+00:00"),
      },
    ];

    const mockPayments = [
      {
        accountNumber: "120310318043",
        cardNumber: "7044381002089064",
        cardHolderName: "John",
        amount: 20,
        categorie: "Others",
        date: new Date("2023-08-10T13:19:59.356+00:00"),
      },
    ];

    (getAllAccountTransactions as jest.Mock).mockResolvedValue(
      mockTransactions
    );
    (getAllAccountPayments as jest.Mock).mockResolvedValue(mockPayments);

    (formattedTransactions as jest.Mock).mockResolvedValue(mockTransactions);
    (formattedPayments as jest.Mock).mockResolvedValue(mockPayments);

    await getPaymentAndTransactionDataForStats(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.json).toHaveBeenCalledWith({
      transactions: formattedTransactions,
      payments: formattedPayments,
    });
  });

  it("should handle errors when getting statistics data", async () => {
    (formattedTransactions as jest.Mock).mockRejectedValue(
      new Error("Transaction error")
    );
    (formattedPayments as jest.Mock).mockRejectedValue(
      new Error("Payment error")
    );
    (getAllAccountTransactions as jest.Mock).mockResolvedValue([]);
    (getAllAccountPayments as jest.Mock).mockResolvedValue([]);

    await getPaymentAndTransactionDataForStats(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Failed to get statistics data: Transaction error",
    });
  });
});
