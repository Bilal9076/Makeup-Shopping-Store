export const SIGNUP_USER = 'SIGNUP_USER'
export const SET_SIGNUP_USER= 'SET_SIGNUP_USER'
export const DELETE_USER= 'DELETE_USER'
import SignUpClass from '../../models/SignUpUser'


export const fetchSignUpUser = () => {
    return async (dispatch,getState) => {
    //   const userId = getState().Auth.userId;
        try {
            const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/SignUpUser.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();
            // console.log(resData)

            const LoadedSignUpUser = []
            for (key in resData) {
                LoadedSignUpUser.push(new SignUpClass(
                    key,
                    resData[key].Email,
                    resData[key].Password,
                ))
            }
            // console.log(resData)
            dispatch({
                type: SET_SIGNUP_USER,
                SignUpUser: LoadedSignUpUser
            })
            // console.log(LoadedAcceptedLeave)
        } catch (err) {
            throw err
        }
    };
};

export const CreateSignUpUser = (Email,Password) => {
    const date = new Date();
    return async (dispatch,getState) => {
        // const userId = getState().StudentAuth.userId;
        // token = getState().AdminAuth.token;
        try {
            const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/SignUpUser.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Email,
                        Password
                    })
                }
            );
            const resData = await response.json();
            // console.log(onwerId)
            dispatch({
                type:SIGNUP_USER,
                id:resData.name,
                Email,
                Password
             
            });

        } catch (err) {
            console.log(err)
        }
    };
};

export const deleteUser = Id => {
    return async (dispatch, getState) => {  
        
        const response = await fetch(`https://makeupstore-8aebe-default-rtdb.firebaseio.com/SignUpUser/${Id}.json`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        dispatch({
            type:  DELETE_USER, Userid: Id
        })
    };
};