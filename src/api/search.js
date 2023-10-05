import api from './index';

export async function searchProducts(kwd=null,min_price=null, max_price=null, offset=null, sortby=null, c_id=null, condition=null, limit=40) {
    try {
        if (kwd == null)
            throw new Error("Invalid search")
        let query=`kwd=${kwd}`
        if (min_price !== null && min_price !=='')
            query+=`&min_price=${min_price}`
        if (max_price !== null && max_price !=='')
            query+=`&max_price=${max_price}`
        if (sortby !== null && sortby !=='')
            query+=`&sortby=${sortby}`
        if (c_id !== null && c_id !=='')
            query+=`&c_id=${c_id}`
        if (offset !== null)
            query+=`&skip=${offset}`
        if (condition !== null)
            query+=`&condition=${condition}`
        query+=`&limit=${limit}`

        const response = await api.get(`/search?${query}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}