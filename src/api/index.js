import request from "./http";
// const ORIGIN_PATH = "/api"; //远端
// let _CURRENT_PATH_ = (function () {
//     //选择接口
//     let currentHost = window.location.host;
//     switch (currentHost) {
//         case "39.106.109.80:8080":
//             return ORIGIN_PATH;
//         default:
//             return ORIGIN_PATH;
//     }
// })();
export default {
    getVerifyCaptch() {
        //获取登录验证码
        return request.get("/car/res/user/verify/login");
    },
    userLogin(params) {
        //用户登录
        return request.post("/car/user/login", params);
    },
    userLogout(params) {
        //用户退出
        return request.get("/car/user/logout");
    },
    getUserList(params) {
        //用户管理-用户列表
        return request.post("/car/user/page/list", params);
    },
    addUser(params) {
        //用户管理-新增用户
        return request.post("/car/user/register", params);
    },
    updateUser(params) {
        //用户管理-修改用户
        return request.post("/car/user/modify", params);
    },
    deleteUser(params) {
        //用户管理-删除用户
        return request.post("/car/user/delete", params);
    },
    getBicycleList(params) {
        //车辆管理-车辆列表
        return request.post("/car/machine/list/get", params);
    },
    addBicycle(params) {
        //车辆管理-新增车辆
        return request.post("/car/machine/create", params);
    },
    updateBicycle(params) {
        //车辆管理-修改车辆
        return request.post("/car/machine/modify", params);
    },
    deleteBicycle(params) {
        //车辆管理-删除车辆
        return request.post("/car/machine/delete", params);
    },
    getStudentList(params) {
        //车主管理-车主列表
        return request.post("/car/student/page/list", params);
    },
    addStudent(params) {
        //车主管理-新增车主
        return request.post("/car/student/create", params);
    },
    updateStudent(params) {
        //车主管理-修改车主
        return request.post("/car/student/modify", params);
    },
    deleteStudent(params) {
        //车主管理-删除车主
        return request.post("/car/student/delete", params);
    },
};
