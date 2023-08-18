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

  it("should open a saving account successfully", async () => {
    // Mock necessary dependencies
    (getAccount as jest.Mock).mockResolvedValue("account123");
    (User.findOne as jest.Mock).mockResolvedValue({
      SavingsAccount: [],
      save: jest.fn(),
    });

    // Provide required request body data
    mockRequest.body.type = "A";

    await openSaving(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it("should get saving accounts successfully", async () => {
    // Mock necessary dependencies
    (getAccount as jest.Mock).mockResolvedValue("account123");
    (User.findOne as jest.Mock).mockResolvedValue({
      SavingsAccount: [{ type: "A", savingsBalance: 100 }],
    });

    await getSaving(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
  });

  // Add tests for updatePrevisional function if it's exported and required
});
