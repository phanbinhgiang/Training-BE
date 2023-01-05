import Post from '../../model/system/Post';
import { resPost } from '../../controller/controller';

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

    const groupData = await resPost(from, to);

    next();
    req.response = {
      groupData,
      total,
    };
  }
}
