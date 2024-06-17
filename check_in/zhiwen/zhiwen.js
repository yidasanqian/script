/*
    讯飞智文：“🎁签到领积分” 

    *************************
    【Loon 2.1+ 脚本配置】
    *************************
    [Script]
    cron "31 9 * * *" script-path=https://raw.githubusercontent.com/yidasanqian/script/master/check_in/zhiwen/zhiwen.js, tag=智文签到
    *************************
*/

const cookieKey = 'zhiwen_cookieKey';
const $tool = tool();
try {
    console.log("🍎智文签到脚本开始!");
    $tool.setkeyval("account_id=16590341773;appid=a8e55e1974;JSESSIONID=C5A9F53C0F2325450FE25AACB240FBFC;ssoSessionId=697d7f72-8bf0-4233-98cf-2434561fab4a", cookieKey);
    var img = "https://zhiwen.xfyun.cn/favicon.ico";

    var url = 'https://zhiwen.xfyun.cn/api/user/signIn';
    var method = 'POST';
    var headers = {   
        'Cookie': $tool.getkeyval(cookieKey),    
        'Accept-Encoding': 'gzip, deflate, br',            
        'Origin': 'https://zhiwen.xfyun.cn',
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",      
        'Referer': 'https://zhiwen.xfyun.cn/home',
        'Host': 'zhiwen.xfyun.cn',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7,en-GB;q=0.6',
        'Accept': 'application/json, text/plain, */*'
    };
    var body = '';

    var myRequest = {
        url: url,
        method: method,
        headers: headers,
        body: body
    };

    $tool.post(myRequest, function (e, r, d) {
        console.log(d);
        var obj = JSON.parse(d);
        if (obj.code == 0) {    
            // {"flag":true,"code":0,"desc":"成功","count":null,"data":1310}           
            $tool.notify("智文签到成功!", `当前积分:${obj.data}`, { img: img });
            $done();
        }
        else {
            $tool.notify("智文签到失败!", `原因：${obj.desc}`, d, { img: img });
            
        }
        $done();
    })
} catch (e) {
    console.log("🍎error" + e);
    $tool.notify("智文签到错误!", e, e, { img: img });
    $done();
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };