const { error, data } = require("jquery");

function SubmitUser()
{
    debugger;
    var data = {};
    data.Email = $("#email").val();
    data.Password = $("#password").val();
    data.RepeatPassword = $("#repeatpassword").val();

    if (data.Email != "" && data.Password != "" && data.RepeatPassword != "")
    {
        let applicationUserViewModel = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            dataType: 'Json',
            url: '/Account/Register',
            data:
            {
                applicationUserViewModel: applicationUserViewModel
            },
            success: function (result) {
                debugger;
               /* $("#loader").fadeOut(3000);*/

                if (!result.isError) {
                    var url = '/Account/Login';
                    newSuccessAlert(result.msg, url);
                    /*successAlertWithRedirect(result.msg, url);*/

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
    else {
        errorAlert("Please,Enter Email,Password & Confirm Password To Continue");
    }
}


function LoginUser()
{
    debugger;
    var data = {};
    data.Email = $("#email").val();
    data.Password = $("#password").val();
    data.rememberme = $("#rememberme").val();
    if (data.Email != "" && data.Password != "" && data.rememberme != "")
    {
        let applicationViewModel = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            dataType: 'Json',
            url: '/Account/Login',
            data:
            {
                applicationViewModel: applicationViewModel
            },
            success: function (result) {
                debugger;
                /* $("#loader").fadeOut(3000);*/

                if (!result.isError) {
                    var url = '/Account/Index';
                    /* successAlertWithRedirect(result.msg, url);*/
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
    else
    {
        errorAlert("Please,Enter Email,Password & Confirm Password To Continue");
    }
}

function SubmitAdmin(){
    debugger;
    var data = {};
    data.Email = $("#email").val();
    data.Password = $("#password").val();
    data.RepeatPassword = $("#repeatpassword").val();

    if (data.Email != "" && data.Password != "" && data.RepeatPassword != "") {
        let applicationUserViewModel = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            dataType: 'Json',
            url: '/Account/RegisterAdmin',
            data:
            {
                applicationUserViewModel: applicationUserViewModel
            },
            success: function (result) {
                debugger;
                /* $("#loader").fadeOut(3000);*/

                if (!result.isError) {
                    var url = '/Account/Login';
                    successAlert(result.msg);
                    /*successAlertWithRedirect(result.msg, url);*/

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
    else {
        errorAlert("Please,Enter Email,Password & Confirm Password To Continue");
    }
}

function CreateProfile() {
    debugger;
    var data = {}; 
    data.FirstName = $("#firstname").val();
    data.LastName = $("#lastname").val(); 
    data.Email = $("#email").val();
    data.Address = $("#address").val();
    data.PostalCode = $("#postalcode").val();
    data.PhoneNumber = $("#phoneNumber").val()
    data.Nationality = $("#Nationality").val();
    data.State = $("#state").val();
    var Picture = $("#image").val();
    var profilePicture = document.getElementById('image').files;
    const reader = new FileReader();
    reader.readAsDataURL(profilePicture[0]);
    var base64 = '';
    reader.onload = function () {
        base64 = reader.result;
        debugger;
        if (base64 != null) {
            if (data.Email != "" && data.FirstName != "" && data.PhoneNumber != "") {
                let applicationUserViewModel = JSON.stringify(data);
                $.ajax({
                    type: 'POST',
                    dataType: 'Json',
                    url: '/AdminUser/AdminProfile',
                    data:
                    {
                        applicationUserViewModel: applicationUserViewModel,
                        base64 : base64
                    },
                    success: function (result) {
                        debugger;
                        /* $("#loader").fadeOut(3000);*/

                        if (!result.isError) {
                            var url = '/Account/Login';
                            successAlert(result.msg);
                            /*successAlertWithRedirect(result.msg, url);*/

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
            else {
                errorAlert("Please,Enter Email,Password & Confirm Password To Continue");
            }
        }
    }
}

function SaveLogo() {
    debugger;
    var newImage = document.getElementById("newlogo").files;
    var companyId = $("#companyId").val();
    if (newImage != "") {
        const reader = new FileReader();
        reader.readAsDataURL(newImage[0]);
        var base64;
        reader.onload = function () {
            base64 = reader.result;
            debugger;
            if (base64 != "") {
                $.ajax({
                    type: 'POST',
                    dataType: 'Json',
                    url: '/AdminUser/SaveAdminLogo',
                    data:
                    {
                        base64: base64,
                        companyId: companyId
                    },
                    success: function (result) {
                        debugger;
                        if (!result.isError) {
                            /*   var url = '/Company/CompanyProfile';*/
                            successAlertWithRedirect(result.msg, result.url);
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
                errorAlert("Name & Address Field is Required.");
            }
        }
    }
}

function submitCompanyProfile(id) {
    debugger;
    $.ajax({
        type: 'JSON',
        dataType: 'GET',
        url: '/AdminUser/Update',
        data: { id: id },
        success: function (data) {
            debugger;

            if (!data.isError) {
                debugger;
                $('#firstname').val(result.data.firstName);
                $('#lastname').val(result.data.lastName);
                $('#email').val(result.data.email);
                $('#address').val(result.data.Address);
                $('#postalcode').val(result.data.postalCode);
                $('#phoneNumber').val(result.data.phoneNumber);
                $('#Nationality').val(result.data.nationality);
                $('#state').val(result.data.state);
                $('#image').val(result.data.profilePicture);
            }
        },
        error: function (ex) {
            errorAlert("Error Occured,try again.");
        }
    });
}