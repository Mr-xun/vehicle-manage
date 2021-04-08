import request from "./http";
const ORIGIN_PATH = "/api"; //远端
let _CURRENT_PATH_ = (function() {
    //选择接口
    let currentHost = window.location.host;
    switch (currentHost) {
        case "39.106.109.80:8080":
            return ORIGIN_PATH;
        default:
            return ORIGIN_PATH;
    }
})();
export default {
    getVerifyCaptch(){
        //获取登录验证码
        return request.get(_CURRENT_PATH_ + "/car/res/user/verify/login");
    },
    userLogin(params){
        //用户登录
        return request.post(_CURRENT_PATH_ + "/car/user/login",params);
    },
    getUserList(params){
        //用户管理-用户列表
        return request.post(_CURRENT_PATH_ + "/car/user/page/list",params);
    },
    addUser(params){
        //用户管理-新增用户
        return request.post(_CURRENT_PATH_ + "/car/user/register",params);
    },
    updateUser(params){
        //用户管理-修改用户
        return request.post(_CURRENT_PATH_ + "/car/user/modify",params);
    },
    deleteUser(params){
        //用户管理-删除用户
        return request.post(_CURRENT_PATH_ + "/car/user/delete",params);
    },
    
    getDynamicWaterInfo() {
        //获取动态水质信息
        return request.get(_CURRENT_PATH_ + "/water/getDynamicWaterInfo");
    },
    getWaterHisTableData(params) {
        //获取动态水质历史数据
        return request.post(_CURRENT_PATH_ + "/water/getWaterInfos", params);
    },
    delWaterRecord(params) {
        //获坏点剔除
        return request.post(_CURRENT_PATH_ + "/water/delWaterInfo", params);
    },
    updateWaterAvg(params) {
        //三水波纹, 用于修改改时间点的数据为前后的平均值
        return request.post(_CURRENT_PATH_ + "/water/updateWaterInfo", params);
    },
    getWaterHisEchartData(params) {
        //获取动态水质历史数据Echart
        return request.post(
            _CURRENT_PATH_ + "/water/getWaterInfosChart",
            params
        );
    },
    getWaterCompareResult(params) {
        //获取动态水质两个时刻的数据对比
        return request.post(_CURRENT_PATH_ + "/water/compareWaterInfo", params);
    },
    getWaterAlarmRecord(params) {
        //获取获取报警信息记录
        return request.post(
            _CURRENT_PATH_ + "/water/getAlertWaterInfos",
            params
        );
    },
    getWaterAlarmRecordEchart(params) {
        //获取获取报警信息记录图表
        return request.post(
            _CURRENT_PATH_ + "/water/getAlertWaterInfosChart",
            params
        );
    },
    getWaterAlarmInfo() {
        //获取获取预警值
        return request.get(_CURRENT_PATH_ + "/water/getAlertInfo");
    },
    updateAlarmValue(params) {
        //更新预警值
        return request.post(_CURRENT_PATH_ + "/water/updateAlertPoint", params);
    },
    getWaterEveryValue(params) {
        //统计的显示（最小最、大值，平均值)
        return request.post(
            _CURRENT_PATH_ + "/water/getSpecifiedWaterInfo",
            params
        );
    }
};
