/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainService','./chatsService'], function (service) {
    service.factory('VerifyToken', ['$rootScope', '$http','$timeout','$q', 'Chats','HOST', function ($rootScope, $http,$timeout,$q, Chats,HOST) {
        var verifyTime;
        return {
            deferVerify: function () {
                var _t=this;
                //等待验证
                verifyTime = $timeout(function (){
                    if($rootScope.isVerify){
                        var promise = _t.verify();
                        promise.then(function () {
                            if(!$rootScope.chatInitFlag) {
                                $timeout.cancel(verifyTime);
                                _t.deferVerify();
                            }
                        }, function () {
                            _t.deferVerify();
                        });
                    }
                },1300);

            },
            verify: function () {
                //验证token
                var deferred = $q.defer();
                $http.get(HOST+ '/service/verifyToken')
                    .success(function (data) {
                        if (data) {
                            $rootScope.User = data;
                            if (!$rootScope.chatInitFlag) {
                                //初始化聊天
                                Chats.init(data._id);
                            }
                            deferred.resolve('ok');
                        }
                    });
                return deferred.promise;
            }
        };
    }])
})