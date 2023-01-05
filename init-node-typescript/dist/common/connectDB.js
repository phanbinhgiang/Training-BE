"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
const connectDatabase = () => {
    mongoose_1.default.Promise = bluebird_1.default;
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connect(`mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`).then(() => {
        console.log('Coin98 Database connection created');
    });
};
exports.connectDatabase = connectDatabase;
exports.default = exports.connectDatabase;
//# sourceMappingURL=connectDB.js.map