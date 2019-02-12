
var siteAdd="http://shiping.l.100help.net/";
var apiurl="http://shiping.l.100help.net/index.php/App";


function getAjax(url,params,cb){
  api.ajax({
       url: apiurl+url,
       method: 'get',
       dataType: 'json',
       data: {
           body:params
       }
   },function(ret, err){
     if (ret) {
       var res=JSON.parse(JSON.stringify(ret));
       return typeof cb == "function" && cb(res);
        //return JSON.parse(JSON.stringify(ret));
     } else {
        //return JSON.parse(JSON.stringify(err));
        return typeof cb == "function" && cb(false)
         //alert( JSON.stringify( err ) );
     }
   });
}


function fnReady() {
    fnReadyKeyback();
    fnReadyOpenWin();
    fnReadyHeader();
    //fnReadyNav();
    fnReadyFooter();
};
function fnReadyKeyback() {
    var keybacks = $api.domAll('.event-back');
    for (var i = 0; i < keybacks.length; i++) {
        $api.attr(keybacks[i], 'tapmode', 'highlight');
        keybacks[i].onclick = function() {
            api.closeWin();
        };
    }

    api.parseTapmode();
};
function fnReadyOpenWin() {
    var buttons = $api.domAll('.open-win');
    for (var i = 0; i < buttons.length; i++) {
        $api.attr(buttons[i], 'tapmode', 'highlight');
        buttons[i].onclick = function() {
            var target = $api.closest(event.target, '.open-win');
            var winName = $api.attr(target, 'win'),
                isNeedLogin = $api.attr(target, 'login'),
                param = $api.attr(target, 'param');

            if (isNeedLogin && !$api.getStorage('accessToken')) {
                winName = 'login';
            }

            if (param) {
                param = JSON.parse(param);
            }

            api.openWin({
                name: winName.replace('html/', ''),
                url: './' + winName + '.html',
                pageParam: param
            });
        };
    }
    api.parseTapmode();
}

var header, headerHeight = 0;

function fnReadyHeader() {
    header = $api.byId('header');
    if (header) {
        $api.fixIos7Bar(header);
        headerHeight = $api.offset(header).h;
        $api.setStorage('headerHeight',headerHeight);

    }
};

//var nav, navHeight = 0;

//function fnReadyNav() {
    //nav = $api.byId('nav');
    //if (nav) {
    //    navHeight = $api.offset(nav).h;
    //}
//};

var footer, footerHeight = 0;

function fnReadyFooter() {
    footer = $api.byId('footer');
    if (footer) {
        footerHeight = $api.offset(footer).h;
    }
};

function fnReadyFrame() {
    var frameName = api.winName + '_frame';
    api.openFrame({
        name: frameName,
        url: './' + frameName + '.html',
        bounces: true,
        bgColor: '#f0f0f0',
        rect: {
            x: 0,
            y: headerHeight,
            w: 'auto',
            h: api.winHeight - headerHeight - footerHeight
        },
        pageParam: api.pageParam
    });
};

//获取封装api.toast
function mytoast(msg, str_area) {
     api.toast({
         msg: msg,
         duration: 2000,
         location: str_area
     });
}

//关闭当前窗口
  /**返回**/
function goback() {
         api.closeWin({});
}

//验证手机号
function checkTel(tel) {
    var r = /^13[0-9]{9}|15[012356789][0-9]{8}|17[0123456789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}$/;
    if (!r.test(tel)) {
       return false;
    } else {
        return true;
    }
}

//判断是否为正整数
function isPositiveInteger(s){//是否为正整数
     var re = /^[0-9]+$/ ;
     return re.test(s)
 }
//判断是否为数字  包含小数
function isNumber(num) {
　　if (parseFloat(num).toString() == "NaN") {
　　　　return false;
　　} else {
　　　　return true;
　　}
}
//判断是否为空
function isNull(str) {
    if (str == null || str == "" || str == undefined || str == "null") {
        return true;
    } else {
        return false;
    }
};
//回到主界面
function backHomeWin() {
    //这个是回到主界面不会回到userwin
    api.closeToWin({
        name: 'root'
    });
}
