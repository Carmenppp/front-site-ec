import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useCartStore = defineStore("cart", () => {
    const cart = ref([]);
    const userStore = useUserStore()
    const createCart = async (data) => {
        try {
            await api.post(
                "/cart/",
                {
                    productId: parseInt(data.productId, 10),
                    quantity: parseInt(data.quantity, 10),
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

    const getCartById = async () => {
        try {
            const res = await api.get(
                `/cart/`,
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            cart.value = Array.isArray(res.data.cart) ? res.data.cart : [res.data.cart];
        } catch (error) {
            console.log(error)
        }
    }

    const editCart = async (id, data) => {
        try {
            await api.patch(
                `/cart/${id}`,
                {
                    description: data.description,
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

    const deleteCart = async (id) => {
        try {
            await api.delete(
                `/cart/${id}`,
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
        createCart,
        cart,
        editCart,
        deleteCart,
        getCartById
    }
})