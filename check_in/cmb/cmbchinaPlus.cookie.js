/*
    招商银行信用卡微信公众号：“领积分 - 🎁签到领积分Plus” 获取 Cookie

    *************************
    【Loon 2.1+ 脚本配置】
    *************************
    [Script]
    http-request https:\/\/weclub\.xyk\.cmbchina\.com/SCRMCustomActivityFront/checkin-plus/request/get-home-data\.json\?activityCode=checkinPlus script-path=https://raw.githubusercontent.com/yidasanqian/script/master/check_in/cmb/cmbchinaPlus.cookie.js, tag=招商银行信用卡签到cookie
    cron "30 8 * * *" script-path=https://raw.githubusercontent.com/yidasanqian/script/master/check_in/cmb/cmbchinaPlus.js, tag=招商银行信用卡签到
 
    *************************
    【 QX 1.0.10+ 脚本配置 】 
    *************************
    [task_local]
    30 8 * * * cmbchinaPlus.js,tag=招商银行信用卡签到

    [rewrite_local]
    https://weclub\.xyk\.cmbchina\.com/SCRMCustomActivityFront/checkin-plus/request/get-home-data\.json\?activityCode=checkinPlus url script-request-header cmbchinaPlus.cookie.js,tag=招商银行信用卡签到cookie
    
    [MITM]
    hostname = weclub.xyk.cmbchina.com
*/

const clientUtil = init();
const cookieKey = 'cmbchinaPlus_cookieKey';
const userAgentKey = 'cmbchinaPlus_userAgentKey';

let isGetCookie = typeof $request !== 'undefined' && $request.method != 'OPTIONS';

if (isGetCookie) {
    // 获取 Cookie
    if ($request.headers['Cookie']) {
        var cookie = $request.headers['Cookie'];
        var userAgent = $request.headers['User-Agent'];
        clientUtil.setdata(cookie, cookieKey);
        clientUtil.setdata(userAgent, userAgentKey);
        clientUtil.msg("成功获取招商银行信用卡 cookie 🎉", "", "请禁用该脚本")
    }
    clientUtil.done();
}

function init() {
    isSurge = () => {
      return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
      return undefined === this.$task ? false : true
    }
    getdata = (key) => {
      if (isSurge()) return $persistentStore.read(key)
      if (isQuanX()) return $prefs.valueForKey(key)
    }
    setdata = (key, val) => {
      if (isSurge()) return $persistentStore.write(key, val)
      if (isQuanX()) return $prefs.setValueForKey(key, val)
    }
    msg = (title, subtitle, body) => {
      if (isSurge()) $notification.post(title, subtitle, body)
      if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
      if (isSurge()) {
        $httpClient.get(url, cb)
      }
      if (isQuanX()) {
        url.method = 'GET'
        $task.fetch(url).then((resp) => cb(null, resp, resp.body))
      }
    }
    post = (url, cb) => {
      if (isSurge()) {
        $httpClient.post(url, cb)
      }
      if (isQuanX()) {
        url.method = 'POST'
        $task.fetch(url).then((resp) => cb(null, resp, resp.body))
      }
    }
    done = (value = {}) => {
      $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
  }