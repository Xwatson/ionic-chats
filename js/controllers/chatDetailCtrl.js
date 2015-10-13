/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController','../services/chatsService','../services/messageService'], function (ctrl) {
    ctrl.controller('ChatDetailCtrl', ['$rootScope','$scope', '$stateParams', '$ionicTabsDelegate','$filter','$ionicScrollDelegate', 'Chats','Message', function ($rootScope,$scope, $stateParams, $ionicTabsDelegate,$filter,$ionicScrollDelegate, Chats,Message) {
        $ionicTabsDelegate._instances[0].$tabsElement.addClass('hide');
        Chats.setDirty("chatDetail",function () {
            $scope.$apply();
            $ionicScrollDelegate.scrollBottom(true);

        });
        //监听事件 删除脏检查
        $scope.$on('eChatDetail', function (e) {
            Chats.removeDirty('chatDetail');
        });
        $scope.chat = Chats.get($stateParams.chatId);
        $scope.Message=Message.all();
        $scope.UserID=$rootScope.User._id;
        $scope.text="";
        $scope.sendMsg= function () {
            var msg={
                text:$scope.text,
                user:{
                    time:'',
                    uid:$rootScope.User._id,
                    name:$stateParams.name,
                    face:$stateParams.face
                }
            };
            msg.text=$scope.text;
            if(msg.text.length>0) {
                Chats.send($rootScope.User._id, $stateParams.chatId, msg);
                var selfMsg={
                    text:$scope.text,
                    user:{
                        time:$filter('date')(Date.now(), 'yyyy-MM-dd HH:mm'),
                        uid:$rootScope.User._id,
                        name:$rootScope.User.name,
                        face:$rootScope.User.face
                    }
                };
                Message.set($stateParams.chatId,selfMsg);
                $ionicScrollDelegate.scrollBottom(true);
            }
            $scope.text = "";

        }
    }])
})