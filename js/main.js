/**
 * Created by Administrator on 2017/8/31.
 */
window.onload=function(){
    var oAdd=$('add');
    var subBtn=$('subBtn');
    var oBg=sel('.bg');
    var oDataBox=sel('.dataBox');
    var oExit=sel('.exit');
    var oDataContent=sel('.dataContent');
    var oInput=oDataContent.getElementsByTagName('input');
    var arr2=[];

    oAdd.onclick=function(){
        oBg.style.display="block";
        oDataBox.style.display="block";
    };

    oExit.onclick=function(){
        oBg.style.display="none";
        oDataBox.style.display="none";
    };

    subBtn.onclick=function(){

            var oJson={
                id:oInput[0].value,
                title:oInput[1].value,
                number:oInput[2].value,
                price:oInput[3].value,
            };
             console.log(oJson);
            var arr=[];
            arr.push(oJson);
            // oInput[x].value='';
            if(getCookie('data')){
                var oldData=JSON.parse(getCookie('data'));
                if(dataId(oldData)){
                    for(var x=0;x<oldData.length;x++){
                        if(oldData[x].id===arr[0].id){

                        }else{
                            arr2=arr;
                        }
                    }
                }
            }else{
                arr2=arr;
            }
            setCookie('data',JSON.stringify(arr2));
      };

};
