
function SubmitSchedule() {
        var clientId = $("#clientId").val();
        var scheduleMonthId = $("#scheduleMonthId").val();
        debugger;
        $.ajax({
            type: 'POST',
            url: '/RotaSetup/ClientSchedule', // we are calling json method
            dataType: 'json',
            data: {
                clientId: clientId,
                scheduleMonthId: scheduleMonthId
            },
            success: function (result) {
                debugger;
                if (!result.isError) {
                    var url = '/RotaSetup/ClientSchedule';
                    newSuccessAlert(result.msg, url);
                }
                else {
                    errorAlert(result.msg);
                }
            },
            error: function (ex) {
                errorAlert(ex);
            }
        });

    }
function setPassword() {
    var passwordId = $("#newPasswordId").val();
    var confirmPasswordId = $("#confirmPasswordId").val();
    var staffId = $("#staffId").val();
    debugger;
    $.ajax({
        type: 'POST',
        url: '/Admin/SetPasswordForStaff', // we are calling json method
        dataType: 'json',
        data: {
            passwordId: passwordId,
            confirmPasswordId: confirmPasswordId,
            staffId: staffId
        },
        success: function (result) {
            debugger;
            if (!result.isError) {
                var url = '/Admin/ManageStaff';
                newSuccessAlert(result.msg, url);

            }
            else {
                newErrorAlert(result.msg, url);
            }
        },
        error: function (ex) {
            errorAlert(ex);
        }
    });
}

function exportEvent() {
    html2canvas(document.querySelector("#capture")).then(canvas => {
            debugger;
            var base64 = (canvas.toDataURL('capture'));
        $("#downLoad").attr("href", base64);
        location.href("Employee", "Events");
        });
}

function sortClientSchedule() {
    var clientId = $("#sortClient").val();
    var year = $("#sortYear").val();
    var filter = true;
    debugger;
    $.ajax({
        type: 'GET',
        url: '/rotaSetup/SortClientSchedule', // we are calling json method
        dataType: 'json',
        data: {
            clientId: clientId,
            year: year,
            filter: filter,
        },
        success: function (result) {
            if (result != null) {
                $("#sortSchedule").empty();
                $.each(result, function (i, sorted) {
                    $("#sortSchedule").append(
                        '<tr><td class="text-center"> </td><td class="text-center">' + sorted.clientName + '</td> <td class= "text-center" id = "copyMonth">' + sorted.name + '</td > <td>' +
                        '<div class=" text-center"><a href="/rota/events?clientScheduleId='+ sorted.id +'" class="manage fa fa-wrench  fa-2x text-primary col-3" data-placement="top" title="Manage Schedule">' +
                        '</a> <a data-toggle="modal" data-target="#copy_schedule" class="manage fa fa-clone  fa-2x text-primary col-3" data-placement="top"'+
                        'onclick="copyToModal('+sorted.id +')" title="Copy Schedule"></a></div></td></tr>'
                    );
                })
                $(document).ready(function () {
                    $('.manage').tooltip();
                });
            }
           
        },
        
    });
}

function PublishEventsId() {
    $("#pubbing").addClass("pubbing");
    $('#pubBtn').hide();  
        var clientScheduleId = $("#clientScheduleId").val();
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Rota/PublishEvents', // we are calling json method
            dataType: 'json',
            data: {
                clientScheduleId: clientScheduleId,
            },
            success: function (result) {
                debugger;
                if (!result.isError) {
                    var url = '/Rota/Events';
                    $('#publishLoader').fadeOut("slow").delay(100);
                    newSuccessAlert(result.msg, url);
                    $('#pubbing').hide();
                   
                }
                else {
                    newErrorAlert(result.msg, url);
                }
            },
            error: function (ex) {
                errorAlert(ex);
            }
        });
    }

function addNewStaff() {
    debugger;
    var clientId = $('#clientId').val();
    var StaffManagement = {};
    StaffManagement.ClientId = clientId;
    StaffManagement.StaffId = $('#getStaffIds').val();

    $.ajax({
        type: 'POST',
        url: '/Admin/ManageStaff', // we are calling json method
        dataType: 'Json',
        data: { StaffManagement: StaffManagement },
        success: function (result) {
            debugger;
            if (!result.isError) {
                debugger;
               var uri = '/Admin/ManageStaff?clientId=' + clientId;
                newSuccessAlert(result.msg, uri);
               
            }
            else {
                errorAlert(result.msg);
            }
        }
    });
}

function getMonthId(id, monthId, yearId) {
    debugger;
    var hiddenId = id
    $('#getMonthId').val(hiddenId);
    var word = "0";
    var newMonth = word+monthId;
    var year = yearId
    if (monthId.toString().length < 2)
    {
        var monthYear = year + "-" + newMonth + "-01";
    }
    else
    {
        var monthYear = year + "-" + monthId + "-01";
    }

    debugger;
    $.ajax({
        type: 'GET',
        url: '/RotaSetup/SetupWeeks',
        data: {
            scheduleMonthId: id,
        },
        success: function (data) {
            debugger;
            $("#MySetupModalBody").html(data);
            document.getElementById("startDateId").defaultValue = monthYear;
            document.getElementById("endDateId").defaultValue = monthYear;
        }
    });
    $("#mySetUpModal").modal();

}

function AddWeekMonth() {
    var scheduleMonthId = $("#getMonthId").val();
    var startDate = $("#startDateId").val();
    var endDate = $("#endDateId").val();
    var weekName = $("#weekNameId").val();
    debugger;
    $.ajax({
        type: 'POST',
        url: '/RotaSetup/AddWeekInMonth', // we are calling json method
        dataType: 'json',
        data: {
            scheduleMonthId: scheduleMonthId,
            startDate: startDate,
            endDate: endDate,
            weekName: weekName,
        },
        success: function (result) {
            debugger;
            if (!result.isError) {
                var url = '/RotaSetup/RotaMonth';
                $("#mySetUpModal").modal("hide");
                successAlert(result.msg);

            }
            else {
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            errorAlert(ex);
        }
    });

}

function GenerateReport() {

    var monthId = $("#monthsId").val();
    var weekInMonth = $("#weeksInMonth").val();
    debugger;
    $.ajax({
        type: 'GET',
        url: '/Report/GenerateWeeklyReport',
        dataType: 'json',
        data: {
            scheduleMonthId: monthId, weeksInMonthId: weekInMonth
        },
       
        success: function (result) {
            debugger;
            if (!result.isError) {
                var url = '/RotaSetup/RotaMonth';
                newSuccessAlert(result.msg, url);

            }
            else {
                newErrorAlert(result.msg, url);
            }
        },
        error: function (ex) {
            errorAlert(ex);
        }
    });
}

function getWeeksInMonth(id) {

   
    debugger;
    $.ajax({
        type: 'GET',
        url: '/Report/MonthWeeksReport',
        dataType: 'json',
        data: {
            scheduleMonthId: id
        },
        success: function (result) {
            debugger;
            if (!result.isError) {

                $("#monthsId").val(id);
                $("#task-list").empty();
                $("#weeksInMonth").empty()

                $("#weeksInMonth").append("<option value='" + 0 + "'>--- Select Week ---</option>");
                $.each(result.data, function (i, weeks) {
                    if (weeks.isGenerated) {
                        $("#weeksInMonth").append("<option class='weekOption' value='" + weeks.id + "'disabled>" + weeks.name + "</option>");
                        //$(".weekOption").
                    } else {
                        $("#weeksInMonth").append("<option class='weekOption' value='" + weeks.id + "'>" + weeks.name + "</option>");
                    }
                   

                    var completed = " ";
                    if (weeks.isGenerated) {
                        completed = "completed task";
                        //$(".weekOption").
                    }
                  
                    $("#task-list").append(
                        ' <li class="'+ completed +'"><div class="task-container border-0" ><span class="task-action-btn task-check">' +
                        '<span class="action-circle large complete-btn" title="Mark Complete"><i class="material-icons">check</i> </span> </span>' +
                        '<span class="addWeek">' + weeks.name  + '</span></div > </li > '
                    );
                })
            }
            else {
                var url = '/RotaSetup/RotaMonth';
                newErrorAlert(result.msg, url);
            }
        },
        error: function (ex) {
            errorAlert(ex);
        }
    });
}

function editClient(id) {
    debugger;
    $.ajax({
        type: 'GET',
        url: '/Admin/EditClient', // we are calling json method
        data: { clientId: id },
        dataType: 'json',
        success: function (data) {
            debugger;
            if (!data.isError) {

                $('#editClientName').val(data.name);
                $('#editClientEmail').val(data.email);
                $('#editClientAddress').val(data.address);
                $('#editClientPhone').val(data.phone);
                $('#editClientDOB').val(data.birthDay);
                $('#countryedId').val(data.countryId);
                $('#stateedId').val(data.stateId);
                $('#genderedId').val(data.genderId);
                $('#editClientPost').val(data.postalCode);
                $('#editClientedCode').val(data.code);
                $('#editClientId').val(data.id);
                $('#editClientTelephone').val(data.telephone);
            }
        }
    });
};


function SaveEditClient() {
    debugger;
    var data = {};
    data.Code = $("#editClientedCode").val();
    data.Id = $("#editClientId").val();
    data.PostalCode = $("#editClientPost").val();
    data.BirthDay = $("#editClientDOB").val();
    data.Name = $("#editClientName").val();
    data.Email = $("#editClientEmail").val();
    data.Address = $("#editClientAddress").val();
    data.Phone = $("#editClientPhone").val();
    data.Telephone = $('#editClientTelephone').val();

    debugger;
    $.ajax({
        type: 'POST',
        url: '/Admin/EditClient', // we are calling json method,
        dataType: 'json',
        data: { client: data },
        success: function (result) {
            debugger;
            if (!result.isError) {
                var url = "/Admin/ClientInfo";
                newSuccessAlert(result.msg, url);
            }
            else {
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            "Something went wrong, contact support - " + errorAlert(ex);
        }
    });
}

function GenerateIcsFile() {

    var scheduleId = $("#clientSchedule").val();
    debugger;
    $.ajax({
        type: 'GET',
        url: '/Report/GenerateIcsFile',
        dataType: 'json',
        data: {
            clientSchedule: scheduleId
        },

        success: function (result) {
            debugger;
            if (!result.isError) {
                window.open("data:text/calendar;charset=utf8," + escape(result.data));
            }
            else {
                newErrorAlert(result.msg, url);
            }
        },
        error: function (ex) {
            errorAlert(ex);
        }
    });
}


var checkedFeature = [];
var uncheckedFeature = [];
function getCheckedAccess() {
    debugger;
    var allCheckedFeatures = document.getElementsByClassName("feature");

    for (var i = 0; i < allCheckedFeatures.length; i++) {

        if (allCheckedFeatures[i].checked) {
            checkedFeature.push(allCheckedFeatures[i].name);
        }
        else {
            uncheckedFeature.push(allCheckedFeatures[i].name)
        }
    }
}

function SaveData() {
    debugger;
    $('#loader').show();
    $('#loader-wrapper').show();
    getCheckedAccess();
    var companyId = $('#companyId').val();

    var checkedListFeaturesJs = checkedFeature;
    var unCheckedListFeaturesJs = uncheckedFeature;
    if (checkedListFeaturesJs.length != 0) {
        $.ajax({
            type: 'POST',
            dataType: 'Json',
            url: '/SuperAdmin/CompanyCustomSetting',
            data:
            {
                companyId: companyId,
                checkedCompanySettings: checkedListFeaturesJs,
                uncheckedCompanySettings: unCheckedListFeaturesJs
            },
            success: function (result) {
                debugger;
                $('#loader').show();
                $('#loader-wrapper').fadeOut(3000);
                if (!result.isError) {
                    var reloadUrl = "/SuperAdmin/CompanySettings?companyId="+companyId;
                    newSuccessAlert(result.msg, reloadUrl);
                }

                else {
                    $('#loader').show();
                    $('#loader-wrapper').fadeOut(3000);
                    errorAlert(result.msg);
                }
            },
            error: function (ex) {
                $('#loader').show();
                $('#loader-wrapper').fadeOut(3000);
                errorAlert(ex);
            }
        });
    }
    else {
        $('#loader').show();
        $('#loader-wrapper').fadeOut(3000);
        errorAlert("fill all field");
    }

}


function companySetupBySuperAdmin() {
    var companyDetail = {};
    companyDetail.CompanyName = $("#companyName").val();
    companyDetail.ContactPerson = $("#contactPerson").val();
    companyDetail.Address = $("#address").val();
    companyDetail.CountryId = $("#countryId").val();
    companyDetail.StateId = $("#stateId").val();
    companyDetail.postalCode = $("#postalCode").val();
    companyDetail.CompanyDescription = $("#companyDescription").val();
    companyDetail.CompanyPhone = $("#companyPhone").val();
    companyDetail.CompanyEmail = $("#companyEmail").val();
    companyDetail.MobileNumber = $("#mobileNumber").val();
    companyDetail.CompanySIte = $("#companySIte").val();
    companyDetail.AdminEmail = $("#adminEmail").val();
    companyDetail.AdminPassword = $("#adminPassword").val();
    companyDetail.adminConfirmPassword = $("#adminConfirmPassword").val();
    debugger;
    if (companyDetail.CompanyName != "" && companyDetail.CountryId != "0" && companyDetail.CompanyPhone != "" && companyDetail.AdminEmail != "" &&
        companyDetail.AdminPassword != "" && companyDetail.adminConfirmPassword != "" && companyDetail.CompanyEmail != "") {
        var companyDetails = JSON.stringify(companyDetail);
        // POSTING THE Education Details && HITTING THE Post Action.
        debugger;
        $.ajax({
            type: 'POST',
            url: '/SuperAdmin/CreateCompany', // we are calling json method
            data:
            {
                companyDetails: companyDetails
            },
            success: function (result) {
                if (!result.isError) {
                    successAlert(result.msg)
                    location.reload("Profile");
                }
                else {
                    errorAlert(result.msg);
                    location.url.reload("Profile");
                }

            },
            error: function (ex) {
                errorAlert(ex);
            }
        });
    }
    else {
       
        if (companyDetail.CompanyName === "") {
            $("#errorCompanyName").remove();
            $("#companyName").after('<p id="errorCompanyName" style="color:red"> This field is required</p>');
        } else {
            $("#errorCompanyName").remove();
        }
        if (companyDetail.Address === "") {
            $("#errorAddress").remove();
            $("#address").after('<p id="errorAddress" style="color:red"> This field is required</p>');
        } else {
            $("#errorAddress").remove();
        }
        if (companyDetail.CountryId === "0") {
            $("#errorCountryId").remove();
            $("#countryId").after('<p id="errorCountryId" style="color:red"> This field is required</p>');
        } else {
            $("#errorCountryId").remove();
        }
        if (companyDetail.StateId === "0") {
            $("#errorStateId").remove();
            $("#stateId").after('<p id="errorStateId" style="color:red"> This field is required</p>');
        } else {
            $("#errorStateId").remove();
        }
        if (companyDetail.CompanyPhone === "") {
            $("#errorCompanyPhone").remove();
            $("#companyPhone").after('<p id="errorCompanyPhone" style="color:red"> This field is required</p>');
        } else {
            $("#errorCompanyPhone").remove();
        }
        if (companyDetail.CompanyEmail === "") {
            $("#errorCompanyEmail").remove();
            $("#companyEmail").after('<p id="errorCompanyEmail" style="color:red"> This field is required</p>');
        } else {
            $("#errorCompanyEmail").remove();
        }
        if (companyDetail.AdminEmail === "") {
            $("#errorAdminEmail").remove();
            $("#adminEmail").after('<p id="errorAdminEmail" style="color:red"> This field is required</p>');
        } else {
            $("#errorAdminEmail").remove();
        }
        if (companyDetail.AdminPassword === "") {
            $("#errorAdminPassword").remove();
            $("#adminPassword").after('<p id="errorAdminPassword" style="color:red"> This field is required</p>');
        } else {
            $("#errorAdminPassword").remove();
        }
        if (companyDetail.adminConfirmPassword === "") {
            $("#errorAdminConfirmPassword").remove();
            $("#adminConfirmPassword").after('<p id="errorAdminConfirmPassword" style="color:red"> This field is required</p>');
        } else{
            $("#errorAdminConfirmPassword").remove();
        }
    }

}

function impersonateCompany() {
    var companyName = $("#compName").val();
    debugger;
    if (companyName != "" && companyName != "null") {
        $.ajax({
            type: 'POST',
            url: '/SuperAdmin/ImpersonateCompanyAdmin', // we are calling json method
           
            data:
            {
                companyName: companyName
            },
            success: function (result) {
                debugger;
                var Userurl = "/Admin/Index";
                if (!result.isError) {
                    $("#superAdminId").val(result.data);
                    newSuccessAlert(result.msg, Userurl)

                }
                else {
                    errorAlert(result.msg)
                }
            },
            error: function (ex) {
                errorAlert(ex);
            }
        });
    }
}

function endImpersonation() {
    debugger;
    $.ajax({
        type: 'POST',
        url: '/Admin/LogSuperAdminOut', // we are calling json method
        success: function (result) {
            debugger;
            var Userurl = "/SuperAdmin/Index";
            if (result != null) {
                newSuccessAlert("Session Ended", Userurl)
            }
            else {
                errorAlert("No Success")
            }
        },
        error: function (ex) {
            errorAlert(ex);
        }
    });

}
function editUserProfile(id) {
    debugger;
    $.ajax({
        type: 'GET',
        url: '/Employee/EditProfile', //we are calling json method
        dataType: 'json',
        data: { userId: id },
        success: function (data) {
            if (!data.isError)
            {
                debugger;
                $("#FNameId").val(data.data.firstName);
                $("#LNameId").val(data.data.lastName);
                $("#HobbyId").val(data.data.hobbies);
                $("#PhoneNumberId").val(data.data.phoneNumber);
                $("#addressId").val(data.data.address);
                $("#DobId").val(data.data.dateOfBirth);
            }
            else
            {
                errorAlert(result.msg);
            }
        }
    });
}
function submitEditedProfile() {
    var data = {};
    data.FirstName = $("#FNameId").val();
    data.Hobbies = $("#HobbyId").val();
    data.LastName = $("#LNameId").val();
    data.DateOfBirth = $("#DobId").val();
    data.PhoneNumber = $("#PhoneNumberId").val();
    data.Address = $("#addressId").val();
    debugger;
    $.ajax({
        type: 'POST',
        url: '/Employee/UpdateEditedProfile', //we are calling json method
        dataType: 'json',
        data: { info: data },
        success: function (result) {
            debugger;
            if (!result.isError) {
                var reloadLink = '/Employee/Profile';
                newSuccessAlert(result.msg, reloadLink);
            }
            else {
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            "Something went wrong, contact the support - " + errorAlert(ex);
        }
    });
}
function createProject() {
    debugger;
    var companyProjectViewModel = {};
    companyProjectViewModel.Name = $('#projectName').val();
    companyProjectViewModel.StartDate = $('#startDate').val();
    companyProjectViewModel.EndDate = $('#endDate').val();
    companyProjectViewModel.ProjectLeadId = $('#addProjectLeader').val();
    companyProjectViewModel.TeamMembers = $('#addTeamMemebers').val();
    companyProjectViewModel.Description = $('#description').val();
    if (companyProjectViewModel.Name != "" && companyProjectViewModel.Description != "" && companyProjectViewModel.StartDate != "") {
        let projectModel = JSON.stringify(companyProjectViewModel);
        $.ajax({
            type: 'Post',
            dataType: 'Json',
            url: '/Project/CreateProject',
            data: {
                companyProjectViewModel: projectModel
            },
            success: function (result) {
                debugger;
                if (!result.isError) {
                    var url = '/Project/Project';
                    successAlertWithRedirect(result.msg, url);
                }
                else {
                    errorAlert(result.msg);
                }
            },
            error: function (ex) {
                errorAlert("Error Occured,try again.");
            }
        });
    }
    else {
        errorAlert("Title & content is Required.");
    }
}
function projectToBeDeleted(id) {
    debugger;
    $("#deleteProduct").val(id);
}
function deleteProduct() {
    debugger;
    var projectDetails = {};
    projectDetails = $("#deleteProduct").val();
    $.ajax({
        type: 'Post',
        url: "/Project/DeleteProject",
        dataType: 'Json',
        data:
        {
            projectId: projectDetails
        },
        success: function (result) {
            debugger;
            if (!result.isError) {
                debugger;
                var url = "/Project/Product";
                newSuccessAlert(result.msg, url);

            } else {
                errorAlert(result.msg);
            }
        }
    });
}
function projectToBeEdited(id) {
    debugger;
    $(".dropdown-menu").empty();
    $.ajax({
        type: 'GET',
        url: '/Project/EditProduct',
        dataType: 'json',
        data:
        {
            projectId: id
        },
        success: function (result) {
            debugger;
            if (!result.isError) {
                debugger;
                $.each(result.drp, function (i, getdropdown) {
                    $(".dropdown-menu").append('<li>' + '<a role="option" class="dropdown-item" aria-disabled="false" tabindex="0" aria-selected="false">' + '<span class=" bs-ok-default check-mark"></span>' + '<span class="text">' + getdropdown.name + '</span>' + '</a>' + '</li>');
                    $("#editTeamMembers").append('<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
                    $("#editProjectLeader").append('<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
                });

                $("#projectId").val(result.data.id);
                $("#editProjectName").val(result.data.name);
                $("#editStartDate").val(result.data.startDate);
                $("#editEndDate").val(result.data.endDate);
                $("#editProjectDescription").val(result.data.description);
            }
            else {
                errorAlert(result.msg);
            }
        }
    });
}
function editProject() {
    debugger;
    var projectDetails = {};
    projectDetails.Id = $("#projectId").val();
    projectDetails.Name = $("#editProjectName").val();
    projectDetails.StartDate = $("#editStartDate").val();
    projectDetails.EndDate = $("#editEndDate").val();
    projectDetails.ProjectLead = $("#editProjectLeader").val();
    var teamMembers = $('#editTeamMembers').val();
    projectDetails.TeamMembers = JSON.stringify(teamMembers);
    projectDetails.Description = $("#editProjectDescription").val();
    if (projectDetails.Name != "" && projectDetails.ProjectLead != "" && projectDetails.Description != "") {
        let companyProjectViewModel = JSON.stringify(projectDetails);
        $.ajax({
            type: 'POST',
            url: '/Project/EditProduct',
            dataType: 'json',
            data:
            {
                companyProjectViewModel: companyProjectViewModel,
            },
            success: function (result) {
                debugger;
                if (!result.isError) {
                    var url = '/Project/Project';
                    successAlertWithRedirect(result.msg, url);
                }
                else {
                    errorAlert(result.msg);
                }
            },
            error: function (ex) {
                errorAlert(ex);
            }
        });
    }
}

function createTask(id)
{
    debugger;
    var file = document.getElementById("picture").files;
    var taskProjectViewModel = {};
    taskProjectViewModel.Title = $('#taskName').val();
    taskProjectViewModel.Description = $('#taskDescription').val();
    taskProjectViewModel.EndTime = $('#dueTime').val();
    taskProjectViewModel.Priority = $('#taskPriority').val();
    taskProjectViewModel.AssignedToId = $('#taskAssignedTo').val();
    if (file[0] == null) {
        if (taskProjectViewModel.Title != "" && taskProjectViewModel.Description != "" && taskProjectViewModel.AssignedToId != "") {
            let taskModel = JSON.stringify(taskProjectViewModel);
            $.ajax({
                type: 'Post',
                dataType: 'Json',
                url: '/Project/CreateTask',
                data:
                {
                    taskViewModel: taskModel,
                    projectId: id
                },
                success: function (result) {
                    debugger;
                    if (!result.isError) {
                        var url = '/Project/ProjectTask?projectId=' + result.data;
                        successAlertWithRedirect(result.msg, url);
                    }
                    else {
                        errorAlert(result.msg);
                    }
                },
                error: function (ex) {
                    errorAlert("Error Occured,try again.");
                }
            });
        }
        else {
            errorAlert("Title & content is Required.");
        }
    }
    else {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        var base64;
        reader.onload = function () {
            base64 = reader.result;
            debugger;
            if (base64 != "" || base64 != 0 && taskProjectViewModel.Title != "" && taskProjectViewModel.Description != "" && taskProjectViewModel.AssignedToId != "") {
                let taskModel = JSON.stringify(taskProjectViewModel);
                $.ajax({
                    type: 'Post',
                    dataType: 'Json',
                    url: '/Project/CreateTask',
                    data:
                    {
                        taskViewModel: taskModel,
                        projectId: id,
                        imageUrl: base64
                    },
                    success: function (result) {
                        debugger;
                        if (!result.isError) {
                            var url = '/Project/ProjectTask?projectId=' + result.data;
                            successAlertWithRedirect(result.msg, url);
                        }
                        else {
                            errorAlert(result.msg);
                        }
                    },
                    error: function (ex) {
                        errorAlert("Error Occured,try again.");
                    }
                });
            }
            else {
                errorAlert("Title & content is Required.");
            }
        }
    }
    
}