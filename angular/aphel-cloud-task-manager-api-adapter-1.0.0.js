"use strict";

var app;

try {

    app = angular.module("aphel.cloud");
}
catch (err) {

    app = angular.module("aphel.cloud", []);
}

app.factory("$taskManagerAPI", function ($http, $q) {

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

        xhr.open("POST", "https://taskmanagerapi.aphel.com.tr/");

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

        insertTaskType: function (description, color, departmentId, priorityId, taskDuration, totalDuration, progressChanged) {

            var params = {
                description: description,
                color: color,
                departmentId: departmentId,
                priorityId: priorityId,
                taskDuration: taskDuration,
                totalDuration: totalDuration
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertTaskType",
                params: {
                    description: params.description,
                    color: params.color,
                    departmentId: params.departmentId,
                    priorityId: params.priorityId,
                    taskDuration: params.taskDuration,
                    totalDuration: params.totalDuration
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
        updateTaskType: function (id, description, color, departmentId, priorityId, taskDuration, totalDuration, progressChanged) {

            var params = {
                id: id,
                description: description,
                color: color,
                departmentId: departmentId,
                priorityId: priorityId,
                taskDuration: taskDuration,
                totalDuration: totalDuration
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateTaskType",
                params: {
                    id: params.id,
                    description: params.description,
                    color: params.color,
                    departmentId: params.departmentId,
                    priorityId: params.priorityId,
                    taskDuration: params.taskDuration,
                    totalDuration: params.totalDuration
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
        deleteTaskType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteTaskType",
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
        getTaskType: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getTaskType",
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
        getTaskTypeList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getTaskTypeList",
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

        insertTask: function (taskTypeId, departmentId, memberId, subject, content, locationId, deadline, collocutorId, fileList, progressChanged) {

            var params = {
                taskTypeId: taskTypeId,
                departmentId: departmentId,
                memberId: memberId,
                subject: subject,
                content: content,
                locationId: locationId,
                deadline: deadline,
                collocutorId: collocutorId,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertTask",
                params: {
                    taskTypeId: params.taskTypeId,
                    departmentId: params.departmentId,
                    memberId: params.memberId,
                    subject: params.subject,
                    content: params.content,
                    locationId: params.locationId,
                    deadline: params.deadline,
                    collocutorId: params.collocutorId,
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
        updateTask: function (id, subject, content, locationId, deadline, collocutorId, fileList, progressChanged) {

            var params = {
                id: id,
                subject: subject,
                content: content,
                locationId: locationId,
                deadline: deadline,
                collocutorId: collocutorId,
                fileList: fileList
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateTask",
                params: {
                    id: params.id,
                    subject: params.subject,
                    content: params.content,
                    locationId: params.locationId,
                    deadline: params.deadline,
                    collocutorId: params.collocutorId,
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
        deleteTask: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "deleteTask",
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
        getTask: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getTask",
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
        getTaskList: function (includeUnstarted, includeInProgress, includeFinished, includeReopened, assignedToMember, assignedByMember, departmentId, memberId, progressChanged) {

            var params = {
                includeUnstarted: includeUnstarted,
                includeInProgress: includeInProgress,
                includeFinished: includeFinished,
                includeReopened: includeReopened,
                assignedToMember: assignedToMember,
                assignedByMember: assignedByMember,
                departmentId: departmentId,
                memberId: memberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getTaskList",
                params: {
                    includeUnstarted: params.includeUnstarted,
                    includeInProgress: params.includeInProgress,
                    includeFinished: params.includeFinished,
                    includeReopened: params.includeReopened,
                    assignedToMember: params.assignedToMember,
                    assignedByMember: params.assignedByMember,
                    departmentId: params.departmentId,
                    memberId: params.memberId
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

        forwardTask: function (id, memberId, departmentId, progressChanged) {

            var params = {
                id: id,
                memberId: memberId,
                departmentId: departmentId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "forwardTask",
                params: {
                    id: params.id,
                    memberId: params.memberId,
                    departmentId: params.departmentId
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
        updateTaskProgress: function (id, taskStatusId, completedPercent, comment, progressChanged) {

            var params = {
                id: id,
                taskStatusId: taskStatusId,
                completedPercent: completedPercent,
                comment: comment
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateTaskProgress",
                params: {
                    id: params.id,
                    taskStatusId: params.taskStatusId,
                    completedPercent: params.completedPercent,
                    comment: params.comment
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
        declineTask: function (id, comment, progressChanged) {

            var params = {
                id: id,
                comment: comment
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "declineTask",
                params: {
                    id: params.id,
                    comment: params.comment
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

        insertTaskComment: function (taskId, content, progressChanged) {

            var params = {
                taskId: taskId,
                content: content
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "insertTaskComment",
                params: {
                    taskId: params.taskId,
                    content: params.content
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
        updateTaskComment: function (id, content, progressChanged) {

            var params = {
                id: id,
                content: content
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "updateTaskComment",
                params: {
                    id: params.id,
                    content: params.content
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
        getTaskComment: function (id, progressChanged) {

            var params = {
                id: id
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getTaskComment",
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
        getTaskCommentList: function (progressChanged) {

            var request = {
                partnerKey: _partnerKey,
                action: "getTaskCommentList",
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

        getChartDataForTaskByDistrict: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForTaskByDistrict",
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
        getChartDataForTaskByTaskType: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForTaskByTaskType",
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
        getChartDataForTaskByDepartment: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForTaskByDepartment",
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
        getChartDataForTaskQuantityByMonth: function (year, progressChanged) {

            var params = {
                groupTypeId: 1,
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForTaskVelocity",
                params: {
                    groupTypeId: 1,
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
        getChartDataForTaskPerMember: function (groupTypeId, year, month, progressChanged) {

            var params = {
                groupTypeId: groupTypeId,
                year: year,
                month: month
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForTaskPerMember",
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
        getChartDataForTaskVelocity: function (groupTypeId, year, month, progressChanged) {

            var params = {
                groupTypeId: groupTypeId,
                year: year,
                month: month
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForTaskVelocity",
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
        getChartDataForIncomingCompletedTask: function (groupTypeId, year, month, progressChanged) {

            var params = {
                groupTypeId: groupTypeId,
                year: year,
                month: month
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getChartDataForIncomingCompletedTask",
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

        getReportDataMemberTaskList: function (includeUnstarted, includeInProgress, includeFinished, includeReopened, ownerMemberId, progressChanged) {

            var params = {
                includeUnstarted: includeUnstarted,
                includeInProgress: includeInProgress,
                includeFinished: includeFinished,
                includeReopened: includeReopened,
                ownerMemberId: ownerMemberId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReportDataMemberTaskList",
                params: {
                    includeUnstarted: params.includeUnstarted,
                    includeInProgress: params.includeInProgress,
                    includeFinished: params.includeFinished,
                    includeReopened: params.includeReopened,
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
        getReportDataDepartmentTaskList: function (includeUnstarted, includeInProgress, includeFinished, includeReopened, departmentId, progressChanged) {

            var params = {
                includeUnstarted: includeUnstarted,
                includeInProgress: includeInProgress,
                includeFinished: includeFinished,
                includeReopened: includeReopened,
                departmentId: departmentId
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getReportDataDepartmentTaskList",
                params: {
                    includeUnstarted: params.includeUnstarted,
                    includeInProgress: params.includeInProgress,
                    includeFinished: params.includeFinished,
                    includeReopened: params.includeReopened,
                    departmentId: params.departmentId
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

        getDashboardDataTaskCount: function (year, progressChanged) {

            var params = {
                year: year
            };

            checkUndefined(params);

            var request = {
                partnerKey: _partnerKey,
                action: "getDashboardDataTaskCount",
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