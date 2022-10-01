import { ADD_TO_CARD, REMOVE_CART_ITEM } from "../Action/Cart";
import CartItem from "../../models/Card-item";
import { ORDER_PRODUCT } from '../Action/Orders';
import { DELETE_PRODUCT } from '../Action/Product';
const initialState = {
    items: {},
    TotalAmount: 0
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CARD:
            let UpdatedProduct;

            const AddProduct = action.product;
            const prodTitle = AddProduct.title;
            const ProdPrice = AddProduct.price;
            const ProdImgUrl = AddProduct.imageUrl
            // const PushToken = AddProduct.PushToken;

            if (state.items[AddProduct.id]) {
                // already product has been added
                UpdatedProduct = new CartItem(
                    state.items[AddProduct.id].qauntity + 1,
                    ProdPrice,
                    prodTitle,
                    ProdImgUrl,
                    // PushToken,
                    state.items[AddProduct.id].sum + ProdPrice
                );
            }
            else {
                UpdatedProduct = new CartItem(1, ProdPrice, prodTitle,ProdImgUrl, ProdPrice);

            }
            return {
                ...state,
                items: { ...state.items, [AddProduct.id]: UpdatedProduct },
                TotalAmount: state.TotalAmount + ProdPrice,
            };

        case REMOVE_CART_ITEM:
            let UpadatedCartItems;
            const SelectProduct = state.items[action.pid];
            const ProductQty = SelectProduct.qauntity;
            if (ProductQty > 1) {
                // just decrease Quantity don't remove
                const UpadatedCartItem = new CartItem(
                    SelectProduct.qauntity - 1,
                    SelectProduct.productPrice,
                    SelectProduct.productTitle,
                    SelectProduct.productImageUrl,
                    // SelectProduct.PushToken,
                    SelectProduct.sum - SelectProduct.productPrice
                );
                UpadatedCartItems = { ...state.items, [action.pid]: UpadatedCartItem };
            }
            else {
                // remove item
                UpadatedCartItems = { ...state.items };
                delete UpadatedCartItems[action.pid];
            }
            return {
                ...state,
                items: UpadatedCartItems,
                TotalAmount: state.TotalAmount - SelectProduct.productPrice,
            };
        case ORDER_PRODUCT:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            }
            const updateproduct = { ...state.items }
            delete updateproduct[action.pid];
            const totalamount = state.items[action.pid].sum;
            return {
                ...state,
                items: updateproduct,
                TotalAmount: state.TotalAmount - totalamount
            }
    }

    return state;
};