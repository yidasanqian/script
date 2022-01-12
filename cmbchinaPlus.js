/*
招商银行信用卡微信公众号：“领积分 - 🎁签到领积分Plus” 获取 Cookie

    *************************
    【Loon 2.1+ 脚本配置】
    *************************
    [Script]
    cron "30 8 * * *" script-path=https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/check_in/weibo/weibotalk.js, tag=招商银行信用卡签到
    http-request https:\/\/weclub\.xyk\.cmbchina\.com/SCRMCustomActivityFront/checkin-plus/request/get-home-data\.json\?activityCode=checkinPlus script-path=https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/check_in/weibo/weibotalk.cookie.js, tag=招商银行信用卡签到cookie获取
 
    *************************
    【 QX 1.0.10+ 脚本配置 】 
    *************************
    [task_local]
    30 8 * * * cmbchinaPlus.js,tag=招商银行信用卡签到

    [rewrite_local]
    https://weclub\.xyk\.cmbchina\.com/SCRMCustomActivityFront/checkin-plus/request/get-home-data\.json\?activityCode=checkinPlus url script-request-header cmbchinaPlus.js
    
    [MITM]
    hostname = weclub.xyk.cmbchina.com
*/

const checkinURL = 'https://weclub.xyk.cmbchina.com/SCRMCustomActivityFront/checkin-plus/request/checkin.json';
const cookieKey = 'cmbchinaPlus_cookieKey';
const userAgentKey = 'cmbchinaPlus_userAgentKey';

let isGetCookie = typeof $request !== 'undefined';

if (isGetCookie) {
    // 获取 Cookie
    if ($request.headers['Cookie']) {
        var cookie = $request.headers['Cookie'];
        var userAgent = $request.headers['User-Agent'];
        $prefs.setValueForKey(cookie, cookieKey);
        $prefs.setValueForKey(userAgent, userAgentKey);
        $notify("成功获取招商银行信用卡 cookie 🎉", "", "请禁用该脚本")
    }
    $done({});
} else {
    // 签到
    var request = {
        url: checkinURL,
        method: 'POST',
        headers: {
            'Cookie': $prefs.valueForKey(cookieKey),
            'User-Agent': $prefs.valueForKey(userAgentKey),
            'Content-type' : 'application/json;charset=utf-8'
        },
        body: JSON.stringify({'activityCode' : 'checkinPlus'})
    };

    $task.fetch(request).then(response => {
        const result = JSON.parse(response.body);
        if (result.respCode == 1000) {
            $notify("招商银行信用卡", "", "签到成功，获得 " + result.data.awardValue + " 积分🎁");
        } else if (result.respCode == 1452) {
            $notify("招商银行信用卡", "", "签到失败，请获取 cookie");
        } else if (result.respCode == 'custom_8500') {
            $notify("招商银行信用卡", "", "签到失败，" + result.respMsg);
        } else {
            $notify("招商银行信用卡", "", "签到失败，请查看日志");
            console.log(response.body)
        }
    }, reason => {
        $notify("招商银行信用卡", "", reason.error)
    });
}