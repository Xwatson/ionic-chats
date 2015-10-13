/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController','../services/chatsService'], function (ctrl) {
    ctrl.controller('RegistCtrl', ['$scope', '$ionicPopup', '$http', '$state', '$rootScope','Chats','HOST', function ($scope, $ionicPopup, $http, $state, $rootScope,Chats,HOST) {
        $scope.User = {
            name: '',
            pwd: '',
            entPwd: '',
            code: ''
        };
        $scope.btnRegist = function (user) {
            if (user && user.name != '' && user.pwd != '') {
                if (user.pwd == user.entPwd) {
                    $http.post(HOST + '/regist', user)
                        .success(function (data) {
                            if (data.status == 200) {
                                $rootScope.localStorage.setItem($rootScope.tokenKey, data.token);
                                $rootScope.User = data.user;
                                data.user.token = data.token;
                                $state.go($rootScope.defaultPage);
                                Chats.init(data.user._id);//初始化socket
                            } else {
                                $ionicPopup.alert({
                                    title: '提示',
                                    template: data.msg
                                });
                            }
                        })
                        .error(function (data, status) {
                            console.log('请求出错：' + status);
                        });
                } else {
                    $ionicPopup.alert({
                        title: '错误',
                        template: '两次输入的密码不相同!'
                    });
                }
                if (user.code == '') {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '请输入验证码!'
                    });
                    return;
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '提示',
                    template: '请输入手机号和密码'
                });
                alertPopup.then(function (res) {
                    console.log('Thank you!');
                });
            }
        }
    }])
})