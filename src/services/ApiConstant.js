import {Platform} from 'react-native'
//let baseUrl = Platform.OS === 'ios' ? "http://192.168.200.129:3000" : "http://10.0.2.2:3000"

module.exports={
    baseUrl:"http://192.168.200.34:3000",
    //baseUrl:'http://localhost:3300/',
    //baseUrl:'http://eeebef04.ngrok.io',
    changePassword: '/user/changePassword',
    login:'/user/userLogin',
    timeTable:'/timeTable/teacherSchedule/schedule',
    todayAttendance:'/attendance/',
    dateWiseAttendance:'/attendance/date/',
    classNotes:'/notes/teacher',
    complain:'/complain/',
    complainParent:'/complain/parent',
    studyMaterial:'/studyMaterial',
    studyMaterialSubject:'/studyMaterial/teacher/materials/',
    parentStudentAttendanceNotes: '/notes/student/',
    community: '/community/',
    studentTimeTable: '/timeTable/student/timeTable/schedule',
    studyMaterialStudent:'/studyMaterial/student/lectures',
    studyMaterialStudentSubject:'/studyMaterial/student/materials/',
    studyMaterialRemove:'/studyMaterial/Media/'
};
