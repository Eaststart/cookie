/**
 * Created by Administrator on 2017/8/31.
 */
function setCookie(key,value,expries){

    if(arguments.length<2){
        return '参数错误'
    }else{
        var str=key+'='+value;

        if(expries){
            var d=new Date();
            d.setTime(parseInt(expries)+d.getTime());
            str+=';expries'+d;
        }
        document.cookie=str;
    }
}


function getCookie(key){
    var arr=document.cookie.split('; ');
    for(var x=0;x<arr.length;x++){
        var arrM=arr[x].split('=');
        if(arrM[0]===key){
            return arrM[1];
        }else{
            return null;
        }
    }
}