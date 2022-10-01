import { EDIT_PRODUCT, CREATE_PRODUCT, SET_PRODUT,DELETE_PRODUCT } from '../Action/Product';
import Product from '../../models/Product'

const initialState = {
    Product: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUT:
            return {
                ...state,
                Product:action.product,
            }

        case CREATE_PRODUCT:
            const NewProduct = new Product(
                action.ProductData.id,
                action.ProductData.title,
                action.ProductData.category,
                action.ProductData.imageUrl,
                action.ProductData.price,
                action.ProductData.Description,
               
            )
            return {
                ...state,
                Product : state.Product.concat(NewProduct),
            };

        case EDIT_PRODUCT:
            const productIndex = state.Product.findIndex(prod => prod.id === action.pid)
            const Editedproduct = new Product(
                action.ProductData.id,
                action.ProductData.title,
                action.ProductData.category,
                action.ProductData.imageUrl,
                action.ProductData.price,
                action.ProductData.Description,
            )
            const newProduct = [...state.Product]
            newProduct[productIndex] = Editedproduct
            
            return {
                ...state,
                Product: newProduct,
            }
            case DELETE_PRODUCT:
            return {
                ...state,
                Product:
                    state.Product.filter(
                        product => product.id !== action.pid),
            }

    }
    return state
}