/**
 * Created by xuwusheng on 15/10/11.
 */
define(['./mainService'], function (service) {
    service.factory('DiscoverUsers', ['$q', '$http', 'HOST', function ($q, $http, HOST) {
        var users = [];

        return {
            set: function (data) {
                user = data;
            },
            push: function (data) {
                users.push(data);
            },
            getAll: function () {
                var deferred = $q.defer(); // 声明延后执行
                $http.get(HOST+ '/service/getUsers')
                    .success(function (data) {
                        users = data;
                        deferred.resolve(data);
                    });
                return deferred.promise;   // 返回承诺
            },
            get: function (uid) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i]._id == uid) {
                        return users[i];
                    }
                }
                return null;
            }
        };
    }])
})