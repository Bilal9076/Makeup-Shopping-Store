import { CREATE_SOLD_PRODUCT, SET_SOLD_PRODUT } from '../Action/SoldProduct';
import SoldProduct from '../../models/Sold-Product'

const initialState = {
    Product: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SOLD_PRODUT:
            return {
                ...state,
                Product: action.Soldproduct,
            }

        case CREATE_SOLD_PRODUCT:
            const NewProduct = new SoldProduct(
                action.ProductData.id,
                action.ProductData.name,
                action.ProductData.number,
                action.ProductData.City,
                action.ProductData.PostalAddress,
                action.ProductData.items,
                action.ProductData.Amount,
                action.ProductData.Method,
                action.ProductData.data

            )
            return {
                ...state,
                Product: state.Product.concat(NewProduct),
            };


    }
    return state
}