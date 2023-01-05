"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const get_1 = __importDefault(require("lodash/get"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./route/index"));
const connectDB_1 = require("./common/connectDB");
const constants_1 = require("./middleware/constants");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Hello Hello Hello!!!  World!');
});
const pretty = (req, res) => {
    if (!req.response && req.response !== 0 && req.response !== false) {
        res.status(500);
        return res.send(constants_1.mess500);
    }
    const message = {
        data: {},
        success: true,
        status: 400,
    };
    message.data = req.response;
    message.success = (0, get_1.default)(req.response, 'errMess') ? false : (req.success !== false);
    message.status = req.status || 200;
    return res.status(message.status).send(message);
};
app.use('/adapters', index_1.default, pretty);
app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
(0, connectDB_1.connectDatabase)();
//# sourceMappingURL=index.js.map