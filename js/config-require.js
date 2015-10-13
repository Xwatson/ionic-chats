/**
 * Created by xuwusheng on 15/8/15.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define({
    baseUrl: '',
    //配置路径
    paths:{
        "angular":"lib/ionic/js/ionic.bundle",
        "socket":"http://139.129.21.97:3001/socket.io/socket.io"
    },
    //配置引入包名
    shim:{
        "angular":{
            exports:"angular"
        }
    }
});