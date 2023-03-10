//修改请求头信息
Change_Request();

function Change_Request()
{
    var RequestHeaders = $request.headers;
    console.log(RequestHeaders);
    RequestHeaders["x-forwarded-for"] = "8.8.8.8";
    console.log(RequestHeaders);
    $done({RequestHeaders});
}