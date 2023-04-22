import moment from 'moment';

export const addMillisToCurrentDate = (millis: number) => {
  return moment().add(millis, 'ms').toDate();
};
