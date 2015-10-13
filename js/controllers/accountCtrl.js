/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainController'], function (ctrl) {
    ctrl.controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })
})