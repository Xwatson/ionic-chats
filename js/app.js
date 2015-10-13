define(['angular', './controllers/mainController','./services/mainService','./services/verifyTokenService'], function (angular) {

    return angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
        .constant('TokenKey','XLJT-XWATSON-TOKEN')
        .constant('HOST','http://***') //数据服务地址
        .constant('WSHOST','ws://***') //websocket地址
        .run(['$ionicPlatform', '$rootScope', '$state', '$http','$location','VerifyToken','TokenKey', function ($ionicPlatform, $rootScope, $state, $http,$location,VerifyToken,TokenKey) {
            $rootScope.defaultPage = 'tab.dash';
            $rootScope.localStorage = window.localStorage;
            $rootScope.chatInitFlag = false;//聊天初始化标记
            $rootScope.firstFlag = true;//第一次加载
            $rootScope.isVerify=true;//是否请求验证
            $rootScope.User=null;
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleLightContent();
                }

            });
            //错误处理
            $rootScope.$on('userIntercepted', function (userIntercepted, errorType, data) {
                if($location.$$path!='/login')
                    $state.go("login", {from: $state.current.name, msg: data.msg});
            });

            $rootScope.$on('$stateChangeStart',function (event, toState) {
                if (toState.name == 'login') return;// 如果是进入登录界面则允许
                // 如果token不存在
                if (!$rootScope.localStorage.getItem(TokenKey)) {
                    event.preventDefault();// 取消默认跳转行为
                    $state.go("login");//跳转到登录界面
                } else {
                    if($rootScope.firstFlag){
                        //VerifyToken.deferVerify();
                        VerifyToken.verify();
                        $rootScope.firstFlag=false;
                       // return;
                    }
                    //VerifyToken.verify();
                }
            });
        }])
        //拦截器
        .factory('UserInterceptor', ['$q', '$rootScope','TokenKey', function ($q, $rootScope,TokenKey) {
            return {
                request: function (config) {
                    //请求头token信息
                    config.headers['x-access-token'] = $rootScope.localStorage.getItem(TokenKey);
                    return config;
                },
                responseError: function (response) {
                    $rootScope.isVerify=false;
                    var data = response.data;
                    // token验证失败
                    if (data.status == '4000') {
                        $rootScope.$emit('userIntercepted', 'tokenError', data);
                    }
                    // token验证失效
                    if (data.status == '4001') {
                        $rootScope.$emit('userIntercepted', 'tokenOut', data);
                    }
                    //其他错误信息
                    if (data.status == '40000') {
                        $rootScope.$emit('userIntercepted', 'error', data);
                    }
                    return $q.reject(response);
                }
            };
        }])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            //注册拦截器
            $httpProvider.interceptors.push('UserInterceptor');


            $stateProvider

                .state('tab', {
                    url: '/tab',
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })


                .state('tab.dash', {
                    url: '/dash',
                    cache:'false',
                    views: {
                        'tab-dash': {
                            templateUrl: 'templates/tab-dash.html',
                            controller: 'DashCtrl'
                        }
                    }
                })
                .state('tab.dash-detail', {
                    url: '/dash/:chatId/:name/:face',
                    views: {
                        'tab-dash': {
                            templateUrl: 'templates/chat-detail.html',
                            controller: 'ChatDetailCtrl'
                        }
                    }
                })
                .state('tab.chats', {
                    url: '/chats',
                    views: {
                        'tab-chats': {
                            templateUrl: 'templates/tab-chats.html',
                            controller: 'ChatsCtrl'
                        }
                    }
                })
                .state('tab.chat-detail', {
                    url: '/chats/:chatId/:name/:face',
                    views: {
                        'tab-chats': {
                            templateUrl: 'templates/chat-detail.html',
                            controller: 'ChatDetailCtrl'
                        }
                    }
                })

                .state('tab.account', {
                    url: '/account',
                    views: {
                        'tab-account': {
                            templateUrl: 'templates/tab-account.html',
                            controller: 'AccountCtrl'
                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    params: {'from': null, 'msg': null},
                    controller: 'LoginCtrl'

                })
                .state('regist', {
                    url: '/regist',
                    templateUrl: 'templates/regist.html',
                    controller: 'RegistCtrl'

                });


            $urlRouterProvider.otherwise('/tab/dash');

        }]);

});

