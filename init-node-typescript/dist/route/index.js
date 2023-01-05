"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dagora_1 = __importDefault(require("./dagora"));
const system_1 = __importDefault(require("./system"));
const interaction_1 = __importDefault(require("./interaction"));
const amberReport_1 = __importDefault(require("./amberReport"));
const router = express_1.default.Router();
router.use('/dagora', dagora_1.default);
router.use('/post', system_1.default);
router.use('/interaction', interaction_1.default);
router.use('/report', amberReport_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map