import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useInventoryStore = defineStore("inventory", ()=>{
    const inventory  = ref([]);
    const userStore = useUserStore()
    const createInventory = async(data)=>{
            try {
                 await api.post(
                    "/inventory/",
                    { 
                        productId: data.productId, 
                        quantity: data.quantity,
                        movementType: data.movementType,
                        description: data.description,
                        movementDate: data.movementDate
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

    const getInventory = async()=>{
        try {
            const res = await api.get(
                "/inventory/", 
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                } 
            );
        inventory.value = res.data.inventory.map(item => item)
    } catch (error) {
        console.log(error)
    }
}

const getInventoryById = async (id) =>{
    try {
       const res = await api.get(
            `/inventory/${id}`, 
            {
                headers: {
                    Authorization: 'Bearer ' + userStore.token
                }
            } 
        );
        inventory.value = res.data.product
} catch (error) {
    console.log(error)
}
}

const editInventory = async (id, data) =>{
    try {
        await api.patch(
            `/inventory/${id}`, 
            { 
                productId: data.productId, 
                quantity: data.quantity,
                movementType: data.movementType,
                description: data.description,
                movementDate: data.movementDate
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

const deleteInventory = async (id) =>{
    try {
        await api.delete(
            `/inventory/${id}`, 
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
        createInventory,
        getInventory,
        inventory,
        editInventory,
        deleteInventory,
        getInventoryById
    }
})