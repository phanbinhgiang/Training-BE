import Post from '../../model/system/Post';
import QueryData from '../../common/queryDB';

export default class PostWorker {
  static async getPostCount(req, res, next) {
    const {
      from, to,
    } = req.query;

    console.log({ req });

    // const payload = await Post.find({}).limit(10);
    const total = await Post.countDocuments({
      publishDate: {
        $gte: parseFloat(from),
        $lte: parseFloat(to),
      },
    });

    // const groupData = await resPost(from, to);
    const post = new QueryData(from, to);
    const groupData = await post.getResPost();

    next();
    req.response = {
      groupData,
      total,
    };
  }
}
