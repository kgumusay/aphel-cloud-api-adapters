"use strict";

var app;

try {

    app = angular.module("aphel.cloud");
}
catch (err) {

    app = angular.module("aphel.cloud", []);
}

app.factory("$serviceAPI", function ($http, $q) {

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

        xhr.open("POST", "https://serviceapi.aphel.com.tr/");

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

        insertServiceType: function (description, color, progressChanged) {

            var params = {
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertServiceType",
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
        updateServiceType: function (id, description, color, progressChanged) {

            var params = {
                id: id,
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateServiceType",
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
        deleteServiceType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteServiceType",
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
        getServiceType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getServiceType",
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
        getServiceTypeList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getServiceTypeList",
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

        insertService: function (description, serviceTypeId, locationId, serviceDatetime, amount, collocutorIdList, progressChanged) {

            var params = {
                description: description,
                serviceTypeId: serviceTypeId,
                locationId: locationId,
                serviceDatetime: serviceDatetime,
                amount: amount,
                collocutorIdList: collocutorIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertService",
                params: {
                    description: params.description,
                    serviceTypeId: params.serviceTypeId,
                    locationId: params.locationId,
                    serviceDatetime: params.serviceDatetime,
                    amount: params.amount,
                    collocutorIdList: params.collocutorIdList
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
        updateService: function (id, description, serviceTypeId, locationId, serviceDatetime, amount, collocutorIdList, progressChanged) {

            var params = {
                id: id,
                description: description,
                serviceTypeId: serviceTypeId,
                locationId: locationId,
                serviceDatetime: serviceDatetime,
                amount: amount,
                collocutorIdList: collocutorIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateService",
                params: {
                    id: params.id,
                    description: params.description,
                    serviceTypeId: params.serviceTypeId,
                    locationId: params.locationId,
                    serviceDatetime: params.serviceDatetime,
                    amount: params.amount,
                    collocutorIdList: params.collocutorIdList
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
        deleteService: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteService",
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
        getService: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getService",
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
        getServiceList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getServiceList",
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

        getChartDataForServiceByDistrict: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForServiceByDistrict",
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
        },
        getChartDataForServiceByServiceType: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForServiceByServiceType",
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
        },
        getChartDataForServiceByLocationType: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForServiceByLocationType",
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
        },
        getChartDataForServiceDistribution: function (groupTypeId, year, progressChanged) {

            var params = {
                groupTypeId: groupTypeId,
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForServiceDistribution",
                params: {
                    groupTypeId: params.groupTypeId,
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
        },

        getReportDataServiceQuantityByDistrict: function (locationTypeId, cityId, townId, districtId, beginDatetime, endDatetime, progressChanged) {

            var params = {
                locationTypeId: locationTypeId,
                cityId: cityId,
                townId: townId,
                districtId: districtId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReportDataServiceQuantityByDistrict",
                params: {
                    locationTypeId: params.locationTypeId,
                    cityId: params.cityId,
                    townId: params.townId,
                    districtId: params.districtId,
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
        },
        getReportDataServiceQuantityByLocationType: function (locationTypeId, cityId, townId, districtId, beginDatetime, endDatetime, progressChanged) {

            var params = {
                locationTypeId: locationTypeId,
                cityId: cityId,
                townId: townId,
                districtId: districtId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReportDataServiceQuantityByLocationType",
                params: {
                    locationTypeId: params.locationTypeId,
                    cityId: params.cityId,
                    townId: params.townId,
                    districtId: params.districtId,
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
        },
        getReportDataServiceBudgetByDistrict: function (locationTypeId, cityId, townId, beginDatetime, endDatetime, progressChanged) {

            var params = {
                locationTypeId: locationTypeId,
                cityId: cityId,
                townId: townId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReportDataServiceBudgetByDistrict",
                params: {
                    locationTypeId: params.locationTypeId,
                    cityId: params.cityId,
                    townId: params.townId,
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
        },
        getDashboardDataServiceBudget: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getDashboardDataServiceBudget",
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