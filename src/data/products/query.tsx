import axios from 'axios'

export const fetchAllProducts = () =>
    axios
        .get(
            `https://course-api.com/react-store-products`
        )
        .then((res) => res.data)