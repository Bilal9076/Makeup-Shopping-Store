export const TOGGLE_FAVORITIES = "TOGGLE_FAVORITIES";
export const FILTER_MEALS = 'FILTER_MEALS';

export const toggleFavorities = (id) => {
    return { type: TOGGLE_FAVORITIES, mealId: id };
};
export const filterHandler = (filterSetting) => {
    return { type: FILTER_MEALS, filters: filterSetting };
};