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
const queryDB_1 = __importDefault(require("../../common/queryDB"));
class InteractionWorker {
    static getView(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to, } = req.query;
            // const dataRes = await Interaction.find({
            //   createdAt: {
            //     $gte: new Date(1672671600000),
            //     $lte: new Date(1672803323000),
            //   },
            //   type: 'view',
            // });
            // const groupDataView = await Interaction.aggregate([
            //   {
            //     $match: {
            //       createdAt: {
            //         $gte: new Date(parseInt(from)),
            //         $lte: new Date(parseInt(to)),
            //       },
            //       type: 'view',
            //     },
            //   },
            //   {
            //     $group: {
            //       _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            //       totalView: { $sum: { $first: '$relatedID' } },
            //     },
            //   },
            // ]);
            // const groupDataLove = await Interaction.aggregate([
            //   {
            //     $match: {
            //       createdAt: {
            //         $gte: new Date(parseInt(from)),
            //         $lte: new Date(parseInt(to)),
            //       },
            //       type: 'love',
            //     },
            //   },
            //   {
            //     $group: {
            //       _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            //       totalView: { $sum: 1 },
            //     },
            //   },
            // ]);
            // const groupDataBookmark = await Interaction.aggregate([
            //   {
            //     $match: {
            //       createdAt: {
            //         $gte: new Date(parseInt(from)),
            //         $lte: new Date(parseInt(to)),
            //       },
            //       type: 'bookmark',
            //     },
            //   },
            //   {
            //     $group: {
            //       _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            //       totalView: { $sum: 1 },
            //     },
            //   },
            // ]);
            // const groupDataRating = await Interaction.aggregate([
            //   {
            //     $match: {
            //       createdAt: {
            //         $gte: new Date(parseInt(from)),
            //         $lte: new Date(parseInt(to)),
            //       },
            //       type: 'rating',
            //     },
            //   },
            //   {
            //     $group: {
            //       _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            //       totalView: { $sum: 1 },
            //     },
            //   },
            // ]);
            const interaction = new queryDB_1.default(from, to);
            const { groupDataView, groupDataLove, groupDataBookmark, groupDataRating, } = yield interaction.getInteractions();
            req.response = {
                view: groupDataView,
                love: groupDataLove,
                bookmark: groupDataBookmark,
                rating: groupDataRating,
            };
            next();
        });
    }
}
exports.default = InteractionWorker;
//# sourceMappingURL=interaction.js.map