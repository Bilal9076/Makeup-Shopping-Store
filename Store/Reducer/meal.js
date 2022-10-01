import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITIES } from '../Action/meal';
import { FILTER_MEALS } from '../Action/meal'
const initialState = {
    meal: MEALS,
    FiltersMeal: MEALS,
    FavoritiesMeal: [],
}

const MealReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITIES:
            const existingIndex = state.FavoritiesMeal.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const availableMeal = [...state.FavoritiesMeal];
                availableMeal.splice(existingIndex, 1)
                return { ...state, FavoritiesMeal: availableMeal }
            } else {
                const mealId = state.meal.find(meal => meal.id === action.mealId);
                return { ...state, FavoritiesMeal: state.FavoritiesMeal.concat(mealId) }
            }
        case FILTER_MEALS:
            const appliedfilters = action.filters;
            const updatedfiltersMeal = state.meal.filter(meal => {
                if (appliedfilters.GlutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedfilters.Vegan && !meal.isVegan) {
                    return false;
                }
                if (appliedfilters.Vegetarin && !meal.isVegetarin) {
                    return false;
                }
                if (appliedfilters.LoctoseFree && !meal.isLoctoseFree) {
                    return false;
                };
                return true;
            });
            return {...state, FiltersMeal:updatedfiltersMeal};
        default:
            return state;
    };
    return state;
}
export default MealReducer;
