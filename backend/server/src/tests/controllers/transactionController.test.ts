import { Request, Response } from "express";
import {
  createTransaction,
  cancelTransaction,
  transferToSavingAccount,
  transferFromSavingAccount,
  getAllAccountTransactions,
} from "../../controllers/transactionController";

jest.mock("../../controllers/transactionController");

describe("Transaction Controller Unit Tests", () => {
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

  it("should create a new transaction successfully", async () => {
    const mockBody = {
      amount: 100,
      currency: "USD",
      description: "Test transaction",
      type: "Transfer",
    };

    const mockUser = {
      accountNumber: "1234567890",
    };

    mockRequest.body = mockBody;
    mockRequest.user = mockUser;

    await createTransaction(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it("should get all account transactions successfully", async () => {
    const mockAccountNumber = "1234567890";

    await getAllAccountTransactions(
      mockRequest as Request,
      mockResponse as Response
    );
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it("should cancel a transaction successfully", async () => {
    const mockBody = {
      transactionId: "1234567890",
    };

    const mockUser = {
      accountNumber: "1234567890",
    };

    mockRequest.body = mockBody;
    mockRequest.user = mockUser;

    await cancelTransaction(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it("should transfer to saving account successfully", async () => {
    const mockBody = {
      amount: 100,
      currency: "USD",
      description: "Test transaction",
      type: "Transfer",
    };

    const mockUser = {
      accountNumber: "1234567890",
    };

    mockRequest.body = mockBody;
    mockRequest.user = mockUser;

    await transferToSavingAccount(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it("should transfer from saving account successfully", async () => {
    const mockBody = {
      amount: 100,
      currency: "USD",
      description: "Test transaction",
      type: "Transfer",
    };

    const mockUser = {
      accountNumber: "1234567890",
    };

    mockRequest.body = mockBody;
    mockRequest.user = mockUser;

    await transferFromSavingAccount(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
