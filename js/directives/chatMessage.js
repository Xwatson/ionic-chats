/**
 * Created by xuwusheng on 15/9/16.
 */
define(['mainDirective'], function (main) {
    main.directive('chatMessage',function () {
            return {
                restrict:'EA',
                scope:{
                    messages:'=',
                    userid:'@'
                },
                template:'<div class="chats-item" ng-repeat="item in messages" ng-class="{\'chatsMy\':item.user.uid==userid}">'+
                        '<div class="chats-head">'+
                        '<img src="{{item.user.face}}" width="34" height="33"></div>'+
                        '<div class="chats" ng-bind="item.text">'+
                        '</div><div class="chatsClear"></div></div>',
                link: function (scope,el,attr) {
                    //scope.Messages='';
                }
            }
        })

})

