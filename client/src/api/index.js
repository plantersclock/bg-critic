
import axios from 'axios'
const path = require('path'); 
console.log(path.resolve(path.join(__dirname, "../"), 'api'))
require('dotenv').config();
console.log(process.env.NODE_ENV)

let api

if (process.env.NODE_ENV === 'production') {   
    api = axios.create({
        baseURL: path.resolve(path.join(__dirname, "../"), 'api'),
    })
}else{
    api = axios.create({
        baseURL: 'http://localhost:3000/api',
    })
}

export const insertTop10Item = payload => api.post(`/top10`, payload)
export const insertBGGBase = payload => api.post(`/bgg`, payload)
export const insertBGGBaseById = id => api.post(`/bgg/${id}`)
export const getAllTop10Items = () => api.get(`/top10items`)
export const getTop10ItemsByYear = (id) => api.get(`/top10items/${id}`)
export const updateTop10ItemById = (id, payload) => api.put(`/top10/${id}`, payload)
export const deleteTop10ItemById = id => api.delete(`/top10/${id}`)
export const getTop10ItemById = id => api.get(`/top10/${id}`)
export const getBGGBaseById = id => api.get(`/bgg/${id}`)
export const getBGGBases = id => api.get(`/bgg/`)

const apis = {
    insertBGGBase,
    insertBGGBaseById,
    getBGGBaseById,
    getBGGBases,
    insertTop10Item,
    getAllTop10Items,
    updateTop10ItemById,
    deleteTop10ItemById,
    getTop10ItemById,
    getTop10ItemsByYear
}

export default apis