import moment from 'moment';
import {AppColors} from 'common/appColors';
import {Event_Category} from 'domain/enum/event';

export const getColorCategory = (value: string) => {
  let color = AppColors.green;
  switch (value) {
    case Event_Category.Brainstorm:
      color = AppColors.primary;
      break;
    case Event_Category.Workout:
      color = AppColors.blue;
      break;
    default:
      break;
  }
  return color;
};

export const convertDate = (date?: number, format?: string) => {
  if (date) {
    return moment(date).format(format);
  }
  return 'N/A';
};
