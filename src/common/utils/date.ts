import moment from "moment";
import Config from "../../config/config";

export const format = (date: Date, pattern = Config.DEFAULT_DATE_FORMAT) => {
  return moment(date).format(pattern);
};
