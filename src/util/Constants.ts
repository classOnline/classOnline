
const baseUrl = "/";
export const baseImgUrl = "http://10.209.8.116:3000/";//可以跨域
const baseClassUrl = baseUrl + "class/";
const baseUserUrl = baseUrl + "users/";
const baseBbsUrl = baseUrl + "bbs/";
export const URL_path = {
    class: {
        getAllClassList: baseClassUrl + "getAllClassList/",
        getClassStruct: baseClassUrl + "getClassNewStruct/",
        getChapterDetail:baseClassUrl + "getChapterDetail",
        getVideoDetails: baseClassUrl + "getVideoDetails/",
        searchVideos:baseClassUrl+"searchVideos/",
        commentToVideo:baseClassUrl+"commentToVideo",


        submitNote:baseBbsUrl+"submitNote/",
        commentToNote:baseBbsUrl+"commentToNote/",
        insertSubject:baseBbsUrl+"insertSubject/",
        searchSubjects:baseBbsUrl+"searchSubjects/",
        getNoteDetail:baseBbsUrl+"getNoteDetail/",
        searchNoteList:baseBbsUrl+"searchNoteList/",
        messageBox:baseBbsUrl+"messageBox/",
        getMessageBox:baseBbsUrl+"getMessageBox/"
  
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
export const Conf = {
    maxFileSize: 104587600,
    allowedMimeType:['image/jpeg','image/png','application/msword',
        'application/vnd.ms-excel','application/vnd.ms-powerpoint',
        'audio/x-mpeg','video/mp4','audio/mpeg','audio/mp3',
        'application/x-shockwave-flash','video/x-ms-asf',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ],
}
