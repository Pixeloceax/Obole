"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function dbConnect() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI ||
            "mongodb+srv://obole:1YUM76QQgyYnfcbc@obole.dqfi0yz.mongodb.net/authDB?retryWrites=true&w=majority");
        console.log("Successfully connected to MongoDB Atlas!");
    }
    catch (error) {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    }
}
exports.default = dbConnect;
//# sourceMappingURL=dbConnect.js.map