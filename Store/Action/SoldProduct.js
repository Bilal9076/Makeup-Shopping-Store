export const  CREATE_SOLD_PRODUCT = 'CREATE_SOLD_PRODUCT'
export const SET_SOLD_PRODUT = 'SET_SOLD_PRODUT';
import SoldProduct from '../../models/Sold-Product'

export const fetchData = () => {
    return async (dispatch,getState) => {
        try {
            const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/SoldProduct.json');
            if(!response.ok){
                throw new Error ('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedSoldProduct = []
            for (key in resData) {
                LoadedSoldProduct.push(new SoldProduct(
                    key,
                    resData[key].name,
                    resData[key].number,
                    resData[key].City,
                    resData[key].PostalAddress,
                    resData[key].CardItem,
                    resData[key].TotalAmount,
                    resData[key].Method,
                    new Date(resData[key].date)
                ))
            }
            // console.log(LoadedSoldProduct)
            dispatch({
                type: SET_SOLD_PRODUT,
                Soldproduct: LoadedSoldProduct,
                // AllProfile:LoadedProduct
                // userProduct:LoadedData.filter(prod=>prod.onwerId===userId)
            })
        } catch (err) {
           throw err 
        }
    };
};


export const CreateSoldProduct = (name, number, City, PostalAddress,CardItem, TotalAmount,Method) => {
    const date = new Date();
        return async (dispatch,getState) => {  
        const response = await fetch('https://makeupstore-8aebe-default-rtdb.firebaseio.com/SoldProduct.json', {
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
                Method,
                date: date.toISOString()
            })
        });
       
        const resData = await response.json();
        // console.log(item)
        dispatch({
            type: CREATE_SOLD_PRODUCT,
            ProductData: {
                id: resData.name,
                name,
                number,
                City,
                PostalAddress,
                items: CardItem,
                Amount: TotalAmount,
                Method,
                date: date
            }
        });
    };
};
