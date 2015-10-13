/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController'], function (ctrl) {

    ctrl.controller('navBarCtrl', ['$scope', '$ionicTabsDelegate', '$ionicHistory', function ($scope, $ionicTabsDelegate, $ionicHistory) {
        $scope.Test='xwsxws';
        $scope.backClick = function () {
            $ionicTabsDelegate._instances[0].$tabsElement.removeClass('hide');
            $ionicHistory.goBack();
            //触发删除脏检查事件
            $scope.$emit('eContent','eChatDetail');
        }

    }])
});