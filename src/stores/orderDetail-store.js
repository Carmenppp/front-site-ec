import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useOrderDetailStore = defineStore("orderDetail", () => {
    const orderDetail = ref([]);
    const userStore = useUserStore()
    const createOrderD = async (data) => {
        try {
            await api.post(
                "/orderDetail/",
                {
                    cartId: data.cartId,
                    orderId: data.orderId,
                    price: data.price
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
        } catch (error) {
            console.log(error)
        }
    }

    const getOrderD = async () => {
        try {
            const res = await api.get(
                "/orderDetail/",
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            orderDetail.value = res.data.orderDetail.map(item => item)
        } catch (error) {
            console.log(error)
        }
    }

    const getOrderDById = async (id) => {
        try {
            const res = await api.get(
                `/orderDetail/${id}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            orderDetail.value = res.data.product
        } catch (error) {
            console.log(error)
        }
    }

    const editOrderD = async (id, data) => {
        try {
            await api.patch(
                `/orderDetail/${id}`,
                {
                    cartId: data.cartId,
                    orderId: data.orderId,
                    price: data.price
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
        } catch (error) {
            console.log(error)
        }
    }

    const deleteOrderD = async (id) => {
        try {
            await api.delete(
                `/orderDetail/${id}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
        } catch (error) {
            console.log(error)
        }
    }

    return {
        createOrderD,
        getOrderD,
        orderDetail,
        editOrderD,
        deleteOrderD,
        getOrderDById
    }
})