/* eslint-disable no-underscore-dangle */
import { resInteractions, resPost } from '../../controller/controller';
import AmberReport from '../../model/amberReport/Report';

export default class ReportWorker {
  static async getReport(req, res, next) {
    const {
      from, to,
    } = req.query;

    const groupDataPost = await resPost(from, to);
    const {
      groupDataView,
      groupDataLove,
      groupDataBookmark,
      groupDataRating,
    } = await resInteractions(from, to);

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
      const { _id, ...rest } = item;
      return { date: _id, ...rest };
    });
    // const createData = await AmberReport.insertMany(dataRes);
    // const getData = await AmberReport.find({});
    // const deleteData = await AmberReport.deleteMany({
    //   count: 1,
    // });

    // create and update data
    getData.forEach(async (item) => {
      const dataFind = await AmberReport.findOne({ date: item.date });
      if (dataFind === null) {
        await AmberReport.create(item);
      } else {
        await AmberReport.updateOne({ date: item.date }, item);
      }
    });

    // get all data
    const response = await AmberReport.find({});

    req.response = {
      data: response,
      total: response.length,
    };

    next();
  }
}
