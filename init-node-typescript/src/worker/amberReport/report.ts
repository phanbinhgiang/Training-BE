/* eslint-disable no-underscore-dangle */
import AmberReport from '../../model/amberReport/Report';
import QueryData from '../../common/queryDB';

export default class ReportWorker {
  static async getReport(req, res, next) {
    const {
      from, to,
    } = req.query;

    const post = new QueryData(from, to);
    const groupDataPost = await post.getResPost();

    const interaction = new QueryData(from, to);
    const {
      groupDataView,
      groupDataLove,
      groupDataBookmark,
      groupDataRating,
    } = await interaction.getInteractions();

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
      const dataFind = await AmberReport.findOne({ date: item.date }, '_id');
      if (dataFind === null) {
        await AmberReport.create(item);
      } else {
        await dataFind.updateOne(item);
      }
    });

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
    await AmberReport.find({})
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
  }
}
