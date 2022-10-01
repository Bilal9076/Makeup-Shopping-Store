import {ORDER_PRODUCT,SET_ORDER,DELETE_ORDER} from '../Action/Orders';
import OrderItem from '../../models/Order-item';

const initialState ={
Orders:[],
UserOrder:[]
}

export default (state=initialState,action )=>{
      
    switch(action.type){
        case SET_ORDER:
            return {
                Orders:action.OrdersProduct,
                UserOrder:action.OrdersUserProduct
            }
        case ORDER_PRODUCT:
         const Orderitems = new OrderItem(
            action.OrderItem.id,
            action.OrderItem.OnwerId,
            action.OrderItem.name,
            action.OrderItem.number,
            action.OrderItem.City,
            action.OrderItem.PostalAddress,
          action.OrderItem.items,
          action.OrderItem.Amount,
          action.OrderItem.Method,
          action.OrderItem.data
         )
         return {
             ...state,
             Orders:state.Orders.concat(Orderitems),
             UserOrder:state.UserOrder.concat(Orderitems)
         }
         case DELETE_ORDER:
            return {
                ...state,
                Orders: state.Orders.filter(Orders => Orders.Id !== action.Orderid),
                UserOrder: state.UserOrder.filter(Orders => Orders.Id !== action.Orderid),
            };
    }

    return state;
}