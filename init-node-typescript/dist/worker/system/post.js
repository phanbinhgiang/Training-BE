"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../../model/system/Post"));
const queryDB_1 = __importDefault(require("../../common/queryDB"));
class PostWorker {
    static getPostCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to, } = req.query;
            console.log({ req });
            // const payload = await Post.find({}).limit(10);
            const total = yield Post_1.default.countDocuments({
                publishDate: {
                    $gte: parseFloat(from),
                    $lte: parseFloat(to),
                },
            });
            // const groupData = await resPost(from, to);
            const post = new queryDB_1.default(from, to);
            const groupData = yield post.getResPost();
            next();
            req.response = {
                groupData,
                total,
            };
        });
    }
}
exports.default = PostWorker;
//# sourceMappingURL=post.js.map