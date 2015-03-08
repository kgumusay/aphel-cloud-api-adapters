"use strict";

var app;

try {

    app = angular.module("aphel.cloud");
}
catch (err) {

    app = angular.module("aphel.cloud", []);
}

app.factory("$membershipAPI", function ($http, $q) {

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

        xhr.open("POST", "https://membershipapi.aphel.com.tr/");

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.send(JSON.stringify(request));

        return deferred.promise;
    };

    return {
        initialize: function (partnetKey, platform, language, progressChanged) {
            _partnerKey = partnetKey;
            _platform = platform || "web";
            _language = language || "en";
        },
        setLanguage: function (language, progressChanged) {
            _language = language;
        },
        setCompanyId: function (companyId, progressChanged) {
            _currentCompanyId = companyId;
        },
        setSessionInfo: function (originatorMemberId, proxyMemberId, sessionId, progressChanged) {
            _originatorMemberId = originatorMemberId;
            _proxyMemberId = proxyMemberId;
            _sessionId = sessionId;
        },

        insertCompany: function (companyName, domain, nameSurname, homePhoneNumber, businessPhoneNumber, cellPhoneNumber, faxNumber, emailAddress, address, city, webAddress, taxOffice, taxNumber, diskQuotaSize, licenseIdList, memberLicenseCount, defaultSettings, isActive, progressChanged) {
            var params = {
                companyName: companyName,
                domain: domain,
                nameSurname: nameSurname,
                homePhoneNumber: homePhoneNumber,
                businessPhoneNumber: businessPhoneNumber,
                cellPhoneNumber: cellPhoneNumber,
                faxNumber: faxNumber,
                emailAddress: emailAddress,
                address: address,
                city: city,
                webAddress: webAddress,
                taxOffice: taxOffice,
                taxNumber: taxNumber,
                diskQuotaSize: diskQuotaSize,
                licenseIdList: licenseIdList,
                memberLicenseCount: memberLicenseCount,
                defaultSettings: defaultSettings,
                isActive: isActive
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertCompany",
                params: {
                    companyName: params.companyName,
                    domain: params.domain,
                    nameSurname: params.nameSurname,
                    homePhoneNumber: params.homePhoneNumber,
                    businessPhoneNumber: params.businessPhoneNumber,
                    cellPhoneNumber: params.cellPhoneNumber,
                    faxNumber: params.faxNumber,
                    emailAddress: params.emailAddress,
                    address: params.address,
                    city: params.city,
                    webAddress: params.webAddress,
                    taxOffice: params.taxOffice,
                    taxNumber: params.taxNumber,
                    diskQuotaSize: params.diskQuotaSize,
                    licenseIdList: params.licenseIdList,
                    memberLicenseCount: params.memberLicenseCount,
                    defaultSettings: params.defaultSettings,
                    isActive: params.isActive
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
        updateCompany: function (id, companyName, domain, nameSurname, homePhoneNumber, businessPhoneNumber, cellPhoneNumber, faxNumber, emailAddress, address, city, webAddress, taxOffice, taxNumber, diskQuotaSize, licenseIdList, memberLicenseCount, defaultSettings, isActive, progressChanged) {

            var params = {
                id: id,
                companyName: companyName,
                domain: domain,
                nameSurname: nameSurname,
                homePhoneNumber: homePhoneNumber,
                businessPhoneNumber: businessPhoneNumber,
                cellPhoneNumber: cellPhoneNumber,
                faxNumber: faxNumber,
                emailAddress: emailAddress,
                address: address,
                city: city,
                webAddress: webAddress,
                taxOffice: taxOffice,
                taxNumber: taxNumber,
                diskQuotaSize: diskQuotaSize,
                licenseIdList: licenseIdList,
                memberLicenseCount: memberLicenseCount,
                defaultSettings: defaultSettings,
                isActive: isActive
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateCompany",
                params: {
                    id: params.id,
                    companyName: params.companyName,
                    domain: params.domain,
                    nameSurname: params.nameSurname,
                    homePhoneNumber: params.homePhoneNumber,
                    businessPhoneNumber: params.businessPhoneNumber,
                    cellPhoneNumber: params.cellPhoneNumber,
                    faxNumber: params.faxNumber,
                    emailAddress: params.emailAddress,
                    address: params.address,
                    city: params.city,
                    webAddress: params.webAddress,
                    taxOffice: params.taxOffice,
                    taxNumber: params.taxNumber,
                    diskQuotaSize: params.diskQuotaSize,
                    licenseIdList: params.licenseIdList,
                    memberLicenseCount: params.memberLicenseCount,
                    defaultSettings: params.defaultSettings,
                    isActive: params.isActive
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
        updateCompanyInformation: function (id, companyName, nameSurname, homePhoneNumber, businessPhoneNumber, cellPhoneNumber, faxNumber, emailAddress, address, city, webAddress, taxOffice, taxNumber, defaultSettings, progressChanged) {

            var params = {
                id: id,
                companyName: companyName,
                nameSurname: nameSurname,
                homePhoneNumber: homePhoneNumber,
                businessPhoneNumber: businessPhoneNumber,
                cellPhoneNumber: cellPhoneNumber,
                faxNumber: faxNumber,
                emailAddress: emailAddress,
                address: address,
                city: city,
                webAddress: webAddress,
                taxOffice: taxOffice,
                taxNumber: taxNumber,
                defaultSettings: defaultSettings
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateCompanyInformation",
                params: {
                    id: params.id,
                    companyName: params.companyName,
                    nameSurname: params.nameSurname,
                    homePhoneNumber: params.homePhoneNumber,
                    businessPhoneNumber: params.businessPhoneNumber,
                    cellPhoneNumber: params.cellPhoneNumber,
                    faxNumber: params.faxNumber,
                    emailAddress: params.emailAddress,
                    address: params.address,
                    city: params.city,
                    webAddress: params.webAddress,
                    taxOffice: params.taxOffice,
                    taxNumber: params.taxNumber,
                    defaultSettings: params.defaultSettings
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
        setSupervisorPermission: function (id, allow, progressChanged) {

            var params = {
                id: id,
                allow: allow
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "setSupervisorPermission",
                params: {
                    id: params.id,
                    allow: params.allow
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
        deleteCompany: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteCompany",
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
        getCompany: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getCompany",
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
        getCompanyInformation: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getCompanyInformation",
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
        getCompanyByDomain: function (domain, progressChanged) {

            var params = {
                domain: domain
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getCompanyByDomain",
                params: {
                    domain: params.domain
                },
                SP: {
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        },
        getCompanyList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getCompanyList",
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
        getAvailableLicenseList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getAvailableLicenseList",
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

        insertRole: function (description, color, roleTypeId, permissionIdList, progressChanged) {

            var params = {
                description: description,
                color: color,
                roleTypeId: roleTypeId,
                permissionIdList: permissionIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertRole",
                params: {
                    description: params.description,
                    color: params.color,
                    roleTypeId: params.roleTypeId,
                    permissionIdList: params.permissionIdList
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
        updateRole: function (id, description, color, permissionIdList, progressChanged) {

            var params = {
                id: id,
                description: description,
                color: color,
                permissionIdList: permissionIdList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateRole",
                params: {
                    id: params.id,
                    description: params.description,
                    color: params.color,
                    permissionIdList: params.permissionIdList
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
        deleteRole: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteRole",
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
        getRole: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getRole",
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
        getRoleList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getRoleList",
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
        getAvailablePermissionList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getAvailablePermissionList",
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

        insertMemberWithNewCollocutor: function (collocutorGroupId, collocutorTypeId, title, identityNumber, homePhoneNumber, businessPhoneNumber, cellPhoneNumber, faxNumber, emailAddress, webAddress, taxOffice, genderId, birthdate, isInFavorites, isInBlackList, isActive, extraInfo, locations, avatar, username, password, isOneTimePassword, passwordExpireDuration, sessionExpireDuration, theme, roleIdList, ipRestrictionList, timeRestriction, proxyMemberIdList, defaultSettings, language, parentId, progressChanged) {

            var params = {
                collocutorGroupId: collocutorGroupId,
                collocutorTypeId: collocutorTypeId,
                title: title,
                identityNumber: identityNumber,
                homePhoneNumber: homePhoneNumber,
                businessPhoneNumber: businessPhoneNumber,
                cellPhoneNumber: cellPhoneNumber,
                faxNumber: faxNumber,
                emailAddress: emailAddress,
                webAddress: webAddress,
                taxOffice: taxOffice,
                genderId: genderId,
                birthdate: birthdate,
                isInFavorites: isInFavorites,
                isInBlackList: isInBlackList,
                isActive: isActive,
                extraInfo: extraInfo,
                locations: locations,
                avatar: avatar,
                username: username,
                password: password,
                isOneTimePassword: isOneTimePassword,
                passwordExpireDuration: passwordExpireDuration,
                sessionExpireDuration: sessionExpireDuration,
                theme: theme,
                roleIdList: roleIdList,
                ipRestrictionList: ipRestrictionList,
                timeRestriction: timeRestriction,
                proxyMemberIdList: proxyMemberIdList,
                defaultSettings: defaultSettings,
                language: language,
                parentId: parentId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertMemberWithNewCollocutor",
                params: {
                    collocutorGroupId: params.collocutorGroupId,
                    collocutorTypeId: params.collocutorTypeId,
                    title: params.title,
                    identityNumber: params.identityNumber,
                    homePhoneNumber: params.homePhoneNumber,
                    businessPhoneNumber: params.businessPhoneNumber,
                    cellPhoneNumber: params.cellPhoneNumber,
                    faxNumber: params.faxNumber,
                    emailAddress: params.emailAddress,
                    webAddress: params.webAddress,
                    taxOffice: params.taxOffice,
                    genderId: params.genderId,
                    birthdate: params.birthdate,
                    isInFavorites: params.isInFavorites,
                    isInBlackList: params.isInBlackList,
                    isActive: params.isActive,
                    extraInfo: params.extraInfo,
                    locations: params.locations,
                    avatar: params.avatar,
                    username: params.username,
                    password: params.password,
                    isOneTimePassword: params.isOneTimePassword,
                    passwordExpireDuration: params.passwordExpireDuration,
                    sessionExpireDuration: params.sessionExpireDuration,
                    theme: params.theme,
                    roleIdList: params.roleIdList,
                    ipRestrictionList: params.ipRestrictionList,
                    timeRestriction: params.timeRestriction,
                    proxyMemberIdList: params.proxyMemberIdList,
                    defaultSettings: params.defaultSettings,
                    language: params.language,
                    parentId: params.parentId
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
        insertMemberWithExistingCollocutor: function (collocutorId, username, password, isOneTimePassword, passwordExpireDuration, sessionExpireDuration, theme, roleIdList, ipRestrictionList, timeRestriction, proxyMemberIdList, defaultSettings, language, parentId, progressChanged) {

            var params = {
                collocutorId: collocutorId,
                username: username,
                password: password,
                isOneTimePassword: isOneTimePassword,
                passwordExpireDuration: passwordExpireDuration,
                sessionExpireDuration: sessionExpireDuration,
                theme: theme,
                roleIdList: roleIdList,
                ipRestrictionList: ipRestrictionList,
                timeRestriction: timeRestriction,
                proxyMemberIdList: proxyMemberIdList,
                defaultSettings: defaultSettings,
                language: language,
                parentId: parentId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertMemberWithExistingCollocutor",
                params: {
                    collocutorId: params.collocutorId,
                    username: params.username,
                    password: params.password,
                    isOneTimePassword: params.isOneTimePassword,
                    passwordExpireDuration: params.passwordExpireDuration,
                    sessionExpireDuration: params.sessionExpireDuration,
                    theme: params.theme,
                    roleIdList: params.roleIdList,
                    ipRestrictionList: params.ipRestrictionList,
                    timeRestriction: params.timeRestriction,
                    proxyMemberIdList: params.proxyMemberIdList,
                    defaultSettings: params.defaultSettings,
                    language: params.language,
                    parentId: params.parentId
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
        updateMember: function (id, collocutorId, collocutorGroupId, collocutorTypeId, title, identityNumber, homePhoneNumber, businessPhoneNumber, cellPhoneNumber, faxNumber, emailAddress, webAddress, taxOffice, genderId, birthdate, isInFavorites, isInBlackList, isActive, extraInfo, locations, avatar, passwordExpireDuration, sessionExpireDuration, roleIdList, ipRestrictionList, timeRestriction, proxyMemberIdList, defaultSettings, parentId, progressChanged) {

            var params = {
                id: id,
                collocutorId: collocutorId,
                collocutorGroupId: collocutorGroupId,
                collocutorTypeId: collocutorTypeId,
                title: title,
                identityNumber: identityNumber,
                homePhoneNumber: homePhoneNumber,
                businessPhoneNumber: businessPhoneNumber,
                cellPhoneNumber: cellPhoneNumber,
                faxNumber: faxNumber,
                emailAddress: emailAddress,
                webAddress: webAddress,
                taxOffice: taxOffice,
                genderId: genderId,
                birthdate: birthdate,
                isInFavorites: isInFavorites,
                isInBlackList: isInBlackList,
                isActive: isActive,
                extraInfo: extraInfo,
                locations: locations,
                avatar: avatar,
                passwordExpireDuration: passwordExpireDuration,
                sessionExpireDuration: sessionExpireDuration,
                roleIdList: roleIdList,
                ipRestrictionList: ipRestrictionList,
                timeRestriction: timeRestriction,
                proxyMemberIdList: proxyMemberIdList,
                defaultSettings: defaultSettings,
                parentId: parentId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateMember",
                params: {
                    id: params.id,
                    collocutorId: params.collocutorId,
                    collocutorGroupId: params.collocutorGroupId,
                    collocutorTypeId: params.collocutorTypeId,
                    title: params.title,
                    identityNumber: params.identityNumber,
                    homePhoneNumber: params.homePhoneNumber,
                    businessPhoneNumber: params.businessPhoneNumber,
                    cellPhoneNumber: params.cellPhoneNumber,
                    faxNumber: params.faxNumber,
                    emailAddress: params.emailAddress,
                    webAddress: params.webAddress,
                    taxOffice: params.taxOffice,
                    genderId: params.genderId,
                    birthdate: params.birthdate,
                    isInFavorites: params.isInFavorites,
                    isInBlackList: params.isInBlackList,
                    isActive: params.isActive,
                    extraInfo: params.extraInfo,
                    locations: params.locations,
                    avatar: params.avatar,
                    passwordExpireDuration: params.passwordExpireDuration,
                    sessionExpireDuration: params.sessionExpireDuration,
                    roleIdList: params.roleIdList,
                    ipRestrictionList: params.ipRestrictionList,
                    timeRestriction: params.timeRestriction,
                    proxyMemberIdList: params.proxyMemberIdList,
                    defaultSettings: params.defaultSettings,
                    parentId: params.parentId
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
        updateMemberInformation: function (collocutorGroupId, collocutorTypeId, title, identityNumber, homePhoneNumber, businessPhoneNumber, cellPhoneNumber, faxNumber, emailAddress, webAddress, taxOffice, genderId, birthdate, extraInfo, locations, proxyMemberIdList, defaultSettings, parentId, progressChanged) {

            var params = {
                collocutorGroupId: collocutorGroupId,
                collocutorTypeId: collocutorTypeId,
                title: title,
                identityNumber: identityNumber,
                homePhoneNumber: homePhoneNumber,
                businessPhoneNumber: businessPhoneNumber,
                cellPhoneNumber: cellPhoneNumber,
                faxNumber: faxNumber,
                emailAddress: emailAddress,
                webAddress: webAddress,
                taxOffice: taxOffice,
                genderId: genderId,
                birthdate: birthdate,
                extraInfo: extraInfo,
                locations: locations,
                proxyMemberIdList: proxyMemberIdList,
                defaultSettings: defaultSettings,
                parentId: parentId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateMemberInformation",
                params: {
                    collocutorGroupId: params.collocutorGroupId,
                    collocutorTypeId: params.collocutorTypeId,
                    title: params.title,
                    identityNumber: params.identityNumber,
                    homePhoneNumber: params.homePhoneNumber,
                    businessPhoneNumber: params.businessPhoneNumber,
                    cellPhoneNumber: params.cellPhoneNumber,
                    faxNumber: params.faxNumber,
                    emailAddress: params.emailAddress,
                    webAddress: params.webAddress,
                    taxOffice: params.taxOffice,
                    genderId: params.genderId,
                    birthdate: params.birthdate,
                    extraInfo: params.extraInfo,
                    locations: params.locations,
                    proxyMemberIdList: params.proxyMemberIdList,
                    defaultSettings: params.defaultSettings,
                    parentId: params.parentId
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
        updateDeviceId: function (deviceId, progressChanged) {

            var params = {
                deviceId: deviceId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateDeviceId",
                params: {
                    deviceId: params.deviceId
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
        changeUsername: function (username, progressChanged) {

            var params = {
                username: username
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "changeUsername",
                params: {
                    username: params.username
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
        changePassword: function (username, oldPassword, newPassword, progressChanged) {

            var params = {
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "changePassword",
                params: {
                    username: params.username,
                    oldPassword: params.oldPassword,
                    newPassword: params.newPassword
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
        changeAvatar: function (avatar, progressChanged) {

            var params = {
                avatar: avatar
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "changeAvatar",
                params: {
                    avatar: params.avatar
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
        setPassword: function (memberId, newPassword, progressChanged) {

            var params = {
                memberId: memberId,
                newPassword: newPassword
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "setPassword",
                params: {
                    memberId: params.memberId,
                    newPassword: params.newPassword
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
        addToFavorites: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "addToFavorites",
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
        removeFromFavorites: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "removeFromFavorites",
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
        getMember: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getMember",
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
        getMemberInformation: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getMemberInformation",
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
        getMemberList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getMemberList",
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
        deleteMember: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteMember",
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
        authenticateMember: function (username, password, language, progressChanged) {

            var params = {
                username: username,
                password: password,
                language: language
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "authenticateMember",
                params: {
                    username: params.username,
                    password: params.password,
                    language: params.language
                },
                SP: {
                    currentCompanyId: _currentCompanyId,
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        },
        forgotPassword: function (emailAddress, progressChanged) {

            var params = {
                emailAddress: emailAddress
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "forgotPassword",
                params: {
                    emailAddress: params.emailAddress
                },
                SP: {
                    currentCompanyId: _currentCompanyId,
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        },
        resetPassword: function (passwordResetCode, newPassword, progressChanged) {

            var params = {
                passwordResetCode: passwordResetCode,
                newPassword: newPassword
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "resetPassword",
                params: {
                    passwordResetCode: params.passwordResetCode,
                    newPassword: params.newPassword
                },
                SP: {
                    currentCompanyId: _currentCompanyId,
                    platform: _platform,
                    language: _language
                }
            };

            return send(request, progressChanged);
        },
        getMemberLoginList: function (beginDatetime, endDatetime, progressChanged) {

            var params = {
                beginDatetime: beginDatetime,
                endDatetime: endDatetime
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getMemberLoginList",
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
        }
    }
});