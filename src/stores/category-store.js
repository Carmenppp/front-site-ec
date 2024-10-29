import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useCategoryStore = defineStore("category", () => {
    const categories = ref([]);
    const userStore = useUserStore()
    const createCategory = async (data) => {
        try {
            const res = await api.post(
                "/categories/",
                {
                    description: data.description,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategory = async () => {
        try {
            const res = await api.get(
                "/categories/",
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            categories.value = res.data.categories.map(item => item)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategById = async (id) =>{
        try {
           const res = await api.get(
                `/categories/${id}`, 
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                } 
            );
            categories.value = res.data.category
    } catch (error) {
        console.log(error)
    }
    }

    const editCategory = async (id, data) => {
        try {
            await api.patch(
                `/categories/${id}`,
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
                `/categories/${id}`,
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
        getCategory,
        getCategById,
        categories,
        editCategory,
        deleteCategory
    }
})