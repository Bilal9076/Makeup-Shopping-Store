export const ORDER_PRODUCT = 'ORDER_PRODUCT';
export const SET_ORDER = 'SET_ORDER';
export const DELETE_ORDER= 'DELETE_ORDER'
import OrderItem from "../../models/Order-item";


export const fetchOrder = () => {
    return async (dispatch, getState) => {
        const userId = getState().Auth.userId;
        const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/Order.json'
        );
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        const loadedOrders = [];

        for (const key in resData) {
            loadedOrders.push(new OrderItem(
                key,
                resData[key].OnwerId,
                resData[key].name,
                resData[key].number,
                resData[key].City,
                resData[key].PostalAddress,
                resData[key].CardItem,
                resData[key].TotalAmount,
                resData[key].Method,
                new Date(resData[key].date)
            )
            );
        }
        // console.log(loadedOrders)
        dispatch({ 
            type: SET_ORDER, 
            OrdersUserProduct: loadedOrders.filter(prof => prof.OnwerId === userId),
            OrdersProduct:loadedOrders

         })
    }

}

export const OrdersProduct = (name, number, City, PostalAddress,CardItem, TotalAmount,Method) => {
    const date = new Date();
    return async (dispatch, getState) => {
        const token = getState().Auth.token;
        const userId = getState().Auth.userId;
        const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/Order.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                number,
                City,
                PostalAddress,
                CardItem,
                TotalAmount,
                OnwerId: userId,
                Method,
                date: date.toISOString()
               
            })
        });
        const resData = await response.json();
        console.log(Method)
        dispatch({
            type: ORDER_PRODUCT,
            OrderItem: {
                id: resData.name,
                name,
                number,
                City,
                PostalAddress,
                items: CardItem,
                Amount: TotalAmount,
                OnwerId: userId,
                Method,
                date: date
            }
        });

    }
}

export const deleteOrder = Id => {
    return async (dispatch, getState) => {  
        
        const response = await fetch(`https://makeupstore-8aebe-default-rtdb.firebaseio.com/Order/${Id}.json`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('something went wrong')
        }
        dispatch({
            type:  DELETE_ORDER, Orderid: Id
        })
    };
};