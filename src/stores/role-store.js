import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useRoleStore = defineStore("role", () => {
    const role = ref([]);
    const userStore = useUserStore()
    const createCategory = async (data) => {
        try {
            await api.post(
                "/role/",
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

    const getRole = async () => {
        try {
            const res = await api.get(
                "/role/",
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                }
            );
            role.value = res.data.role.map(item => item)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategById = async (id) =>{
        try {
           const res = await api.get(
                `/role/${id}`, 
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                } 
            );
            role.value = res.data.role
    } catch (error) {
        console.log(error)
    }
    }

    const editCategory = async (id, data) => {
        try {
            await api.patch(
                `/role/${id}`,
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
                `/role/${id}`,
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
        getRole,
        getCategById,
        role,
        editCategory,
        deleteCategory
    }
})