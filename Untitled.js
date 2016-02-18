var mobileUserChat;

if(typeof tpOnce=="undefined"){
    try {
        var _T$aa="undefined";
        var _T$ba=(typeof tocplusWidth==_T$aa)?300:tocplusWidth;
        var _T$ca=(typeof tocplusHeight==_T$aa)?150:tocplusHeight;
        var _T$da=(typeof tocplusTop==_T$aa)?100:tocplusTop;
        var _T$ea=(typeof tocplusLeft==_T$aa)?300:tocplusLeft;
        var _T$fa=(typeof tocplusFloatingWindow==_T$aa)?true:tocplusFloatingWindow;
        var _T$ga=(typeof tocplusFrameColor==_T$aa)?"orange":tocplusFrameColor;
        var _T$ha=(typeof tocplusBgImage==_T$aa)?"":tocplusBgImage;
        var _T$ia=(typeof tocplusAwayImage==_T$aa)?"":tocplusAwayImage;
        var _T$ja=(typeof tocplusAwayUrl==_T$aa)?"":tocplusAwayUrl;
        var _T$ka=(typeof tocplusLocaleFixed==_T$aa)?"":tocplusLocaleFixed;
        var _T$la=(typeof tocplusUserName==_T$aa)?"":escape(escape(tocplusUserName));
        var _T$ma=(typeof tocplusMinimized==_T$aa)?false:tocplusMinimized;
        var _T$na=(typeof tocplusMinimizedImage==_T$aa)?"http://tocplus.com/img/minimized_en.gif":tocplusMinimizedImage;
        var _T$oa=(typeof tocplusWidget==_T$aa)?"":tocplusWidget;
        var _T$pa=(typeof tocplusChatFrame==_T$aa)?"":tocplusChatFrame;
        var _T$qa=(typeof tocplusButton==_T$aa)?"":tocplusButton;
        var _T$ra=(typeof tocplusUrl==_T$aa)?document.URL:tocplusUrl;
        var _T$sa=document.referrer;
        var _T$ta=appRoot+"/img";
        if(_T$oa!=""||_T$qa){
            try{
                _T$ra=parent.document.URL;
                _T$sa=parent.document.referrer;
            }
            catch(e$){
            }
        }
        var _T$ua=(typeof tocplusHAlign==_T$aa)?"left":tocplusHAlign;
        var _T$va;
        var _T$wa;
        var _T$xa="#FFFFFF";
        var _T$ya="";
        if(_T$ga.indexOf("#")<0){
            _T$ya=_T$ta+"/titlebar_"+_T$ga+".gif";
        }
        var _T$za="1px solid #555555";
        var _T$Aa="#666666";
        function _T$Ba(xb,yb){
            var r=yb/100;
            var zb=(xb>>16)&255;
            var Ab=(xb>>8)&255;
            var Bb=xb&255;
            var Cb=(zb+Ab+Bb)/3;
            var Db=Math.floor(Cb>127?zb*r:255-((255-zb)*r)).toString(16);
            var Eb=Math.floor(Cb>127?Ab*r:255-((255-Ab)*r)).toString(16);
            var Fb=Math.floor(Cb>127?Bb*r:255-((255-Bb)*r)).toString(16);
            Db=Db=="0"?"00":Db;
            Eb=Eb=="0"?"00":Eb;
            Fb=Fb=="0"?"00":Fb;
            return "#"+(Db+Eb+Fb).toUpperCase();
        }
        if(_T$ga=="white"){
            _T$wa="#D7D7E0";
            _T$va="#FBFDFE";
            _T$xa="#7A7A92";
        }
        else if(_T$ga=="blue"){
            _T$wa="#ACB4D8";
            _T$va="#8793C6";
        }
        else if(_T$ga=="green"){
            _T$wa="#C9E285";
            _T$va="#A5CE34";
        }
        else if(_T$ga=="purple"){
            _T$wa="#DFA8EA";
            _T$va="#D17FE0";
        }
        else if(_T$ga=="grey"){
            _T$wa="#8E8E8E";
            _T$va="#676767";
        }
        else if(_T$ga.indexOf("#")==0){
            var tmpSelectedColor=parseInt(_T$ga.substr(1),16);
            _T$wa=_T$ga;
            _T$va=_T$ga;
            _T$xa=_T$Ba(tmpSelectedColor,40);
            _T$za="2px solid "+_T$wa;
            _T$Aa=_T$wa;
        }
        else{
            _T$wa="#FFDA63";
            _T$va="#FFB300";
            _T$ya=_T$ta+"/titlebar_orange.gif";
        }
        _T$xa=_T$Ba(tmpSelectedColor,40);
        var _T$Ca=0;
        function _T$Da(){
            var Gb=0;
            if(document.body&&document.body.offsetWidth){
                Gb=document.body.offsetHeight;
            }
            if(document.compatMode=='CSS1Compat'&&document.documentElement&&document.documentElement.offsetWidth){
                Gb=document.documentElement.offsetHeight;
            }
            if(window.innerWidth&&window.innerHeight){
                Gb=window.innerHeight;
            }
            return Gb;
        }
        function _T$Ea(){
            var Hb=0;
            if(document.body&&document.body.offsetWidth){
                Hb=document.body.offsetWidth;
            }
            if(document.compatMode=='CSS1Compat'&&document.documentElement&&document.documentElement.offsetWidth){
                Hb=document.documentElement.offsetWidth;
            }
            if(window.innerWidth&&window.innerHeight){
                Hb=window.innerWidth;
            }
            return Hb;
        }
        function _T$Fa(Ib){
            var Jb=_T$Ea();
            var Kb=0;
            if("center"==_T$ua){
                Jb=_T$Ca>Jb?_T$Ca:Jb;
                Kb=(Jb-_T$ba-10)/2+Ib;
            }
            else if("right"==_T$ua){
                Kb=_T$Ea()-(Ib+_T$ba+33);
            }
            else{
                Kb=Ib;
            }
            return Kb<0?0:Kb;
        }
        function _T$Ga(Lb){
            var Mb=_T$Ea();
            if("center"==_T$ua){
                Mb=_T$Ca>Mb?_T$Ca:Mb;
                return Lb-(Mb-_T$ba-10)/2;
            }
            if("right"==_T$ua){
                return Mb-(Lb+_T$ba+33);
            }
            return Lb;
        }
        var _T$Ha="";
        var _T$Ia;
        var _T$Ja=true;
        function scrollUpdate(){
            var Nb=document.documentElement.scrollTop;
            var Ob=document.body.scrollTop;
            var Pb=Nb>Ob?Nb:Ob;
            _T$Ia.style.top=(Pb+_T$da)+"px";
            _T$Ia.style.left=_T$Fa(_T$ea)+"px";
        }
        function _T$Ka(){
            if(_T$Ja==true){
                setTimeout("scrollUpdate()",3);
            }
        }
        var _T$La=false;
        var _T$Ma;
        var _T$Na;
        var _T$Oa;
        var _T$Pa;
        var nn6=document.getElementById&&!document.all;
        function _T$Qa(e){
            var ev=nn6?e:event;
            _T$Oa=ev.clientX;
            _T$Pa=ev.clientY;
            _T$Ma=_T$Oa-_T$Fa(_T$ea);
            _T$Na=_T$Pa-_T$da;
            _T$La=true;
            scrollUpdate();
            document.body.focus();
            document.onselectstart=function(){
                return false;
            };
            return false;
        }
        function _T$Ra(){
            _T$La=false;
            scrollUpdate();
        }
        function _T$Sa(e){
            if(_T$La){
                var ev=nn6?e:event;
                _T$ea=_T$Ga(ev.clientX-_T$Ma);
                _T$da=ev.clientY-_T$Na;
                scrollUpdate();
            }
        }
        var _T$Ta;
        var _T$Ua;
        var _T$Va;
        function _T$Wa(Qb,Rb,e){
            Qb(e);
            if(Rb!=null){
                Rb(e);
            }
        }
        var _T$Xa=true;
        function addCommonHandlers(){
            if(_T$Xa){
                _T$Ta=document.onmousemove;

                document.onmousemove=function(e){
                    _T$Wa(_T$Sa,_T$Ta,e);
                };
                _T$Ua=window.onscroll;
                window.onscroll=function(e){
                    _T$Wa(_T$Ka,_T$Ua,e);
                };
                _T$Va=window.onresize;
                window.onresize=function(e){
                    _T$Wa(_T$Ka,_T$Va,e);
                };
                _T$Xa=false;
            }
        }
        var _T$Ya;
        function onTitleOver(Sb){
            if(!a1ad0e){
                _T$Ya.innerHTML=Sb;
                _T$Ya.style.textDecoration="underline";
            }
        }
        function onTitleOut(Tb){
            if(!a1ad0e){
                _T$Ya.innerHTML=Tb;
                _T$Ya.style.textDecoration="none";
            }
        }
        function _T$Za(Ub,Vb,Wb){
            var Xb=new Date();
            Xb.setDate(Xb.getDate()+Wb);
            document.cookie=Ub+"="+escape(Vb)+";path='/'; expires="+Xb.toGMTString()+";"}
            function closeTocplusWindow(){_T$Za("TocplusWindow","invisible",1);
            _T$$a();
        }
        var _T$ab=false;
        var _T$bb;
        var _T$cb;
        var _T$db;
        function expandTocplusWindow(){
            _T$ab=true;
            _T$ca*=1.4;
            _T$ba*=1.4;
            _T$eb();
        }
        function contractTocplusWindow(){
            _T$ca/=1.4;
            _T$ba/=1.4;
            _T$eb();
        }
        var _T$fb;
        function _T$gb(){}
        function _T$hb(){
            _T$La=false;
        }
        function sUp(){
            var Yb=document.body.scrollTop;
            if(Yb==0){
                document.body.scrollTop=1;
                scrollUpdate();
                document.body.scrollTop=Yb;
            }
            else{
                scrollUpdate();
            }
        }
        function _T$ib(Zb,$b){
            var ac=document.getElementById("TpTbw");
            ac.style.cursor=$b;
            ac.onmousedown=_T$Qa;
            ac.onmouseup=Zb;
            ac.ondragstart=_T$Qa;
            ac.ondrag=_T$Sa;
            setTimeout("addCommonHandlers()",900);
            setTimeout("sUp()",3);
        }
        function emptyTocplusWindow(){}
        var _T$jb=12;
        var _T$kb=31;
        function addFrame(bc){if(_T$ba<0){
            _T$ba=_T$Ea()-_T$jb;
        }
        if(_T$ca<0){
            _T$ca=_T$Da()-_T$kb;
        }
        if(_T$ba<0||_T$ca<0){
            setTimeout("addFrame('"+bc+"')",100);
            return;
        }
        if(_T$ba<120){
            _T$ba=120;
        }
        if(_T$ca<80){
            _T$ca=80;
        }
        var cc="width:15px; height:15px; display:inline; vertical-align:middle; border:none; float:none; background:none; ";
        var dc='style="'+cc+'"';
        function _getImgTag(ec){
            return '<a href="javascript:'+ec+'TocplusWindow();
            "><img '+dc+' src="'+_T$ta+'/'+ec+'.gif" ></a>';
        }
        if(TaitL=="Tocplus"){
            TaitLLink=mainServerUrl+'/invitedUser.do?invitorType=title&invitor=';
        }
        else{
            TaitLLink='#';
        }
        _T$Ia.innerHTML='\
        <div style="word-break:normal; float:left; border:'+_T$za+'; '+_T$Ha+'">\
        <div id="TpTbw" style="'+_T$Ha+'border: 1px solid '+_T$wa+'; padding:2px; padding-top:3px; background: url(\''+_T$ya+'\') '+_T$va+' repeat-x top;">\
        <div style="'+_T$Ha+(_T$fa?'position:absolute; left:4; top:5':'float:left')+'"><a id="eTkZp" style="font-size:12px; padding-left: 4px; color: '+_T$xa+'; font-weight: bold; font-family: Arial; text-decoration: none; " href="'+TaitLLink+'" title="'+userId+'" target="_blank">'+TaitL+'</a></div>\
        <div style="'+_T$Ha+'background: url(\''+_T$ta+'/empty.gif\'); text-align:right; padding-right:2px; font-size:12px">'+(_T$fa?(_T$ab?_getImgTag("contract")+' ':'')+_getImgTag("expand")+' '+_getImgTag("close"):_getImgTag("empty"))+'</div>\
        <div id="iVCkq" style="'+_T$Ha+'margin-top: 3px;">\
        </div></div></div>\
        <div id="tocplusExtWindow" style="display: block; position: absolute; z-index: 999999; width: 100%; "></div>';
        _T$bb=document.createElement('iframe');
        _T$bb.style.width=_T$ba+'px';
        _T$bb.style.height=_T$ca+'px';
        _T$bb.src=appRoot+'/'+bc;
        _T$bb.style.border="1px solid "+_T$Aa;
        _T$bb.frameBorder=0;
        _T$lb=document.getElementById("iVCkq");
        _T$lb.appendChild(_T$bb);
        _T$Ya=document.getElementById("eTkZp");
        _T$Ya.onmouseover=function(){
            onTitleOver(TaitL);
        }
        _T$Ya.onmouseout=function(){
            onTitleOut(TaitL);
        }
        if(_T$fa){
            _T$ib(_T$Ra,"move");
            _T$bb.onmouseover=_T$gb;
            _T$bb.onmouseout=_T$hb;
        }
        _T$db=document.createElement('iframe');
        _T$db.src=appRoot+'/userChatAutoComplete.do?userId='+userId+'&url='+escape(_T$ra.substring(0,140));
        _T$db.style.width=_T$ba+100+'px';
        _T$db.style.height=_T$ca+'px';
        _T$db.style.border="1px solid #666666";
        _T$db.frameBorder=0;
        _T$cb=document.getElementById("tocplusExtWindow");
        _T$cb.style.display="none";
        var fc=_T$ca+40;
        _T$cb.style.marginTop=fc+'px';
        _T$cb.appendChild(_T$db);
        if(document.body.offsetWidth<parseInt(_T$Ia.style.left.replace('px',''))+_T$ba+50){
            _T$cb.style.marginLeft=_T$cb.style.marginLeft-90;
        }
        else{
            _T$cb.style.marginLeft=0;
        }
        _T$mb=document.createElement('div');
        _T$mb.id='tocplusExtActionLayer';
        _T$mb.style.width='0';
        _T$mb.style.height='0';
        _T$Ia.appendChild(_T$mb);
    }
    function _T$nb(gc){
        var hc=gc+"=";
        var x=0;
        while(x<=document.cookie.length){
            var y=(x+hc.length);
            if(document.cookie.substring(x,y)==hc){
                if((endOfCookie=document.cookie.indexOf("; ",y))==-1)endOfCookie=document.cookie.length;
                return unescape(document.cookie.substring(y,endOfCookie));
            }
            x=document.cookie.indexOf(" ",x)+1;
            if(x==0)break;
        }
        return "";
    }
    function _T$ob(){
        if(typeof tocplusTid!=_T$aa)return tocplusTid;
        var ic=_T$nb("tid");
        if(!ic){
            ic=new Date().getTime();
            _T$Za("tid",ic,1);
        }
        return ic;
    }
    function _T$pb(){
        var jc='userChat.do?userId='+userId+'&tid='+_T$ob()+'&frameColor='+encodeURIComponent(_T$ga)+'&userName='+_T$la+'&bgImage='+escape(_T$ha)+'&locale='+encodeURIComponent(_T$ka);
        if(_T$oa==""){
            jc+='&url='+escape(_T$ra.substring(0,240))+'&ref='+escape(_T$sa.substring(0,220));
        }
        else{
            jc+='&url='+escape(_T$ra.substring(0,300))+'&ref='+escape(_T$sa.substring(0,300));
        }
        jc+='&dumb='+(new Date().getTime());
        mobileUserChat=jc;
        addFrame(jc);
    }
    function _T$qb(){
        var kc=new Date().getTime()-userCreated;
        kc/=(1000*60*60*24);
        var lc='awayMessage.do?l='+Math.floor(kc)+'&dumb='+(new Date().getTime())+'&locale='+_T$ka;
        if(_T$ia!=''){
            lc+='&awayImage='+_T$ia;
        }
        if(_T$ja!=''&&_T$ja.substr(0,4)=="http"){
            lc+='&awayLink='+_T$ja;
        }
        lc+='&awayMessage='+encodeURI(awayMessage);
        addFrame(lc);
    }
    function _T$rb(){
        addFrame('wrongHost.do');
    }
    function _T$sb(){
        _T$Za("TocplusWindow","visible",1);
        _T$eb();
    }
    function _T$tb(e){
        var ev=nn6?e:event;
        _T$Ra();
        if(_T$Oa==ev.clientX&&_T$Pa==ev.clientY){
            _T$sb();
        }
    }
    function showNoFloatTocplus(){
        _T$sb();
    }
    function _T$$a(){
        var mc='<img src="'+_T$na+'" style="border:none"/>';
        if(!_T$fa){
            mc='<a href="javascript:showNoFloatTocplus();">'+mc+'</a>';
        }
        _T$Ia.innerHTML='<div id="TpTbw" style="'+_T$Ha+'border:none">'+mc+'</div>';
        if(_T$fa){
            _T$ib(_T$tb,"pointer");
        }
    }
    function _T$eb(){
        var nc=_T$nb("TocplusWindow");
        if(nc.length==0&&_T$ma){
            closeTocplusWindow();
            return;
        }
        if(userId.substring(0,4)=='test'){
            _T$pb();
        }
        else if(nc=="invisible"){
            _T$$a();
        }
        else if(wrongHost){
            _T$rb();
        }
        else if(managerAway){
            _T$qb();
        }
        else{
            _T$pb();
        }
    }
    var _T$ub=false;
    function stu(){
        _T$eb();
    }
    var _T$vb='<div id="tocplusWindow" style="'+_T$Ha+' width:100%;"></div>';
    if(_T$oa=="wb"||_T$oa=="appf"){
        _T$ub=true;
        document.write(_T$vb);
        _T$Ia=document.getElementById("tocplusWindow");
        setTimeout("stu()",500);
    }
    function rtdiv(){
        if(_T$ub){
            return;
        }
        _T$ub=true;
        _T$Ca=document.body.scrollWidth;
        if(_T$Ca<0||_T$Ca==document.body.clientWidth){
            _T$Ca=0;
        }
        if(_T$Ca>1500){
            _T$Ca=1500;
        }
        var oc=document.createElement('div');
        if(_T$fa){
            var pc=_T$Da();
            var qc=_T$da+_T$ca+48;
            if(qc>pc){
                _T$da+=pc-qc;
            }
            oc.innerHTML='<div id="tocplusWindow" style="'+_T$Ha+'z-index: 2147483647; position:absolute; top:'+_T$da+'px; left:'+_T$Fa(_T$ea)+'px; '+_T$Ha+'"></div>';
        }
        else{
            oc.innerHTML=_T$vb;
        }
        document.body.appendChild(oc);
        _T$Ia=document.getElementById("tocplusWindow");
        setTimeout("stu()",500);
    }
    function _T$wb(rc){
        var sc=window.onload;
        if(typeof window.onload!='function'){
            window.onload=rc;
        }
        else{
            window.onload=function(){
                rc();
                if(sc){
                    sc();
                }
            }
        }
    }
    _T$wb(rtdiv);
    setTimeout("rtdiv()",3000);
}
catch(e$){}
}
var tpOnce=true;
function showChatAutoCompleteWindow(tc){
    if(tc==0){
        _T$cb.style.display="none";
    }
    else{
        if(tc>7){
            tc=7
        };
        var uc=(26*tc);
        _T$cb.style.display="block";
        _T$db.style.height=uc+"px";
    }
}
function writeMessageInChatAutoCompleteWindow(vc){
    _T$db.contentWindow.postMessage(vc,appRoot);
}
function scrollTocplusWindowPosition(wc){
    _T$Ja=wc;
}
function hideAutoCompleteContent(){
    _T$mb.innerHTML="";
}
function showAutoCompleteContent(xc){
    _T$mb.innerHTML='<div onclick="hideAutoCompleteContent(); " style="z-index:999999; opacity: 0.3; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #333333; ">Hi</div><div id="tocplusAutoCompleteContentLayter" style="font-size: 14px; z-index:9999991; position: fixed; display: block; background-color: #ffffff; top: 10%; left: 50%; margin: 0 0 0 -250px; width: 550px; border: 1px solid rgba(0, 0, 0, 0.3); box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.3); border-radius: 6px; padding: 10px; max-height: 600px; overflow: auto; ">'+xc+'</div>';
}
function checkMobileBrowser(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        return true;
    }
    return false;
}
function openMobilePopup(){
    window.open(appRoot+"/"+mobileUserChat+"&mobile=true","fullscreen=yes, toolbar=no, menubar=no, resizable=no");
    return false;
}
function doActionBetweenChatWindow(e){
    var yc=""+e.data["command"];
    yc=yc;
    var zc=""+e.data["content"];
    zc=zc;
    switch(yc){
        case "showAutoComplete":writeMessageInChatAutoCompleteWindow(zc);
        break;
        case "focusedInChatInput":scrollTocplusWindowPosition(false);
        break;
        case "focusedOutChatInput":scrollTocplusWindowPosition(true);
        break;
        case "showChatAutoCompleteWindow":showChatAutoCompleteWindow(zc);
        break;
        case "showAutoCompleteContent":showAutoCompleteContent(zc);
        break;
        default:
    }
}
if(window.addEventListener){
    window.addEventListener('message',function(e){
        doActionBetweenChatWindow(e);
    });
}
else{
    window.attachEvent('onmessage',function(e){
        doActionBetweenChatWindow(e);
    });
}
