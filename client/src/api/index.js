
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertTop10Item = payload => api.post(`/top10`, payload)
export const getAllTop10Items = () => api.get(`/top10items`)
export const updateTop10ItemById = (id, payload) => api.put(`/top10/${id}`, payload)
export const deleteTop10ItemById = id => api.delete(`/top10/${id}`)
export const getTop10ItemById = id => api.get(`/top10/${id}`)

const apis = {
    insertTop10Item,
    getAllTop10Items,
    updateTop10ItemById,
    deleteTop10ItemById,
    getTop10ItemById,
}

export default apis