//修改请求头信息
function Change_Request()
{
    var RequestHeaders = $request.headers;
    RequestHeaders["x-forwarded-for"] = "8.8.8.8";
    $done({RequestHeaders});
}