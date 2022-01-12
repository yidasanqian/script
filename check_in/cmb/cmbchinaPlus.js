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
const checkinUrl = 'https://weclub.xyk.cmbchina.com/SCRMCustomActivityFront/checkin-plus/request/checkin.json';

const cookie = clientUtil.getdata(cookieKey);
const userAgent = clientUtil.getdata(userAgentKey);

checkin();

function checkin() {

  // 签到
  var requestParams = {
      url: checkinUrl,
      headers: {
          'Cookie': cookie,
          'User-Agent': userAgent,
          'Content-type' : 'application/json;charset=utf-8'
      },
      body: JSON.stringify({'activityCode' : 'checkinPlus'})
  };
  
  clientUtil.post(requestParams, (error, response, data) => {
    const result = JSON.parse(data)
    if (result.respCode == 1000) {
      clientUtil.msg("招商银行信用卡", "", "签到成功，获得 " + result.data.awardValue + " 积分🎁");
    } else if (result.respCode == 1452) {
      clientUtil.msg("招商银行信用卡", "", "签到失败，请获取 cookie");
    } else if (result.respCode == 'custom_8500') {
      clientUtil.msg("招商银行信用卡", "", "签到失败，" + result.respMsg);
    } else {
      clientUtil.msg("招商银行信用卡", "", `签到失败，编码: ${result.respCode}, 说明: ${result.respMsg}`);
      console.log(response.body)
    }

    clientUtil.done();
  });
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