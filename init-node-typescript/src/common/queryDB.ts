import Post from '../model/system/Post';
import Interaction from '../model/interaction/Interaction';

const getResType = async (from, to, value) => {
  const data = await Interaction.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(parseInt(from)),
          $lte: new Date(parseInt(to)),
        },
        type: value,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        totalLove: { $sum: 1 },
      },
    },
  ]);

  return data;
};

export default class QueryData {
  from: any;

  to: any;

  public constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  public async getResPost() {
    const groupData = await Post.aggregate([
      {
        $match: {
          publishDate: {
            $gte: parseFloat(this.from),
            $lte: parseFloat(this.to),
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
  }

  public async getInteractions() {
    const groupDataView = await Interaction.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(parseInt(this.from)),
            $lte: new Date(parseInt(this.to)),
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
    const groupDataLove = await getResType(this.from, this.to, 'love');
    const groupDataBookmark = await getResType(this.from, this.to, 'bookmark');
    const groupDataRating = await getResType(this.from, this.to, 'rating');
    return {
      groupDataView,
      groupDataLove,
      groupDataBookmark,
      groupDataRating,
    };
  }
}
