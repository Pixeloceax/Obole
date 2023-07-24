"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const register_route_1 = __importDefault(require("./routes/register.route"));
const card_route_1 = __importDefault(require("./routes/card.route"));
const dbConnect_1 = __importDefault(require("./database/dbConnect"));
const auth_1 = require("./middleware/auth");
const userController_1 = require("./controllers/userController");
const app = (0, express_1.default)();
(0, dbConnect_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", (req, res, next) => {
    res.json({ message: "Hey ! server is actualy running" });
    next();
});
app.post("/login", login_route_1.default);
app.post("/register", register_route_1.default);
app.get("/user", auth_1.authenticateToken, userController_1.getUserInfo);
app.use("/card", auth_1.authenticateToken, card_route_1.default);
app.get("/free-endpoint", (req, res) => {
    res.json({ message: "You are free to access me anytime" });
});
app.get("/protected-endpoint", auth_1.authenticateToken, (req, res) => {
    res.json({ message: "You are authorized to access me" });
});
exports.default = app;
//# sourceMappingURL=app.js.map