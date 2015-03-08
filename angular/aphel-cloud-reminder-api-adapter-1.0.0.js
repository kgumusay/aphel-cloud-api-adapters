"use strict";

var app;

try {

    app = angular.module("aphel.cloud");
}
catch (err) {

    app = angular.module("aphel.cloud", []);
}

app.factory("$reminderAPI", function ($http, $q) {

    var _partnerKey = "",
        _platform = "web",
        _language = "en",
        _currentCompanyId,
        _originatorMemberId,
        _proxyMemberId,
        _sessionId;

    var checkUndefined = function (params) {

        var keys = _.keys(params);

        _.each(keys, function (item) {

            if (_.isObject(params[item])) {

                var inner1Keys = _.keys(params[item]);

                _.each(inner1Keys, function (inner1Item) {

                    if (_.isObject(params[item][inner1Item])) {

                        var inner2Keys = _.keys(params[item][inner1Item]);

                        _.each(inner2Keys, function (inner2Item) {

                            if (params[item][inner1Item][inner2Item] === undefined) {
                                params[item][inner1Item][inner2Item] = null;
                            }
                        });
                    }
                    else {
                        if (params[item][inner1Item] === undefined) {
                            params[item][inner1Item] = null;
                        }
                    }
                });
            }
            else {
                if (params[item] === undefined) {
                    params[item] = null;
                }
            }
        });
    };

    var send = function (request, progressChanged) {

        var deferred = $q.defer();

        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", function (evt) {

            var progress;

            if (evt.lengthComputable) {
                progress = Math.round(evt.loaded * 100 / evt.total);
            } else {
                progress = 100;
            }

            if (progressChanged) {
                progressChanged(progress);
            }

        }, false);

        xhr.addEventListener("load", function (response) {

            response = JSON.parse(response.currentTarget.response);

            if (response.code === 0) {
                deferred.resolve(response);
            }
            else {
                deferred.reject(response);
            }
        }, false);

        xhr.addEventListener("error", function () {

            var errorDescription;

            if (_language == "tr") {
                errorDescription = "Sunucuya ulaşım sırasında bir hata oluştu. Lütfen internet bağlantınızı kontrol ederek tekrar deneyin.";
            }
            else {
                errorDescription = "An error occurred during connecting to server. Please check your internet connection and try again.";
            }

            deferred.reject({
                code: -1,
                description: errorDescription
            });
        }, false);

        xhr.addEventListener("abort", function () {

            var errorDescription;

            if (_language == "tr") {
                errorDescription = "Sunucuya ulaşım sırasında işlem iptal edildi.";
            }
            else {
                errorDescription = "Operation cancelled during connecting to server.";
            }

            deferred.reject({
                code: -1,
                description: errorDescription
            });
        }, false);

        xhr.open("POST", "https://reminderapi.aphel.com.tr/");

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.send(JSON.stringify(request));

        return deferred.promise;
    };

    return {
        initialize: function (partnetKey, platform, language) {
            _partnerKey = partnetKey;
            _platform = platform || "web";
            _language = language || "en";
        },
        setLanguage: function (language) {
            _language = language;
        },
        setCompanyId: function (companyId) {
            _currentCompanyId = companyId;
        },
        setSessionInfo: function (originatorMemberId, proxyMemberId, sessionId) {
            _originatorMemberId = originatorMemberId;
            _proxyMemberId = proxyMemberId;
            _sessionId = sessionId;
        },

        insertReminder: function (locationId, distance, content, beginDatetime, endDatetime, memberIdList, memberGroupIdList, progressChanged) {

            var params = {
                locationId: locationId,
                distance: distance,
                content: content,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime,
                memberIdList: memberIdList,
                memberGroupIdList: memberGroupIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertReminder",
                params: {
                    locationId: params.locationId,
                    distance: params.distance,
                    content: params.content,
                    beginDatetime: params.beginDatetime,
                    endDatetime: params.endDatetime,
                    memberIdList: params.memberIdList,
                    memberGroupIdList: params.memberGroupIdList
                },
                SP: {
                    currentCompanyId: _currentCompanyId,
                    originatorMemberId: _originatorMemberId,
                    proxyMemberId: _proxyMemberId,
                    sessionId: _sessionId,
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        },
        updateReminder: function (id, locationId, distance, content, beginDatetime, endDatetime, memberIdList, memberGroupIdList, progressChanged) {

            var params = {
                id: id,
                locationId: locationId,
                distance: distance,
                content: content,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime,
                memberIdList: memberIdList,
                memberGroupIdList: memberGroupIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateReminder",
                params: {
                    id: params.id,
                    locationId: params.locationId,
                    distance: params.distance,
                    content: params.content,
                    beginDatetime: params.beginDatetime,
                    endDatetime: params.endDatetime,
                    memberIdList: params.memberIdList,
                    memberGroupIdList: params.memberGroupIdList
                },
                SP: {
                    currentCompanyId: _currentCompanyId,
                    originatorMemberId: _originatorMemberId,
                    proxyMemberId: _proxyMemberId,
                    sessionId: _sessionId,
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        },
        deleteReminder: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteReminder",
                params: {
                    id: params.id
                },
                SP: {
                    currentCompanyId: _currentCompanyId,
                    originatorMemberId: _originatorMemberId,
                    proxyMemberId: _proxyMemberId,
                    sessionId: _sessionId,
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        },
        getReminder: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReminder",
                params: {
                    id: params.id
                },
                SP: {
                    currentCompanyId: _currentCompanyId,
                    originatorMemberId: _originatorMemberId,
                    proxyMemberId: _proxyMemberId,
                    sessionId: _sessionId,
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        },
        getReminderList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getReminderList",
                params: {},
                SP: {
                    currentCompanyId: _currentCompanyId,
                    originatorMemberId: _originatorMemberId,
                    proxyMemberId: _proxyMemberId,
                    sessionId: _sessionId,
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        }
    }
});