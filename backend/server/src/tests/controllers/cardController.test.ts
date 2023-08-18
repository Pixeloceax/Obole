import { Request, Response } from "express";
import {
  addCard,
  getAllCards,
  updateCard,
  deleteCard,
} from "../../controllers/cardController";
import User from "../../models/user.model";
import { getAccount } from "../../utils/getaccountNumber.utils";

jest.mock("../../models/user.model");
jest.mock("../../utils/getaccountNumber.utils");

describe("Card Controller Unit Tests", () => {
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

  it("should add a card successfully", async () => {
    (getAccount as jest.Mock).mockResolvedValue("mockedAccountNumber");
    (User.findOne as jest.Mock).mockResolvedValue({
      Card: [],
      save: jest.fn(),
    });

    await addCard(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Card added successfully.",
    });
  });

  it("should get all cards for a user", async () => {
    (getAccount as jest.Mock).mockResolvedValue("mockedAccountNumber");
    (User.findOne as jest.Mock).mockResolvedValue({
      Card: [{ cardNumber: 123 }],
      save: jest.fn(),
    });

    await getAllCards(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith([{ cardNumber: 123 }]);
  });

  it("should update a card successfully", async () => {
    (getAccount as jest.Mock).mockResolvedValue("mockedAccountNumber");
    (User.findOne as jest.Mock).mockResolvedValue({
      Card: [{ cardNumber: 123, locked: false }],
      save: jest.fn(),
    });

    const mockReq = {
      ...mockRequest,
      params: { cardNumber: "123" },
      body: { locked: true },
    };

    await updateCard(mockReq as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Card updated successfully.",
    });
  });

  it("should delete a card successfully", async () => {
    (getAccount as jest.Mock).mockResolvedValue("mockedAccountNumber");
    (User.findOne as jest.Mock).mockResolvedValue({
      Card: [{ cardNumber: 123 }],
      save: jest.fn(),
    });

    const mockReq = {
      ...mockRequest,
      params: { cardNumber: "123" },
    };

    await deleteCard(mockReq as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Card deleted successfully.",
    });
  });
});
