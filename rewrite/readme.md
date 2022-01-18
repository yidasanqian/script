### CDN 加速直连 raw.githubusercontent.com
#### Loon
```
[URL Rewrite]
^https?:\/\/raw\.githubusercontent\.com 307 https://raw.yidasanqian.workers.dev
[MITM]
hostname = raw.githubusercontent.com
```
#### QuantumultX
```
[Rewrite]
^https?:\/\/raw\.githubusercontent\.com url 307 https://raw.yidasanqian.workers.dev

[MITM]
hostname = raw.githubusercontent.com
```

说明：

- CDN 服务器使用的是CF workers，每日请求限额10万次
- 请勿使用302/307 重定向到一个你不信任的网址，建议自己搭一个，免费且更安全

ref： https://github.com/elecV2/QuantumultX-Tools/blob/master/rawgithub/readme.md