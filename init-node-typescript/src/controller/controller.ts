import Post from '../model/system/Post';
import Interaction from '../model/interaction/Interaction';

const resPost = async (from, to) => {
  const groupData = await Post.aggregate([
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
};

const resInteractions = async (from, to) => {
  const groupDataView = await Interaction.aggregate([
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

  const groupDataLove = await Interaction.aggregate([
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

  const groupDataBookmark = await Interaction.aggregate([
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

  const groupDataRating = await Interaction.aggregate([
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
};

export { resPost, resInteractions };
