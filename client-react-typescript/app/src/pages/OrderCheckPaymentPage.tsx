import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import Loader from "../components/Loader.tsx";
import { useAppDispatch, useAppSelector } from "../store.ts";
import { emptyCart } from "../slices/CartSlice.ts";
import { fetchOrderPaymentStatus } from "../slices/OrderPaymentStatus.ts";
import { fetchOrders } from "../slices/OrdersSlice.ts";

export default function OrderCheckPaymentPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { orderUUID: orderId } = useParams()
    const { orderId: bankOrderId } = Object.fromEntries(useSearchParams()[0])

    const { status: orderPaymentStatus } = useAppSelector(state =>
        state.orderPaymentStatus
    )

    useEffect(() => {
        dispatch(fetchOrderPaymentStatus({ orderId: orderId, bankOrderId: bankOrderId }))
    }, [])

    useEffect(() => {
        async function proceedOrder() {
            if (orderPaymentStatus === 'successful') {
                await dispatch(emptyCart())
                await dispatch(fetchOrders())
                navigate('/orders', {
                    state: {
                        orderId: orderId,
                        paymentStatus: orderPaymentStatus
                    },
                    replace: true
                })
            }
            else if (orderPaymentStatus === 'failure')
                navigate('/cart', {
                    state: {
                        orderId: orderId,
                        paymentStatus: orderPaymentStatus
                    },
                    replace: true
                })
        }

        const _ = proceedOrder()
    }, [orderPaymentStatus])

    return createPortal(<Loader />, document.body)
}
