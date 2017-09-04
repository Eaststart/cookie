
window.onload=function(){
    // oSignInput[0] 用户名
    // oSignInput[1] 电话号码
    // oSignInput[2] 密码
    // oSignInput[3] 确认密码
    var flag=true;
    var arr2=[],arr1=[];
    var oTabs=sel('.tabs');
    var oInput=sels('.input_box');
    var oA=oTabs.getElementsByTagName('a');
    var oSignForm=$('signInForm');
    var oLoginForm=$('loginForm');
    var oSignInput=oSignForm.getElementsByTagName('input');
    var oLoginInput=oLoginForm.getElementsByTagName('input');
    var oSignBtn=$('signIn');
    var oLoginBtn=$('login');
    var oRemovePro=sels('.removePro');
    var oJump=$('jump');
    var oShade=$('shade');
    var oJumpTime=oJump.getElementsByTagName('span')[0];
    var oJumpStrong=oJump.getElementsByTagName('strong')[0];

    var promptArr=[
        {p:'p1',content1:'请填写用户名',content2:'该用户不存在'},
        {p:'p2',content1:'请填写密码',content2:'密码错误'},
        {p:'p3',content1:'用户名不能为空',content2:'请输入6-16位正确用户名',content3:'该用户名已存在'},
        {p:'p4',content1:'电话号码不能为空',content2:'请输入正确的号码',content3:'该手机号已被注册'},
        {p:'p5',content1:'密码不能为空',content2:'请输入正确的密码'},
        {p:'p6',content1:'重复密码不能为空',content2:'重复密码错误'}
    ];
    // 初始化注册数据
    removeValue(oLoginInput,oSignInput);
    oJumpStrong.onclick=function(){
        location.href='login.html';
    };
    // tab菜单
    for(var x=0;x<oA.length;x++){
        oA[x].index=x;
        oInput[x].index=x;
        oA[x].onclick=function(){
            for(var y=0;y<oA.length;y++){
                oA[y].className='';
                oInput[y].style.display='none';
            }
            oA[this.index].className='active';
            oInput[this.index].style.display='block';
        }
    }
    // 登陆事件
    oLoginBtn.onclick=function(){
        for(var h=0;h<oLoginInput.length;h++){
            fnLogin(oLoginInput[h]);
            arr1=[];
            arr2=[];
        }
        removeValue(oSignInput);
    };
    // 登录回车
    for(var x=0;x<oLoginInput.length;x++){
        oLoginInput[x].index=x;
        oLoginInput[x].onkeyup=function(event){
            var event=event || window.event;
            if(event.keyCode===13){
                flag= oA[0].className==='active' ? true : false;
                if(flag){
                    fnLogin(oLoginInput[this.index]);
                    arr1=[];
                    arr2=[];
                    removeValue(oSignInput);
                }
            }
        }
    }
    //注册事件
    oSignBtn.onclick=function(){
        for(var x=0;x<oSignInput.length;x++){
            fnSign(oSignInput[x]);
            insertData();
            arr1=[];
            arr2=[];
        }
        removeValue(oLoginInput);
    };
    // 注册回车事件
    for(var u=0;u<oSignInput.length;u++){
        oSignInput[u].index=u;
        oSignInput[u].onkeyup=function(event){
            var event=event || window.event;
            if(event.keyCode===13){
                flag= oA[0].className==='active' ? true : false;

                if(flag===false){
                    console.log(oSignInput[this.index]);
                    fnSign(oSignInput[this.index]);
                    insertData();
                    arr1=[];
                    arr2=[];
                    removeValue(oLoginInput);
                }
            }
        }
    }
    // 登陆
    function fnLogin(oElement){
        oneChild(oElement);
        for(var x=0;x<oLoginInput.length;x++){
            if(oLoginInput[x].value===''){
                createOspan(oLoginInput[x],promptArr[x].content1);
            }else{
                oneChild(oElement);
            }
        }
        if(oElement===oLoginInput[0] && !checkUsername(getCookie('user'),oLoginInput[0])){
            createOspan(oElement,promptArr[0].content2);
        }
        if(oElement===oLoginInput[1] && !checkPwd(getCookie('user'),oLoginInput[1])){
            createOspan(oElement,promptArr[1].content2);
        }
        twoChild(oElement);
        if(checkValue(oLoginInput)){
            location.href='index.html';
        }
    }
    // 注册
    function fnSign(oElement){
        oneChild(oElement);
        for(var x=0;x<oSignInput.length;x++){
            if(oSignInput[x].value===''){
                createOspan(oSignInput[x],promptArr[x+2].content1);
            }else{
                oneChild(oElement);
            }
        }
        if(oElement===oSignInput[0] && !(/^[a-zA-Z_]\w{5,15}$/).test(oElement.value)){
            createOspan(oElement,promptArr[2].content2);
        }
        if(oElement===oSignInput[1] && !(/^1\d{10}$/).test(oElement.value)){
            createOspan(oElement,promptArr[3].content2);
        }
        if(oElement===oSignInput[2] && !(/^\w{6,26}$/).test(oElement.value)){
            createOspan(oElement,promptArr[4].content2);
        }
        if(oElement===oSignInput[3] && !(oSignInput[2].value===oSignInput[3].value)){
            createOspan(oElement,promptArr[5].content2);
        }
        twoChild(oElement);
        if(checkValue(oSignInput)){
            for(var y=0;y<oSignInput.length;y++){
                if(oSignInput[y]!==oSignInput[2]){
                    var oInputArr=oSignInput[y].value;
                    arr1.push(oInputArr);
                }
            }
        }
        if(arr1.length>=3){
            var oInputJson={
                username:arr1[0],
                tel:arr1[1],
                pwd:arr1[2]
            };
            arr2.push(oInputJson);
        }
    }
    // 插入数据
    function insertData(){
        if(getCookie('user')!==null){
            if(checkUsername(getCookie('user'),oSignInput[0])){
                oneChild(oSignInput[0]);
                createOspan(oSignInput[0],promptArr[2].content3);
                twoChild(oSignInput[0]);
            }
            if(checkTel(getCookie('user'),oSignInput[1])){
                oneChild(oSignInput[1]);
                createOspan(oSignInput[1],promptArr[3].content3);
                twoChild(oSignInput[1]);
            }
            if(checkValue(oSignInput)){
                var arr3=[];
                arr1=JSON.parse(getCookie('user'));
                arr3=arr1.concat(arr2);
                setCookie('user',JSON.stringify(arr3));
                console.log(getCookie('user'));
                fnSkip();
            }
        }else{
            if(checkValue(oSignInput)){
                setCookie('user',JSON.stringify(arr2));
                fnSkip();
            }
        }
    }
    // 跳转
    function fnSkip(){
        var i=3;
        oJumpTime.innerHTML=i;
        clearInterval(timer);
        oShade.style.display="block";
        oJump.style.display="block";
        var timer=setInterval(function(){
            i--;
            oJumpTime.innerHTML=i+'';
            if(i<=0){
                clearInterval(timer);
                location.href='login.html';
            }
        },1000);
    }
    function checkData(arrCookie,newData,prompt){
        var arr=JOSN.parse(arrCookie);
        if(arr===null){
            
        }
    }
    // 匹配密码
    function checkPwd(arrCookie,newData){
        var arr=JSON.parse(arrCookie);
        if(arr===null){
            createOspan(oLoginInput[1],promptArr[1].content2);
            twoChild(oLoginInput[1]);
        }else{
            for(var x=0;x<arr.length;x++){
                if(newData.value===arr[x].pwd){
                    return true;
                }
            }
            return false;
        }
    }
    // 判断数据重复
    function checkUsername(arrCookie,newData){
        var arr=JSON.parse(arrCookie);
        if(arr===null){
            createOspan(oLoginInput[0],promptArr[0].content2);
            twoChild(oLoginInput[0]);
        }else{
            for(var x=0;x<arr.length;x++){
                if(newData.value===arr[x].username){
                    return true;
                }
            }
            return false;
        }
    }
    // 手机号查重
    function checkTel(arrCookie,newData){
        var arr=JSON.parse(arrCookie);
        for(var x=0;x<arr.length;x++){
            if(newData.value===arr[x].tel){
                return true;
            }
        }
        return false;
    }
    // 四个input全不为空时判断
    function checkValue(){
        var num1=0,num2=0;
        for(var x=0;x<arguments.length;x++){
            if(arguments[x]===oSignInput){
                for(var y=0;y<oSignInput.length;y++){
                    if(oSignInput[y].parentNode.childNodes.length===1 && oSignInput[y].value!==''){
                        num1++;
                    }
                }
                if(num1==oSignInput.length){
                    return true;
                }
                return false;
            }
            if(arguments[x]===oLoginInput){
                for(var d=0;d<oLoginInput.length;d++){
                    if(oLoginInput[d].parentNode.childNodes.length===1 && oLoginInput[d].value!==''){
                        num2++;
                    }
                }
                if(num2==oLoginInput.length){
                    return true;
                }
                return false;
            }
        }
    }
    // 点击移除提示
    for(var k=0;k<oRemovePro.length;k++){
        oRemovePro[k].index=k;
        oRemovePro[k].onclick=function(){
            if(oRemovePro[this.index].childNodes.length>=2){
                oRemovePro[this.index].removeChild(oRemovePro[this.index].lastChild);
            }
        }
    }
    // signIn onfocus 移除提示
    for(var h=0;h<oSignInput.length;h++){
        oSignInput[h].index=h;
        oSignInput[h].onfocus=function(){
            if(oSignInput[this.index].parentNode.childNodes.length>=2){
                oSignInput[this.index].parentNode.removeChild(oSignInput[this.index].nextSibling);
            }
        }
    }
    // login onfocus 移除提示
    for(var h=0;h<oLoginInput.length;h++){
        oLoginInput[h].index=h;
        oLoginInput[h].onfocus=function(){
            if(oLoginInput[this.index].parentNode.childNodes.length>=2){
                oLoginInput[this.index].parentNode.removeChild(oLoginInput[this.index].nextSibling);
            }
        }
    }

    //节点控制函数 两个
    function twoChild(oSpan){
        var oSpanNew=oSpan.parentNode;
        console.log(oSpanNew);
        if(oSpanNew.childNodes.length>2){
            oSpanNew.removeChild(oSpanNew.lastChild);
        }
    }

    // 回车 节点控制函数 一个
    function oneChild(oElement){
        if(oElement.parentNode.childNodes.length>1){
            oElement.parentNode.removeChild(oElement.parentNode.lastChild);
        }
    }
    //创建节点
    function createOspan(oParent,content){
        var oSpan=document.createElement('span');
        oSpan.innerHTML=content;
        oParent.parentNode.appendChild(oSpan);
        twoChild(oSpan);
    }
    // 初始化注册数据
    function removeValue(){
        for(j=0;j<arguments.length;j++){
            if(arguments[j]===oLoginInput){
                for(var t=0;t<oLoginInput.length;t++){
                    oLoginInput[t].value='';
                }
            }
            if(arguments[j]===oSignInput){
                for(var x=0;x<oSignInput.length;x++){
                    oSignInput[x].value='';
                }
            }
        }
    }

};
