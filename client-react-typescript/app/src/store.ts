import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

import { cartReducer } from './slices/CartSlice.ts';
import { OrderPaymentStatusReducer } from "./slices/OrderPaymentStatus.ts";
import { ordersReducer } from './slices/OrdersSlice.ts';
import { productReducer } from './slices/ProductSlice.ts';
import { storeReducer } from './slices/StoreSlice.ts';
import { userReducer } from './slices/UserSlice.ts'

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        store: storeReducer,
        cart: cartReducer,
        orders: ordersReducer,
        orderPaymentStatus: OrderPaymentStatusReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
