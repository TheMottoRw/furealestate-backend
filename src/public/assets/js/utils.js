const baseUrl = "http://localhost:3000";

function getUrlParams(){
    return document.URL.split("/");
}

function disablePreviousDate(textBoxId){
    document.querySelector(textBoxId).setAttribute("min",new Date().toISOString().substring(0,10));
}
function redirectBack(route){
    setTimeout(()=>window.location=`${baseUrl}${route}`,3000)
}
function addDaysOnDate(strDate,days){
    return new Date(new Date(strDate).getTime()+ (days * 24 * 3600 * 1000)).toISOString().substring(0,10);
}
