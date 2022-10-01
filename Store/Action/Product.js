export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const  CREATE_PRODUCT = 'CREATE_PRODUCT'
export const SET_PRODUT = 'SET_PRODUT';
import Product from '../../models/Product'

export const fetchData = () => {
    return async (dispatch,getState) => {
        try {
            const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/Product.json');
            if(!response.ok){
                throw new Error ('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedProduct = []
            for (key in resData) {
                LoadedProduct.push(new Product(
                    key,
                    resData[key].title,
                    resData[key].Category,
                    resData[key].image,
                    resData[key].price,
                    resData[key].Description,
                ))
            }
            // console.log(LoadedProduct)
            dispatch({
                type: SET_PRODUT,
                product: LoadedProduct,
                // AllProfile:LoadedProduct
                // userProduct:LoadedData.filter(prod=>prod.onwerId===userId)
            })
        } catch (err) {
           throw err 
        }
    };
};


export const CreateProduct = (title, Category,image,price,Description) => {
        return async (dispatch,getState) => {  
        const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/Product.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                Category,
                image,
                price,
                Description
            })
        });
       
        const resData = await response.json();
        console.log(image)
        dispatch({
            type: CREATE_PRODUCT,
            ProductData: {
                id: resData.name,
                title,
                Category,
                image,
                price,
                Description
            }
        });
    };
};
export const Editproduct = (id,title, Category,image,price,Description) => {
    return async (dispatch,getState)  => {
        // token = getState().StudentAuth.token;
        // const userId = getState().StudentAuth.userId;
     const response=  await fetch(`https://makeupstore-8aebe-default-rtdb.firebaseio.com/Product/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                Category,
                image,
                price,
                Description
            })
        });
        if(!response.ok){
            throw new Error ('something went wrong')
        }
    
    dispatch({
        type: EDIT_PRODUCT,
        pid: id,
        ProductData: {
            title,
            Category,
            image,
            price,
            Description
        }
    });
}
}
export const DeleteProduct = productId => {
    return async (dispatch,getState) => { 
        const token = getState().Auth.token;
        const response = await fetch(`https://makeupstore-8aebe-default-rtdb.firebaseio.com/Product/${productId}.json`, {
            method: 'DELETE',
        });
        if(!response.ok){
            throw new Error ('something went wrong')
        }
        dispatch({
            type: DELETE_PRODUCT, pid: productId 
        })
   };
   };