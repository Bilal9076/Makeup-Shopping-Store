import SignUpClass from '../../models/SignUpUser'
import { SIGNUP_USER, SET_SIGNUP_USER,DELETE_USER } from '../Action/AuthAction'


const initialState = {
    SignUpUser: [],
    // AllLeave: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SIGNUP_USER:
            return {
                ...state,
                SignUpUser: action.SignUpUser,
                // AllLeave: action.AllLeave
            }

        case SIGNUP_USER:
            const totalUser = new  SignUpClass(
                action.id,
                action.Email,
                action.Password
            )
            return {
                ...state,
                SignUpUser: state.SignUpUser.concat(totalUser),
                // AllLeave: state.AllLeave.concat(totalLeave),
            }
           
        case DELETE_USER:
            return {
                ...state,
                SignUpUser: state.SignUpUser.filter(User => User.Id !== action.Userid),
            };
    }


    return state;
}