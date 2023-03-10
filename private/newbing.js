//修改请求头信息
Change_Request();

function Change_Request()
{
    var RequestHeaders = $request.headers;
    console.log(RequestHeaders);
    RequestHeaders["user-agent"] = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41";
    RequestHeaders["x-forwarded-for"] = "8.8.8.8";
    console.log(RequestHeaders);
    $done({RequestHeaders});
}