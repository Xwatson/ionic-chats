/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController','../services/chatsService'], function (ctrl) {
    //左侧菜单
    ctrl.controller('SideLeftCtrl', ['$rootScope','$scope', '$state', '$ionicSideMenuDelegate','Chats', function ($rootScope,$scope, $state, $ionicSideMenuDelegate,Chats) {
            $scope.login = function () {
                $ionicSideMenuDelegate.toggleLeft();
                $state.go('login');
            }
            $scope.logOut= function () {
                $rootScope.localStorage.removeItem($rootScope.tokenKey);
                Chats.disconnect();
                $ionicSideMenuDelegate.toggleLeft();
                $state.go('login');
            }
        }])
})