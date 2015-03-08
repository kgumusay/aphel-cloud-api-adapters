"use strict";

var app;

try {

    app = angular.module("aphel.cloud");
}
catch (err) {

    app = angular.module("aphel.cloud", []);
}

app.factory("$commonAPI", function ($http, $q) {

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

        xhr.open("POST", "https://commonapi.aphel.com.tr/");

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

        insertLocationType: function (description, color, progressChanged) {

            var params = {
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertLocationType",
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
        updateLocationType: function (id, description, color, progressChanged) {

            var params = {
                id: id,
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateLocationType",
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
        deleteLocationType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteLocationType",
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
        getLocationType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getLocationType",
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
        getLocationTypeList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getLocationTypeList",
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

        insertResourceType: function (description, color, progressChanged) {

            var params = {
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertResourceType",
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
        updateResourceType: function (id, description, color, progressChanged) {

            var params = {
                id: id,
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateResourceType",
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
        deleteResourceType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteResourceType",
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
        getResourceType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getResourceType",
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
        getResourceTypeList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getResourceTypeList",
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

        insertLocation: function (description, locationTypeId, cityId, townId, districtId, address, latitude, longitude, progressChanged) {

            var params = {
                description: description,
                locationTypeId: locationTypeId,
                cityId: cityId,
                townId: townId,
                districtId: districtId,
                address: address,
                latitude: latitude,
                longitude: longitude
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertLocation",
                params: {
                    description: params.description,
                    locationTypeId: params.locationTypeId,
                    cityId: params.cityId,
                    townId: params.townId,
                    districtId: params.districtId,
                    address: params.address,
                    latitude: params.latitude,
                    longitude: params.longitude
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
        updateLocation: function (id, description, locationTypeId, cityId, townId, districtId, address, latitude, longitude, progressChanged) {

            var params = {
                id: id,
                description: description,
                locationTypeId: locationTypeId,
                cityId: cityId,
                townId: townId,
                districtId: districtId,
                address: address,
                latitude: latitude,
                longitude: longitude
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateLocation",
                params: {
                    id: params.id,
                    description: params.description,
                    locationTypeId: params.locationTypeId,
                    cityId: params.cityId,
                    townId: params.townId,
                    districtId: params.districtId,
                    address: params.address,
                    latitude: params.latitude,
                    longitude: params.longitude
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
        deleteLocation: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteLocation",
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
        getLocation: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getLocation",
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
        getLocationList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getLocationList",
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

        insertResource: function (description, resourceTypeId, progressChanged) {

            var params = {
                description: description,
                resourceTypeId: resourceTypeId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertResource",
                params: {
                    description: params.description,
                    resourceTypeId: params.resourceTypeId
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
        updateResource: function (id, description, resourceTypeId, progressChanged) {

            var params = {
                id: id,
                description: description,
                resourceTypeId: resourceTypeId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateResource",
                params: {
                    id: params.id,
                    description: params.description,
                    resourceTypeId: params.resourceTypeId
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
        deleteResource: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteResource",
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
        getResource: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getResource",
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
        getResourceList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getResourceList",
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

        insertCity: function (description, progressChanged) {

            var params = {
                description: description
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertCity",
                params: {
                    description: params.description
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
        updateCity: function (id, description, progressChanged) {

            var params = {
                id: id,
                description: description
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateCity",
                params: {
                    id: params.id,
                    description: params.description
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
        deleteCity: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteCity",
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
        getCity: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getCity",
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
        getCityList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getCityList",
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

        insertTown: function (cityId, description, progressChanged) {

            var params = {
                cityId: cityId,
                description: description
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertTown",
                params: {
                    cityId: params.cityId,
                    description: params.description
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
        updateTown: function (id, cityId, description, progressChanged) {

            var params = {
                id: id,
                cityId: cityId,
                description: description
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateTown",
                params: {
                    id: params.id,
                    cityId: params.cityId,
                    description: params.description
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
        deleteTown: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteTown",
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
        getTown: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);


            var request = {
                partnerKey: _partnerKey,
                action: "getTown",
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
        getTownList: function (cityId, progressChanged) {

            var params = {
                cityId: cityId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getTownList",
                params: {
                    cityId: params.cityId
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

        insertDistrict: function (townId, description, postalCode, progressChanged) {

            var params = {
                townId: townId,
                description: description,
                postalCode: postalCode
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertDistrict",
                params: {
                    townId: params.townId,
                    description: params.description,
                    postalCode: params.postalCode
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
        updateDistrict: function (id, townId, description, postalCode, progressChanged) {

            var params = {
                id: id,
                townId: townId,
                description: description,
                postalCode: postalCode
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateDistrict",
                params: {
                    id: params.id,
                    townId: params.townId,
                    description: params.description,
                    postalCode: params.postalCode
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
        deleteDistrict: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteDistrict",
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
        getDistrict: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getDistrict",
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
        getDistrictList: function (townId, progressChanged) {

            var params = {
                townId: townId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getDistrictList",
                params: {
                    townId: params.townId
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

        insertMemberGroup: function (description, memberIdList, progressChanged) {

            var params = {
                description: description,
                memberIdList: memberIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertMemberGroup",
                params: {
                    description: params.description,
                    memberIdList: params.memberIdList
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
        updateMemberGroup: function (id, description, memberIdList, progressChanged) {

            var params = {
                id: id,
                description: description,
                memberIdList: memberIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateMemberGroup",
                params: {
                    id: params.id,
                    description: params.description,
                    memberIdList: params.memberIdList
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
        deleteMemberGroup: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteMemberGroup",
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
        getMemberGroup: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getMemberGroup",
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
        getMemberGroupList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getMemberGroupList",
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

        insertDepartmentType: function (description, color, progressChanged) {

            var params = {
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertDepartmentType",
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
        updateDepartmentType: function (id, description, color, progressChanged) {

            var params = {
                id: id,
                description: description,
                color: color
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateDepartmentType",
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
        deleteDepartmentType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteDepartmentType",
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
        getDepartmentType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getDepartmentType",
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
        getDepartmentTypeList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getDepartmentTypeList",
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

        insertDepartment: function (description, departmentTypeId, memberIdList, progressChanged) {

            var params = {
                description: description,
                departmentTypeId: departmentTypeId,
                memberIdList: memberIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertDepartment",
                params: {
                    description: params.description,
                    departmentTypeId: params.departmentTypeId,
                    memberIdList: params.memberIdList
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
        updateDepartment: function (id, description, departmentTypeId, memberIdList, progressChanged) {

            var params = {
                id: id,
                description: description,
                departmentTypeId: departmentTypeId,
                memberIdList: memberIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateDepartment",
                params: {
                    id: params.id,
                    description: params.description,
                    departmentTypeId: params.departmentTypeId,
                    memberIdList: params.memberIdList
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
        deleteDepartment: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteDepartment",
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
        getDepartment: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getDepartment",
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
        getDepartmentList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getDepartmentList",
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

        getSystemLog: function (logTypeId, id, progressChanged) {

            var params = {
                logTypeId: logTypeId,
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getSystemLog",
                params: {
                    logTypeId: params.logTypeId,
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
        getSystemLogList: function (logTypeId, beginDatetime, endDatetime, progressChanged) {

            var params = {
                logTypeId: logTypeId,
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };


            var request = {
                partnerKey: _partnerKey,
                action: "getSystemLogList",
                params: {
                    logTypeId: params.logTypeId,
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
        getMaintenanceLogList: function (beginDatetime, endDatetime, progressChanged) {

            var params = {
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };


            var request = {
                partnerKey: _partnerKey,
                action: "getMaintenanceLogList",
                params: {
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
        getUsageLogList: function (beginDatetime, endDatetime, progressChanged) {

            var params = {
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };


            var request = {
                partnerKey: _partnerKey,
                action: "getUsageLogList",
                params: {
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
        getMethodCallDurations: function (beginDatetime, endDatetime, progressChanged) {

            var params = {
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };


            var request = {
                partnerKey: _partnerKey,
                action: "getMethodCallDurations",
                params: {
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
        getFile: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getFile",
                params: {
                    id: id
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