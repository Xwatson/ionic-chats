/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainService'], function (service) {
    service.factory('Message', [function () {
        var ms = {'1001': [{text: 'test', user: {uid: '', name:'', face: ''}}]};
        return {
            all: function () {
                return ms;
            },
            set:function(uid,msg){
                if(ms[uid])
                    ms[uid].push(msg);
                else
                    ms[uid]=new Array(msg);
                this.saveLocal();
            },
            get:function(uid){
                return ms[uid];
            },
            saveLocal: function () {

            }
        }
    }])
})