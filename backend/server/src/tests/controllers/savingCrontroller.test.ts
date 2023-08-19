import { Request, Response } from "express";
import { openSaving, getSaving } from "../../controllers/savingController";
import User from "../../models/user.model";
import { getAccount } from "../../utils/getaccountNumber.utils";

jest.mock("../../models/user.model");
jest.mock("../../utils/getaccountNumber.utils");

describe("Saving Controller Unit Tests", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn((code: number) => mockResponse),
      json: jest.fn(),
    } as unknown as Response<any, Record<string, any>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should open a new saving account successfully", async () => {
    (getAccount as jest.Mock).mockResolvedValue("mockedAccountNumber");
    (User.findOne as jest.Mock).mockResolvedValue({
      SavingsAccount: [],
      save: jest.fn(),
    });

    mockRequest.body = { type: "A" };

    await openSaving(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith([
      {
        savingAccountNumber: expect.any(Number),
        type: "A",
        savingsBalance: 0,
        interestRate: 1,
      },
    ]);
  });

  it("should get saving accounts successfully", async () => {
    (getAccount as jest.Mock).mockResolvedValue("mockedAccountNumber");
    (User.findOne as jest.Mock).mockResolvedValue({
      SavingsAccount: [
        {
          type: "A",
          interestRate: 1,
          savingAccountNumber: 123456,
          savingsBalance: 100,
        },
      ],
      save: jest.fn(),
    });

    await getSaving(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([
      {
        savingAccountNumber: 123456,
        type: "A",
        savingsBalance: 100,
        interestRate: 1,
      },
    ]);
  });
});
