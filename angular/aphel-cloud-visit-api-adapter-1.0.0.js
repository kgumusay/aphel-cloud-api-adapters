"use strict";

var app;

try {

    app = angular.module("aphel.cloud");
}
catch (err) {

    app = angular.module("aphel.cloud", []);
}

app.factory("$visitAPI", function ($http, $q) {

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

        xhr.open("POST", "https://visitapi.aphel.com.tr/");

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

        insertVisitType: function (description, color, progressChanged) {

            var params = {
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertVisitType",
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
        updateVisitType: function (id, description, color, progressChanged) {

            var params = {
                id: id,
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateVisitType",
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
        deleteVisitType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteVisitType",
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
        getVisitType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getVisitType",
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
        getVisitTypeList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getVisitTypeList",
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

        insertVisit: function (description, visitTypeId, ownerMemberId, locationId, activityTypeId, visitDatetime, visitDuration, note, collocutorIdList, fileList, progressChanged) {

            var params = {
                description: description,
                visitTypeId: visitTypeId,
                ownerMemberId: ownerMemberId,
                locationId: locationId,
                activityTypeId: activityTypeId,
                visitDatetime: visitDatetime,
                visitDuration: visitDuration,
                note: note,
                collocutorIdList: collocutorIdList,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertVisit",
                params: {
                    description: params.description,
                    visitTypeId: params.visitTypeId,
                    ownerMemberId: params.ownerMemberId,
                    locationId: params.locationId,
                    activityTypeId: params.activityTypeId,
                    visitDatetime: params.visitDatetime,
                    visitDuration: params.visitDuration,
                    note: params.note,
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
        updateVisit: function (id, description, visitTypeId, ownerMemberId, locationId, activityTypeId, visitDatetime, visitDuration, note, collocutorIdList, fileList, progressChanged) {

            var params = {
                id: id,
                description: description,
                visitTypeId: visitTypeId,
                ownerMemberId: ownerMemberId,
                locationId: locationId,
                activityTypeId: activityTypeId,
                visitDatetime: visitDatetime,
                visitDuration: visitDuration,
                note: note,
                collocutorIdList: collocutorIdList,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateVisit",
                params: {
                    id: params.id,
                    description: params.description,
                    visitTypeId: params.visitTypeId,
                    ownerMemberId: params.ownerMemberId,
                    locationId: params.locationId,
                    activityTypeId: params.activityTypeId,
                    visitDatetime: params.visitDatetime,
                    visitDuration: params.visitDuration,
                    note: params.note,
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
        deleteVisit: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteVisit",
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
        getVisit: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getVisit",
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
        getVisitList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getVisitList",
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


        getChartDataForVisitByDistrict: function (year, ownerMemberId, progressChanged) {

            var params = {
                year: year,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForVisitByDistrict",
                params: {
                    year: params.year,
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
        getChartDataForVisitByVisitType: function (year, ownerMemberId, progressChanged) {

            var params = {
                year: year,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForVisitByVisitType",
                params: {
                    year: params.year,
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
        getChartDataForVisitByLocationType: function (year, ownerMemberId, progressChanged) {

            var params = {
                year: year,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForVisitByLocationType",
                params: {
                    year: params.year,
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
        getChartDataForVisitByLocationTypeAll: function (year, ownerMemberId, progressChanged) {

            var params = {
                year: year,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForVisitByLocationTypeAll",
                params: {
                    year: params.year,
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
        getChartDataForVisitQuantityDistribution: function (groupTypeId, year, ownerMemberId, progressChanged) {

            var params = {
                groupTypeId: groupTypeId,
                year: year,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForVisitQuantityDistribution",
                params: {
                    groupTypeId: params.groupTypeId,
                    year: params.year,
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
        getChartDataForVisitHoursDistribution: function (groupTypeId, year, month, ownerMemberId, progressChanged) {

            var params = {
                groupTypeId: groupTypeId,
                year: year,
                month: month,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForVisitHoursDistribution",
                params: {
                    groupTypeId: params.groupTypeId,
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

        getReportDataVisitQuantityByLocation: function (locationTypeId, townId, districtId, beginDatetime, endDatetime, minQuantity, maxQuantity, ownerMemberId, progressChanged) {

            var params = {
                locationTypeId: locationTypeId,
                townId: townId,
                districtId: districtId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime,
                minQuantity: minQuantity,
                maxQuantity: maxQuantity,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReportDataVisitQuantityByLocation",
                params: {
                    locationTypeId: params.locationTypeId,
                    townId: params.townId,
                    districtId: params.districtId,
                    beginDatetime: params.beginDatetime,
                    endDatetime: params.endDatetime,
                    minQuantity: params.minQuantity,
                    maxQuantity: params.maxQuantity,
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
        getReportDataVisitQuantityByLocationType: function (locationTypeId, townId, districtId, beginDatetime, endDatetime, minQuantity, maxQuantity, ownerMemberId, progressChanged) {

            var params = {
                locationTypeId: locationTypeId,
                townId: townId,
                districtId: districtId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime,
                minQuantity: minQuantity,
                maxQuantity: maxQuantity,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReportDataVisitQuantityByLocationType",
                params: {
                    locationTypeId: params.locationTypeId,
                    townId: params.townId,
                    districtId: params.districtId,
                    beginDatetime: params.beginDatetime,
                    endDatetime: params.endDatetime,
                    minQuantity: params.minQuantity,
                    maxQuantity: params.maxQuantity,
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
        getDashboardDataVisitCount: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getDashboardDataVisitCount",
                params: {
                    year: params.year
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