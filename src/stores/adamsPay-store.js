import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { useProductStore } from './product-store.js'
import { ref } from 'vue'


export const usePayStore = defineStore("product", ()=>{
    const userStore = useUserStore()
    const productStore = useProductStore();
    const url = ref('')
    const createDebt = async()=>{
            try {
                const res = await api.post(
                    "/adamaspay/", 
                    { 
                        id: productStore.products.id,
                        amountValue: productStore.products.price,
                        label: productStore.products.description,
                    }, // Segunda posición: el cuerpo de la solicitud (data)
                    {
                        headers: {
                            Authorization: 'Bearer ' + userStore.token
                        }
                    } // Tercera posición: opciones adicionales como headers
                );
            url.value = res.data.url
        } catch (error) {
            console.log(error)
        }
    }
    return {
        createDebt
    }
})