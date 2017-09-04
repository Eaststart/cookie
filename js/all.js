/**
 * Created by Administrator on 2017/8/31.
 */
function $(id){
    return document.getElementById(id);
}

function sel(oAtrr){
    return document.querySelector(oAtrr);
}

function sels(oAtrr){
    return document.querySelectorAll(oAtrr);
}

function dataId(oldValue,target){
    for(var x=0;x<oldValue;x++){
        if(oldValue[x].id===target.id){
            return true;
        }
    }
    return false;
}

function getStyle(oElement,attr){
    if(getComputedStyle){
        return getComputedStyle(oElement,'')[attr];
    }else{
        return oElement.currentStyle[attr];
    }
}
