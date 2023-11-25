import axios from 'axios'

export const fetchAllProducts = () =>
    axios
        .get(
            `https://course-api.com/react-store-products`
        )
        .then((res) => res.data)



        
export const fetchSingleProduct = (id:string) =>
    axios
        .get(
            `https://course-api.com/react-store-single-product?id=${id}`
        )
        .then((res) => res.data)