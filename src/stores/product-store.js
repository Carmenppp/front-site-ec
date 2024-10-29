import { defineStore } from 'pinia'
import { api } from "../axios/axios.js"
import { useUserStore } from './user-store.js'
import { ref } from 'vue'

export const useProductStore = defineStore("product", ()=>{
    const products  = ref([]);
    const userStore = useUserStore()
    const createProd = async(data)=>{
            try {
                 await api.post(
                    "/products/",
                    { 
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        stock: data.stock,
                        imageUrl: data.imageUrl,
                        idCategory: data.idCategory,
                        brandId: data.brandId
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

    const getProd = async()=>{
        try {
            const res = await api.get(
                "/products/", 
                {
                    headers: {
                        Authorization: 'Bearer ' + userStore.token
                    }
                } 
            );
        products.value = res.data.products.map(item => item)
    } catch (error) {
        console.log(error)
    }
}

const getProdById = async (id) =>{
    try {
       const res = await api.get(
            `/products/${id}`, 
            {
                headers: {
                    Authorization: 'Bearer ' + userStore.token
                }
            } 
        );
        products.value = res.data.product
} catch (error) {
    console.log(error)
}
}

const editProd = async (id, data) =>{
    try {
        await api.patch(
            `/products/${id}`, 
            { 
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                imageUrl: data.imageUrl,
                idCategory: data.idCategory,
                brandId: data.brandId
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

const deleteProd = async (id) =>{
    try {
        await api.delete(
            `/products/${id}`, 
            {
                headers: {
                    Authorization: 'Bearer ' + userStore.token
                }
            } 
        );
        // products.value = products.value.filter(item => item.id !== id)
} catch (error) {
    console.log(error)
}
}

    return {
        createProd,
        getProd,
        products,
        editProd,
        deleteProd,
        getProdById
    }
})