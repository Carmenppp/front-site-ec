import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useOrderStore = defineStore("order", ()=>{
    const orders  = ref([]);
    const userStore = useUserStore()
    const createOrder = async(data)=>{
            try {
                 await api.post(
                    "/orders/",
                    { 
                        userId: data.userId,
                        status: data.status
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

    const getOrder = async()=>{
        try {
            const res = await api.get(
                "/orders/", 
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                } 
            );
        orders.value = res.data.orders.map(item => item)
    } catch (error) {
        console.log(error)
    }
}

const getOrderById = async (id) =>{
    try {
       const res = await api.get(
            `/orders/${id}`, 
            {
                headers: {
                    Authorization: 'Bearer ' + userStore.token
                }
            } 
        );
        orders.value = res.data.product
} catch (error) {
    console.log(error)
}
}

const editOrder = async (id, data) =>{
    try {
        await api.patch(
            `/orders/${id}`, 
            { 
                userId: data.userId,
                status: data.status
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

const deleteOrder = async (id) =>{
    try {
        await api.delete(
            `/orders/${id}`, 
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
        createOrder,
        getOrder,
        orders,
        editOrder,
        deleteOrder,
        getOrderById
    }
})