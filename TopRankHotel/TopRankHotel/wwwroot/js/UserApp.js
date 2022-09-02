//$(document).ready(function () {
//	debugger;
//	$("#example").DataTable();
//});

//function confirmDelete(id) {
//	$("#deleteId").val(id);
//}

//function deleteInfo() {
//	debugger;
//	var id = $("#deleteId").val();
//	if (id != "") {
//		$.ajax({
//			type:'POST',
//			url: '/Admin/Delete',
//			data: { id: id },
//			success: function (result) {
//				if (!result.isError) {
//					successAlert(result.msg);
//				}
//				else {
//					errorAlert(result.msg);
//				}
//			}
//		});
//	}
//}

$(document).ready(function () {
	$("#myInput").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#myTable tr").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});

function submit() {
    debugger;
    var file = document.getElementById("image").files;
    var register = {};
    debugger;
    register.FirstName = $('#firstName').val();
    register.MiddleName = $('#middleName').val();
    register.LastName = $('#LastName').val();
    register.PhoneNumber = $('#PhoneNumber').val();
    register.Email = $('#Email').val();
    register.NextOfKin = $('#NextOfKin').val();
    register.Password = $('#Password').val();
    register.Nationality = $('#Nationality').val();
    register.State = $('#State').val();
    register.LGAOfOrigin = $('#LGAOfOrigin').val();
    register.MaritalStatus = $('#MaritalStatus').val();
    register.ConfirmPassword = $('#ConfirmPassword').val();
    if (file[0] == null)
    {
        if (Password != ConfirmPassword) {
            let userData = JSON.stringify(register);
            var base64;
            $.ajax({
                type: 'POST',
                dataType: 'Json',
                url: '/Admin/AdminRegister',
                data:
                {
                    base64: base64,
                    model: userData
                },
                success: function (result) {
                    debugger;
                    if (!result.isError) {
                        var url = '/Admin/Index';
                        /* successAlertWithRedirect(result.msg, url);*/
                        successAlert(result.msg, url);
                    }
                    else {
                        errorAlert(result.msg);
                    }
                },
                error: function (ex) {
                    errorAlert("Error Occured,try again.");
                    location.reload();
                }
            });

        }
        else {
            errorAlert("Incorrect password.!");
		}

    }
    else
    {
        const reader = new FileReader();
        reader.readAsDataURL(file[0]);
        var base64;
        reader.onload = function () {
            base64 = reader.result;
            debugger;
            if (base64 != "" || base64 != 0) {

                if (Password != ConfirmPassword)
                {
                    let userData = JSON.stringify(register);
                    $.ajax({
                        type: 'POST',
                        dataType: 'Json',
                        url: '/Admin/AdminRegister',
                        data:
                        {
                            base64: base64,
                            model: userData
                        },
                        success: function (result) {
                            debugger;
                            if (!result.isError) {
                                var url = '/Admin/Index';
                                /*successAlertWithRedirect(result.msg, url);*/
                                successAlert(result.msg, url);
                            }
                            else {
                                errorAlert(result.msg);
                            }
                        },
                        error: function (ex) {
                            errorAlert("Error Occured,try again.");
                            location.reload();
                        }
                    });
                }
                else
                {
                    errorAlert("Incorrect password.!");
				}
            }
            else {
                errorAlert("Please ensure to fill the required fields to continue.");
            }
        }
    }
}

