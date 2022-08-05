import axios from './axios'
//获取menu
export const getMenu=(param)=>{
    return axios.request({
        url: '/permission/getMenu',
        method: 'POST',
        data:param
    })
}

export const getData=()=>{
    return axios.request({
        url:'/home/getDAta',
        method: 'get',
    })
}

export const getUser=(params)=>{
    return axios.request({
        url:'/user/getUser',
        method: 'get',
        params
    })
}
