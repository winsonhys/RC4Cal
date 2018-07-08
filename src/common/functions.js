import _ from "lodash";
import moment from "moment";
import { extendMoment } from "moment-range";
const MomentRanged = extendMoment(moment);

export const isNotFilled = fieldsError => {
  const errors = _.compact(_.values(fieldsError));
  return !(errors.length === 0);
};

export const getClashingEvents = (events, newEvent) => {
  const { start, end } = newEvent;
  const newEventTimeRange = MomentRanged.range(start, end);
  const clashEvents = _.filter(events, dayEvent => {
    const existingEventTimeRange = MomentRanged.range(
      dayEvent.start,
      dayEvent.end
    );
    return newEventTimeRange.overlaps(existingEventTimeRange);
  });

  return clashEvents;
};
