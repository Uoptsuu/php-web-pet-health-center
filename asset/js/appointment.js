$(document).ready(function () {

    loadDataShop();

    if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != '') {
        $.ajax({
            type: 'GET',
            url: '?controller=categoryservice&action=data_category_service',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                if (response.responseCode == responseCode.success) {
                    var categoryServiceData = "";
                    response.data.categoryService.forEach(element => {
                        categoryServiceData += "<option value='" + element.cs_id + "'>" + element.cs_name + "</option>"
                    });
                    $('#category-service').append(categoryServiceData);
                } else alert("RES: " + response.responseCode + ": " + response.message + "Vui lòng thử lại sau ít phút.");
            },
            error: function (xhr) {
                alert("ER: Hệ thống gặp sự cố, vui lòng thử lại sau ít phút. Chi tiết lỗi: " + xhr.responseText + ", " + xhr.status + ", " + xhr.error);
            }
        });
    }

    $('#form-booking').submit(function (e) {
        if ($('#apm-date').val() != '' && $('#apm-time').val() != ''  && $('#category-service').val() != '') {
            $.ajax({
                type: 'POST',
                url: '?controller=appointment&action=booking',
                data: {
                    token: sessionStorage.getItem('token'),
                    apmDate: $('#apm-date').val(),
                    apmTime: $('#apm-time').val(),
                    apmNote: $('#apm-note').val(),
                    categoryService: $('#category-service').val()
                },
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if (response.responseCode == responseCode.success) {
                        $('#form-booking')[0].reset();
                        $('#msg-booking').html("Đặt lịch thành công.");
                        $('#msg-booking').addClass('alert-success');
                        $('#msg-booking').show();
                        window.setTimeout(function () {
                            $('#msg-booking').removeClass('alert-success');
                            $('#msg-booking').hide()
                        }, 3000);
                    } else if (response.responseCode == responseCode.dataEmpty || response.responseCode == responseCode.inputInvalidType) {
                        $('#msg-booking').html(response.message);
                        $('#msg-booking').addClass('alert-danger');
                        $('#msg-booking').show();
                        window.setTimeout(function () {
                            $('#msg-booking').removeClass('alert-danger');
                            $('#msg-booking').hide()
                        }, 3000);
                    } else alert("RES: " + response.responseCode + ": " + response.message + "Vui lòng thử lại sau ít phút.");
                },
                error: function (xhr) {
                    alert("ER: Hệ thống gặp sự cố, vui lòng thử lại sau ít phút. Chi tiết lỗi: " + xhr.responseText + ", " + xhr.status + ", " + xhr.error);
                }
            })
        } else {
            $('#msg-booking').html('CLI: Vui lòng nhập đầy đủ thông tin.');
            $('#msg-booking').addClass('alert-danger');
            $('#msg-booking').show();
            window.setTimeout(function () {
                $('#msg-booking').removeClass('alert-danger');
                $('#msg-booking').hide()
            }, 3000);
        }
        e.preventDefault();
    })
})