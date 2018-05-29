
const baseUrl = "/";
export const baseImgUrl = "http://10.209.8.116:3000/";//可以跨域
const baseClassUrl = baseUrl + "class/";
const baseUserUrl = baseUrl + "users/";
export const URL_path = {
    class: {
        getAllClassList: baseClassUrl + "getAllClassList/",
        getClassStruct: baseClassUrl + "getClassStruct/",
        getVideoDetails: baseClassUrl + "getVideoDetails/",
        searchVideos:baseClassUrl+"searchVideos/",
        commentToVideo:baseClassUrl+"commentToVideo",
    },
    user: {
        login: baseUserUrl + "login/",
        register: baseUserUrl + "register/",
    }

};
export const jsonHeader = {"Content-Type":"application/json",
'Accept': '*/*'  }
export const regUtils = {


    passwordReg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    phone: /^1\d{10}$/,
    regEn: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]\s+\r+\n+]/im,
    regCn: /[·！#￥（——）：；“”‘、，|《。》？、【】[\]\s+\r+\n+]/im,

}
