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
exports.resInteractions = exports.resPost = void 0;
const Post_1 = __importDefault(require("../model/system/Post"));
const Interaction_1 = __importDefault(require("../model/interaction/Interaction"));
const resPost = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const groupData = yield Post_1.default.aggregate([
        {
            $match: {
                publishDate: {
                    $gte: parseFloat(from),
                    $lte: parseFloat(to),
                },
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
                count: { $sum: 1 },
            },
        },
    ]);
    // console.log({ groupData });
    return groupData;
});
exports.resPost = resPost;
const resInteractions = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    const groupDataView = yield Interaction_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(parseInt(from)),
                    $lte: new Date(parseInt(to)),
                },
                type: 'view',
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                totalView: { $sum: { $first: '$relatedID' } },
            },
        },
    ]);
    const groupDataLove = yield Interaction_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(parseInt(from)),
                    $lte: new Date(parseInt(to)),
                },
                type: 'love',
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                totalLove: { $sum: 1 },
            },
        },
    ]);
    const groupDataBookmark = yield Interaction_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(parseInt(from)),
                    $lte: new Date(parseInt(to)),
                },
                type: 'bookmark',
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                totalBookmark: { $sum: 1 },
            },
        },
    ]);
    const groupDataRating = yield Interaction_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(parseInt(from)),
                    $lte: new Date(parseInt(to)),
                },
                type: 'rating',
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                totalRating: { $sum: 1 },
            },
        },
    ]);
    // console.log({ groupDataView });
    return {
        groupDataView,
        groupDataLove,
        groupDataBookmark,
        groupDataRating,
    };
});
exports.resInteractions = resInteractions;
//# sourceMappingURL=controller.js.map