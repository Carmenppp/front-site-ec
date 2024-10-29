import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useBrandStore = defineStore("brand", () => {
    const brands = ref([]);
    const userStore = useUserStore()
    const createBrand = async (data) => {
        try {
            await api.post(
                "/brands/",
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

    const getBrand = async () => {
        try {
            const res = await api.get(
                "/brands/",
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            brands.value = res.data.brands.map(item => item)
        } catch (error) {
            console.log(error)
        }
    }
    const getBrandById = async (id) =>{
        try {
           const res = await api.get(
                `/brands/${id}`, 
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                } 
            );
            brands.value = res.data.brand
    } catch (error) {
        console.log(error)
    }
    }

    const editBrand = async (id, data) => {
        try {
            await api.patch(
                `/brands/${id}`,
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

    const deleteBrand = async (id) => {
        try {
            await api.delete(
                `/brands/${id}`,
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
        createBrand,
        getBrand,
        brands,
        editBrand,
        deleteBrand,
        getBrandById
    }
})