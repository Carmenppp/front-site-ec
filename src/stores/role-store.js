import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useRoleStore = defineStore("role", () => {
    const role = ref([]);
    const userStore = useUserStore()

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

    return {
        getRole,
        role,
    }
})