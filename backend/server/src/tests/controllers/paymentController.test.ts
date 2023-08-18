import { Request, Response } from "express";
import {
  getAllAccountPayments,
  processPayment,
} from "../../controllers/paymentController";
import UserModel from "../../models/user.model";
import Payment from "../../models/payment.model";
import {
  getAccountBalance,
  updateAccountBalance,
  checkAccountBalance,
} from "../../utils/accountBalance.utils";
import { getAccount } from "../../utils/getaccountNumber.utils";

jest.mock("../../models/user.model");
jest.mock("../../models/payment.model");
jest.mock("../../utils/accountBalance.utils");
jest.mock("../../utils/getaccountNumber.utils");

describe("Payment Controller Unit Tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn((code: number) => mockResponse),
      json: jest.fn(),
    } as unknown as Response<any, Record<string, any>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all account payments", async () => {
    (getAccount as jest.Mock).mockResolvedValue("account123");
    (Payment.find as jest.Mock).mockResolvedValue([]);
    await getAllAccountPayments(
      mockRequest as Request,
      mockResponse as Response
    );
    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });

  it("should process a payment successfully", async () => {
    // Mock necessary dependencies and provide request body data
    (UserModel.findOne as jest.Mock).mockResolvedValue({});
    (Payment.prototype.save as jest.Mock).mockResolvedValue({});
    (getAccountBalance as jest.Mock).mockResolvedValue({});
    (checkAccountBalance as jest.Mock).mockResolvedValue({});
    (updateAccountBalance as jest.Mock).mockResolvedValue({});
    mockRequest.body.cardNumber = 123;
    mockRequest.body.CCV = 456;
    mockRequest.body.expirationDate = "12/30";
    mockRequest.body.cardHolderName = "John Doe";
    mockRequest.body.amount = 100;
    mockRequest.body.categorie = "Groceries";
    await processPayment(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
  });
});
