import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useShippingStore = defineStore("shipping", () => {
    const shippingAd = ref([]);
    const userStore = useUserStore()
    const createCategory = async (data) => {
        try {
            await api.post(
                "/shippingAd/",
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

    const getShippingAd = async () => {
        try {
            const res = await api.get(
                "/shippingAd/",
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            shippingAd.value = res.data.shippingAddres.map(item => item)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategById = async (id) =>{
        try {
           const res = await api.get(
                `/shippingAd/${id}`, 
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                } 
            );
            shippingAd.value = res.data.category
    } catch (error) {
        console.log(error)
    }
    }

    const editCategory = async (id, data) => {
        try {
            await api.patch(
                `/shippingAd/${id}`,
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

    const deleteCategory = async (id) => {
        try {
            await api.delete(
                `/shippingAd/${id}`,
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
        createCategory,
        getShippingAd,
        getCategById,
        shippingAd,
        editCategory,
        deleteCategory
    }
})