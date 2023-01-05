/* eslint-disable max-len */
export const getLength = (value: []): number => (value ? value.length : 0);

export const genSkipNum = (page: string, size: string): number => (parseInt(page, 10) - 1) * parseInt(size, 10);

export default getLength;
