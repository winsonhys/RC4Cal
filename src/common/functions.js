import _ from "lodash";
export const isNotFilled = fieldsError => {
  const errors = _.compact(_.values(fieldsError));
  return !(errors.length === 0);
};
