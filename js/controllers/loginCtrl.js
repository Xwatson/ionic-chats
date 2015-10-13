/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController','../services/chatsService'], function (ctrl) {
    ctrl.controller('LoginCtrl', ['$scope', '$state', '$ionicPopup', '$http', '$rootScope', '$stateParams','Chats','HOST', function ($scope, $state, $ionicPopup, $http, $rootScope, $stateParams,Chats,HOST) {
        $scope.User = {
            name: ''||$rootScope.localStorage.getItem('loginName'),
            pwd: ''
        };
        var from = $stateParams["from"], msg = $stateParams["msg"];
        if (msg) {
            $ionicPopup.alert({
                title: '提示',
                template: msg
            });
        }
        $scope.btnLogin = function (user) {
            //登陆验证
            if (user.name != '' && user.pwd != '') {
                $http.post(HOST + '/singin', user)
                    .success(function (data) {
                        if (data.status == 200) {
                            $rootScope.localStorage.setItem($rootScope.tokenKey, data.token);
                            $rootScope.localStorage.setItem('loginName', user.name);
                            data.user.token = data.token;
                            $rootScope.User = data.user;
                            $state.go(from ? from : $rootScope.defaultPage);
                            Chats.init(data.user._id);//初始化socket
                        } else {
                            $ionicPopup.alert({
                                title: '提示',
                                template: data.msg
                            });
                        }
                    }
                ).error(function (data, status) {
                        console.log('请求出错：' + status);
                    });
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '请输入用户名和密码'
                });
                alertPopup.then(function (res) {
                    console.log('Thank you!');
                });
            }
        }

    }])
})