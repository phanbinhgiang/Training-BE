"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("../../worker/system/post"));
const router = express_1.default.Router();
router.get('/count', post_1.default.getPostCount);
exports.default = router;
//# sourceMappingURL=post.js.map