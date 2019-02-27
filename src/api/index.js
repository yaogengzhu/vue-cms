import axios from 'axios';

const baseUrl = 'http://localhost:8888/api/private/v1/';
axios.defaults.baseURL = baseUrl;


// 设置拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 获取本地存储的token 
    let token = localStorage.getItem('mytoken');
    // 判断token 是否存在
    if (token) {
        // 设置请求头
        config.headers['Authorization'] = token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});



// 登录验证
export const checkUser = params => {
    return axios.post('login', params).then(res => res.data);
}


// 获取用户信息
export const getUser = params => {
    return axios.get('users', params).then(res => res.data);
}

// 修改用户状态
export const changeState = params => {
    return axios.put(`users/${params.uId}/state/${params.type}`).then(res => res.data);
}

// 添加用户
export const addUser = params => {
    return axios.post('users',params).then(res => res.data);
}

// 根据id查询用户信息
export const queryUserById = params => {
    return axios.get(`users/${params}`).then(res => res.data);
}

// 编辑用户
export const updateUser = params => {
    return axios.put(`users/${params.id}`, params).then(res => res.data);
}

// 删除用户
export const deleteUser = params => {
    return axios.delete(`users/${params}`).then(res => res.data);
}

// 获取角色列表
export const getGrant = () => {
    return axios.get(`roles`).then(res => res.data);
}

// 分配角色列表
export const grantUser = params => {
    return axios.put(`users/${params.id}/role`,{id:params.id,rid:params.rid}).then(res => res.data);
}

// 获取权限列表
export const getRights = params => {
    return axios.get(`rights/${params.type}`).then(res => res.data);
}

// 获取权限列表
export const deleteRoleRight = params => {
    return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data);
}

// 角色授权api
export const roelRight = (roleId, rids) => {
    return axios.post(`roles/${roleId}/rights`, rids).then(res => res.data);
}

// 添加角色api
export const addRole = params => {
    return axios.post(`roles`,params).then(res => res.data);
}

// 删除角色api
export const deleteRoleById = params => {
    return axios.delete(`roles/${params.id}` ).then(res => res.data);
}

// 根据角色ID查询角色api
export const queryRoleById = params => {
    return axios.get(`roles/${params.id}`).then(res => res.data);
}

//编辑提交查询角色api
export const eidRoleById = params => {
    return axios.put(`roles/${params.id}`,{roleName:params.roleName,roleDesc:params.roleDesc}).then(res => res.data);
}

// 获取所有菜单项 
export const getMenu =  () =>{
    return axios.get('menus').then(res =>{ return res.data});
}

// 获取所有商品数目 
export const getGoods = (params) => {
    return axios.get('categories',{params:params}).then(res =>{ return res.data});
}

// 添加分类api
export const addCate = (params) => {
    return axios.post('categories',params).then( res => { return res.data });
}

// 删除分类 api 
export const deleteCate = (params) => {
    return axios.delete(`categories/${params}`).then( res =>{ return res.data}); 
}

//商品列表数据
export const getGoodList = (params) => {
    return axios.get('goods',params).then( res => { return res.data });
}

//删除商品根据id 
export const deleteGoods = (params) => {
    return axios.delete(`goods/${params}`).then( res => { return res.data });
}

// 根据id 查询产品相关信息
export const queryGoodsById =  (params) =>{
    return axios.get(`goods/${params}`).then( res => { return res.data });
}

// 编辑提交商品
export const eidGoods =  (params) =>{
    return axios.put(`goods/${params.id}`,params).then(res =>{ return res.data });
}

// 订单数据列表api
export const getOrderList = (params) =>{
    return axios.get('orders',params).then( res => { return res.data });
}