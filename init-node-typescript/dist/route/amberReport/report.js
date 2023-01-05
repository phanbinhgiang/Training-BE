"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const report_1 = __importDefault(require("../../worker/amberReport/report"));
const router = express_1.default.Router();
router.post('/', report_1.default.getReport);
exports.default = router;
//# sourceMappingURL=report.js.map