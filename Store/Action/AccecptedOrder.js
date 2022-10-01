export const ACCEPTED_ORDER = 'ACCEPTED_ORDER'
export const SET_ACCEPTED_ORDER= 'SET_ACCEPTED_ORDER'
import AcceptedOrder from '../../models/AcceptedOrder'


export const fetchAcceptedOrder = () => {
    return async (dispatch,getState) => {
      const userId = getState().Auth.userId;
        try {
            const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/Acceptedorder.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();
            // console.log(resData)

            const LoadedAcceptedOrder = []
            for (key in resData) {
                LoadedAcceptedOrder.push(new AcceptedOrder(
                    key,
                    resData[key].onwerId,
                    resData[key].Amount,
                    resData[key].Name,
                    resData[key].Number,
                    resData[key].City,
                    resData[key].PostalAddress,
                    resData[key].item,
                    resData[key].Method,
                    resData[key].Remarks,
                    new Date(resData[key].date),
                ))
            }
            // console.log(resData)
            dispatch({
                type: SET_ACCEPTED_ORDER,
                AcceptedOrder: LoadedAcceptedOrder.filter(prof => prof.onwerId === userId),
                // AllLeave: LoadedAcceptedLeave
            })
            // console.log(LoadedAcceptedLeave)
        } catch (err) {
            throw err
        }
    };
};

export const CreateAcceptedOrder = (onwerId,Amount,Name,Number,City,PostalAddress,item,Method,Remarks) => {
    const date = new Date();
    return async (dispatch,getState) => {
        // const userId = getState().StudentAuth.userId;
        // token = getState().AdminAuth.token;
        try {
            const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/Acceptedorder.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        onwerId,
                        Amount,
                        Name,
                        Number,
                        City,
                        PostalAddress,
                        item,
                        Method,
                        Remarks,
                        date: date,
                    })
                }
            );
            const resData = await response.json();
            console.log(onwerId)
            dispatch({
                type:ACCEPTED_ORDER,
                id:resData.name,
                Amount,
                onwerId,
                Name,
                Number,
                City,
                PostalAddress,
                item,
                Method,
                Remarks,
                date: date,
             
            });

        } catch (err) {
            console.log(err)
        }
    };
};