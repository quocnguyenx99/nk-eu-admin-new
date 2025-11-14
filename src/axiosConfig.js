import axios from 'axios'

const axiosClient = axios.create({
  // baseURL: 'http://192.168.245.174:8020/api/',
  baseURL: 'https://eu-api.vitinhnguyenkim.vn/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('adminNKEU')
      ? `Bearer ${localStorage.getItem('adminNKEU')}`
      : '',
  },
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminNKEU')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Configuration for images
// const mainBaseUrl = 'http://192.168.245.174:8020/uploads/'
const imageBaseUrl = 'https://media.vitinhnguyenkim.com.vn/uploads/'
const mainUrl = 'https://eu.vitinhnguyenkim.vn/'

export { axiosClient, imageBaseUrl, mainUrl }
