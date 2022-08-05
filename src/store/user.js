import cookie from 'js-cookie'
export default {
    state:{
        token:''
    },
    mutations:{
        //添加cookie
        setToken(state,val){
            state.token = val
            cookie.set("token",val)
        },
    //    清除cookie
        clearToken(state){
            state.token = ''
            cookie.remove("token")
        },
    //    获取cookie
        getToken(state){
            state.token = cookie.get("token")||state.token
        }
    }
}
