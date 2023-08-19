import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserInfo } from "../../controllers/userController";
import User from "../../models/user.model";
import { getAccount } from "../../utils/getaccountNumber.utils";

jest.mock("../../models/user.model");
jest.mock("../../utils/getaccountNumber.utils");
jest.mock("jsonwebtoken");

describe("User Controller Unit Tests", () => {
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

  it("should get user info successfully", async () => {
    (getAccount as jest.Mock).mockResolvedValue("mockedAccountNumber");
    (User.findOne as jest.Mock).mockResolvedValue({
      _id: "mockedUserId",
      Account: { accountNumber: "mockedAccountNumber" },
      Information: { name: "John" },
    });

    await getUserInfo(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      _id: "mockedUserId",
      Account: { accountNumber: "mockedAccountNumber" },
      Information: { name: "John" },
    });
  });

  it("should return 404 if user is not found", async () => {
    (getAccount as jest.Mock).mockResolvedValue("mockedAccountNumber");
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await getUserInfo(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "User not found.",
    });
  });

  it("should return 403 if access token is invalid", async () => {
    (getAccount as jest.Mock).mockRejectedValue(
      new jwt.JsonWebTokenError("Invalid token")
    );

    await getUserInfo(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Invalid access token.",
    });
  });

  it("should return 500 for server error", async () => {
    (getAccount as jest.Mock).mockRejectedValue(new Error("Some server error"));

    await getUserInfo(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Server error" });
  });
});
