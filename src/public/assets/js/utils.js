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
function readCookieRenderSidebar(req){
    console.log(req.header("cookie"));
    const cookieArr = req.header("cookie").split(";");
    let cookieValue = "",sidebar="";
    for(let i=0;i<cookieArr.length;i++){
        let cookieSplit = cookieArr[0].split("=");
        if(cookieSplit[0]==="user_type"){
            cookieValue = cookieSplit[1];
            break;
        }
    }
    switch (cookieValue.toLowerCase()){
        case "admin":
            sidebar = "includes/admin-sidebar.html";break;
        case "landlord":
            sidebar = "includes/landlord-sidebar.html";break;
        case "client":
            sidebar = "includes/client-sidebar.html";break;
        default:
            sidebar = "includes/client-sidebar.html";break;
    }
    return sidebar;
}
function logout(){
}
export default {
    readCookieRenderSidebar,
    logout
}