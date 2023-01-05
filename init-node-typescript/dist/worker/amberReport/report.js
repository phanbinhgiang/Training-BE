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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const Report_1 = __importDefault(require("../../model/amberReport/Report"));
const queryDB_1 = __importDefault(require("../../common/queryDB"));
class ReportWorker {
    static getReport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to, } = req.query;
            const post = new queryDB_1.default(from, to);
            const groupDataPost = yield post.getResPost();
            const interaction = new queryDB_1.default(from, to);
            const { groupDataView, groupDataLove, groupDataBookmark, groupDataRating, } = yield interaction.getInteractions();
            const data = [
                ...groupDataPost,
                ...groupDataView,
                ...groupDataLove,
                ...groupDataBookmark,
                ...groupDataRating,
            ];
            const listId = data.map((item) => item._id);
            const onlyUnique = (value, index, self) => self.indexOf(value) === index;
            const list = listId.filter(onlyUnique);
            const dataRes = list.map((index) => {
                const array = data.filter((item) => item._id === index);
                return Object.assign({}, ...array);
            });
            const getData = dataRes.map((item) => {
                const { _id } = item, rest = __rest(item, ["_id"]);
                return Object.assign({ date: _id }, rest);
            });
            // const createData = await AmberReport.insertMany(dataRes);
            // const getData = await AmberReport.find({});
            // const deleteData = await AmberReport.deleteMany({
            //   count: 1,
            // });
            // create and update data
            getData.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                const dataFind = yield Report_1.default.findOne({ date: item.date }, '_id');
                if (dataFind === null) {
                    yield Report_1.default.create(item);
                }
                else {
                    yield dataFind.updateOne(item);
                }
            }));
            // find One
            // await AmberReport.findOne({ count: 1 }).select('date count totalView').exec(
            //   (err, result) => {
            //     console.log(`@: ${result}`);
            //     req.response = {
            //       learn: result,
            //     }
            //   }
            // );
            // find All
            yield Report_1.default.find({})
                .select('date count totalView').limit(50)
                .sort({ totalView: -1 })
                .exec((err, result) => {
                req.response = {
                    data: result,
                    total: result.length,
                };
            });
            // req.response = {
            //   data: response,
            //   total: response.length,
            // };
            next();
        });
    }
}
exports.default = ReportWorker;
//# sourceMappingURL=report.js.map