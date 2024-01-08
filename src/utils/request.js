import axios from 'axios'
import myPGP from '@/utils/PGP'
import { getStorage } from '@/utils/stroage'

const mode = import.meta.env.MODE || 'development'

const baseURL = {
	development: 'http://43.229.28.107:8080/api/v1',
	production: 'http://192.168.1.12:8080/api/v1'
}

myPGP.generateKeys().then(() => {
    myPGP.encrypt('hello world').then(encryptedText => {
        myPGP.decrypt(encryptedText).then(decryptedText => {
            console.log(decryptedText);
        })
    })
})

const request = axios.create({
	baseURL: baseURL[mode],
	// baseURL:'/api/v1',
	timeout: 10000
	//   headers: {
	//     'Content-Type': 'application/json',
	//     'Access-Control-Allow-Origin': '*',
	//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	//     'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
	//   },
})

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		const storage = getStorage()
		if (storage && storage.state.isLogin && storage.state.token) {
			config.headers.Authorization = 'Bearer ' + storage.state.token
		}
		return config
	},
	(error) => {
		// Do something with request error
		console.log(error)
		return Promise.reject(error)
	}
)

// 响应拦截器
request.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		console.log(error)
		// return error.response.data
		return Promise.reject(error)
	}
)

export default request
