/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController','../services/chatsService','../services/discoverUsersService'], function (ctrl) {
    ctrl.controller('DashCtrl', ['$rootScope', '$scope', '$state', '$http', 'Chats','DiscoverUsers', function ($rootScope, $scope, $state, $http, Chats,DiscoverUsers) {

        $scope.refreshLoad=function(){
            var promise = DiscoverUsers.getAll(); // 同步调用
            promise.then(function (data) {
                $scope.Users=data;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
        $scope.refreshLoad();

        $scope.startChat = function (user) {
            Chats.set(user);
            $state.go('tab.dash-detail', {"chatId": user._id,"name":user.nickName?user.nickName:user.registId,"face":user.face});
        }

    }])
})