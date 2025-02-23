import { QueryParamsType } from "../page";
import { EventType } from "../services/fetchEvents";

export const applyFilters = (data: EventType[], filters: QueryParamsType) => {
  if (!filters.location && !filters.category && !filters.isFree) {
    return data;
  }
  const filteredData = data.filter((i) => {
    let condition = true;
    if (filters.location) {
      condition = condition && i.locationName === filters.location;
    }
    if (filters.category) {
      condition = condition && i.category === filters.category;
    }
    if (filters.isFree && filters.isFree === "true") {
      condition = condition && i.isFree.toString() == filters.isFree;
    }
    return condition;
  });
  return filteredData;
};
