/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController','../services/chatsService','../services/messageService'], function (ctrl) {
    ctrl.controller('ChatsCtrl', ['$rootScope', '$scope', '$http', '$state', 'Chats', 'Message', function ($rootScope, $scope, $http, $state, Chats, Message) {

        Chats.setDirty("chats",function () {
            $scope.$apply();
        })
        $scope.Message = Message.all();
        $scope.chats = Chats.all();
        $scope.getLastText= function (msg,id) {
            if(!msg) return;
            var i;
            for(i=msg.length-1;i--;){
                if(msg[i].user.uid==id){
                    return msg[i].text;
                }
            }
        }
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    }])
})