import AcceptedOrder from '../../models/AcceptedOrder'
import { ACCEPTED_ORDER, SET_ACCEPTED_ORDER } from '../Action/AccecptedOrder'


const initialState = {
    AcceptedOrder: [],
    // AllLeave: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCEPTED_ORDER:
            return {
                ...state,
                AcceptedOrder: action.AcceptedOrder,
                // AllLeave: action.AllLeave
            }

        case ACCEPTED_ORDER:
            const totalOrder = new AcceptedOrder(
                action.id,
                action.onwerId,
                action.Amount,
                action.Name,
                action.Number,
                action.City,
                action.PostalAddress,
                action.item,
                action.Method,
                action.Remarks,
                action.date,

            )
            return {
                ...state,
                AcceptedOrder: state.AcceptedOrder.concat(totalOrder),
                // AllLeave: state.AllLeave.concat(totalLeave),
            }
    }


    return state;
}