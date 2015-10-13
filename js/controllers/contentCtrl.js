/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController'], function (ctrl) {
   ctrl.controller('contentCtrl',['$scope',function ($scope) {
       //监听事件 向下广播事件
       $scope.$on('eContent', function(e,to) {
           $scope.$broadcast(to);
       });
   }])
});