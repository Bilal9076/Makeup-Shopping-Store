export const ADD_TO_CARD = 'ADD_TO_CARD';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

export const AddToCard = product => {
    return { type: ADD_TO_CARD, product: product };
   
};
export const RemoveCardItem = productId => {
    return { type: REMOVE_CART_ITEM, pid: productId }
}

