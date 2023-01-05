import { createSchema, defaultModel } from '..';

export default createSchema({
  date: defaultModel.string,
  count: defaultModel.number,
  totalView: defaultModel.number,
  totalLove: defaultModel.number,
  totalBookmark: defaultModel.number,
  totalRating: defaultModel.number,
}, 'AmberReport', null, null);
