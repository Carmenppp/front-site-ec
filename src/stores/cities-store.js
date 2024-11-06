import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useCitiesStore = defineStore("cities", () => {
    const cities = ref([]);
    const userStore = useUserStore()
    const createCity = async (data) => {
        try {
            await api.post(
                "/cities/",
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

    const getCity = async () => {
        try {
            const res = await api.get(
                "/cities/",
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            cities.value = res.data.cities.map(item => item)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategById = async (id) =>{
        try {
           const res = await api.get(
                `/cities/${id}`, 
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                } 
            );
            cities.value = res.data.category
    } catch (error) {
        console.log(error)
    }
    }

    const editCategory = async (id, data) => {
        try {
            await api.patch(
                `/cities/${id}`,
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
                `/cities/${id}`,
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
        createCity,
        getCity,
        getCategById,
        cities,
        editCategory,
        deleteCategory
    }
})