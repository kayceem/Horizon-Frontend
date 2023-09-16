import api from './index';

export async function searchProducts(kwd=null,min_price=null, max_price=null, offset=null, sortby=null, c_id=null, limit=40) {
    try {
        if (kwd == null)
            throw new Error("Invalid search")
        let query=`kwd=${kwd}`
        if (min_price !== null)
            query+=`&min_price=${min_price}`
        if (max_price !== null)
            query+=`&max_price=${max_price}`
        if (sortby !== null)
            query+=`&sortby=${sortby}`
        if (c_id !== null)
            query+=`&c_id=${c_id}`
        if (offset !== null)
            query+=`&skip=${offset}`
        query+=`&limit=${limit}`

        const response = await api.get(`/search?${query}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error fetching products: ', error.message);
        throw error;
    }
}