import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';


export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
                return action.payload
        }
    }
})

export const { setPurchases } = purchasesSlice.actions;

export const getPurchases = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
        .then(res => {
            const purchasesSorted = res.data.data.purchases.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
            dispatch(setPurchases(purchasesSorted))
})  
        .finally(() => dispatch(setIsLoading(false)));
}

export default purchasesSlice.reducer;
