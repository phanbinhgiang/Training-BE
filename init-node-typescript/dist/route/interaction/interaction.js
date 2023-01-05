"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const interaction_1 = __importDefault(require("../../worker/interaction/interaction"));
const router = express_1.default.Router();
router.get('/count', interaction_1.default.getView);
exports.default = router;
//# sourceMappingURL=interaction.js.map