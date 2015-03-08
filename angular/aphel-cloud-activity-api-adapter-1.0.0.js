"use strict";

var app;

try {

    app = angular.module("aphel.cloud");
}
catch (err) {

    app = angular.module("aphel.cloud", []);
}

app.factory("$activityAPI", function ($http, $q) {

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

        xhr.open("POST", "https://activityapi.aphel.com.tr/");

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

        insertActivityType: function (description, color, progressChanged) {

            var params = {
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertActivityType",
                params: {
                    description: params.description,
                    color: params.color
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
        updateActivityType: function (id, description, color, progressChanged) {

            var params = {
                id: id,
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateActivityType",
                params: {
                    id: params.id,
                    description: params.description,
                    color: params.color
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
        deleteActivityType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteActivityType",
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
        getActivityType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getActivityType",
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
        getActivityTypeList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getActivityTypeList",
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
        },

        insertActivity: function (subject, body, activityTypeId, beginDatetime, endDatetime, locationId, resourceId, collocutorIdList, fileList, progressChanged) {

            var params = {
                subject: subject,
                body: body,
                locationId: locationId,
                resourceId: resourceId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime,
                activityTypeId: activityTypeId,
                collocutorIdList: collocutorIdList,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertActivity",
                params: {
                    subject: params.subject,
                    body: params.body,
                    locationId: params.locationId,
                    resourceId: params.resourceId,
                    beginDatetime: params.beginDatetime,
                    endDatetime: params.endDatetime,
                    activityTypeId: params.activityTypeId,
                    collocutorIdList: params.collocutorIdList,
                    fileList: params.fileList
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
        updateActivity: function (id, subject, body, activityTypeId, beginDatetime, endDatetime, locationId, resourceId, collocutorIdList, fileList, progressChanged) {

            var params = {
                id: id,
                subject: subject,
                body: body,
                locationId: locationId,
                resourceId: resourceId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime,
                activityTypeId: activityTypeId,
                collocutorIdList: collocutorIdList,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateActivity",
                params: {
                    id: params.id,
                    subject: params.subject,
                    body: params.body,
                    locationId: params.locationId,
                    resourceId: params.resourceId,
                    beginDatetime: params.beginDatetime,
                    endDatetime: params.endDatetime,
                    activityTypeId: params.activityTypeId,
                    collocutorIdList: params.collocutorIdList,
                    fileList: params.fileList
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
        deleteActivity: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteActivity",
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
        getActivity: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getActivity",
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
        getActivityList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getActivityList",
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
        },
        updateParticipantResponse: function (activityId, responseId, progressChanged) {

            var params = {
                activityId: activityId,
                responseId: responseId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateParticipantResponse",
                params: {
                    activityId: params.activityId,
                    responseId: params.responseId
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

        insertActivityRequest: function (subject, body, activityTypeId, locationId, resourceId, collocutorIdList, fileList, progressChanged) {

            var params = {
                subject: subject,
                body: body,
                locationId: locationId,
                resourceId: resourceId,
                activityTypeId: activityTypeId,
                collocutorIdList: collocutorIdList,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertActivityRequest",
                params: {
                    subject: params.subject,
                    body: params.body,
                    locationId: params.locationId,
                    resourceId: params.resourceId,
                    activityTypeId: params.activityTypeId,
                    collocutorIdList: params.collocutorIdList,
                    fileList: params.fileList
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
        updateActivityRequest: function (id, subject, body, activityTypeId, locationId, resourceId, collocutorIdList, fileList, progressChanged) {

            var params = {
                id: id,
                subject: subject,
                body: body,
                locationId: locationId,
                resourceId: resourceId,
                activityTypeId: activityTypeId,
                collocutorIdList: collocutorIdList,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateActivityRequest",
                params: {
                    id: params.id,
                    subject: params.subject,
                    body: params.body,
                    locationId: params.locationId,
                    resourceId: params.resourceId,
                    activityTypeId: params.activityTypeId,
                    collocutorIdList: params.collocutorIdList,
                    fileList: params.fileList
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
        acceptActivityRequest: function (id, subject, body, activityTypeId, beginDatetime, endDatetime, locationId, resourceId, collocutorIdList, fileList, progressChanged) {

            var params = {
                id: id,
                subject: subject,
                body: body,
                locationId: locationId,
                resourceId: resourceId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime,
                activityTypeId: activityTypeId,
                collocutorIdList: collocutorIdList,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "acceptActivityRequest",
                params: {
                    id: params.id,
                    subject: params.subject,
                    body: params.body,
                    locationId: params.locationId,
                    resourceId: params.resourceId,
                    beginDatetime: params.beginDatetime,
                    endDatetime: params.endDatetime,
                    activityTypeId: params.activityTypeId,
                    collocutorIdList: params.collocutorIdList,
                    fileList: params.fileList
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
        deleteActivityRequest: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteActivityRequest",
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
        getActivityRequest: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getActivityRequest",
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
        getActivityRequestList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getActivityRequestList",
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
        },

        getChartDataForTotalMeetingDurationsByMember: function (groupTypeId, year, month, progressChanged) {

            var params = {
                groupTypeId: groupTypeId,
                year: year,
                month: month
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForTotalMeetingDurationsByMember",
                params: {
                    groupTypeId: groupTypeId,
                    year: params.year,
                    month: params.month
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
        getChartDataForTotalMeetingDurationsByActivityType: function (groupTypeId, year, month, ownerMemberId, progressChanged) {

            var params = {
                groupTypeId: groupTypeId,
                year: year,
                month: month,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForTotalMeetingDurationsByActivityType",
                params: {
                    groupTypeId: groupTypeId,
                    year: params.year,
                    month: params.month,
                    ownerMemberId: params.ownerMemberId
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

        getReportDataActivityList: function (activityTypeId, beginDatetime, endDatetime, progressChanged) {

            var params = {
                activityTypeId: activityTypeId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReportDataActivityList",
                params: {
                    activityTypeId: activityTypeId,
                    beginDatetime: params.beginDatetime,
                    endDatetime: params.endDatetime
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
        }
    }
});