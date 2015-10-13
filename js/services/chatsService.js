/**
 * Created by xuwusheng on 15/8/16.
 */
'use strict';
define(['./mainService', 'socket','./messageService'], function (service, io) {
    service.factory('Chats', ['$rootScope', '$http', 'Message','WSHOST', function ($rootScope, $http, Message,WSHOST) {
            var chats = [],dirtyCheck={chats: function () {}};//通知脏检查

            var socket = null;
            return {
                all: function () {
                    return chats;
                },
                setDirty: function (key,obj) {
                    dirtyCheck[key]=obj;
                },
                dirty: function () {
                    angular.forEach(dirtyCheck, function (v,k) {
                        v();
                    });
                },
                removeDirty: function (key) {
                    delete dirtyCheck[key];
                },
                get: function (chatId) {
                    for (var i = 0; i < chats.length; i++) {
                        if (chats[i]._id == chatId) {
                            return chats[i];
                        }
                    }
                    return null;
                },
                set: function (user) {
                    chats.splice(chats.indexOf(user), 1);
                    chats.splice(0, 0, user);
                },
                init: function (uid) {
                    var _t = this;
                    //连接websocket后端服务器
                    socket = io.connect(WSHOST);
                    //通知服务器登录
                    socket.emit('login', uid);
                    //监听退出
                    socket.on('loginout', function (uid) {
                        //设置离线
                        console.log('id:' + uid + ' 离线了。');
                    });
                    //监听接受消息
                    socket.on('message_' + uid, function (form, msg) {
                        Message.set(form,msg);
                        _t.dirty();
                    });
                    $rootScope.chatInitFlag = true;
                },
                send: function (uid, to, msg) {
                    socket.emit('message', uid, to, msg);

                },
                disconnect: function () {
                    socket.close();
                }
            };
        }])



});