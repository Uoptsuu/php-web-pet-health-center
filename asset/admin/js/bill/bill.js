const limitBillPage = 5;

var billId = new URLSearchParams(document.location.href).get("bill-id") || '';
var ctmPhone = new URLSearchParams(document.location.href).get("ctm-phone") || "";
var billDate = new URLSearchParams(document.location.href).get("bill-date") || "";
var billMonth = new URLSearchParams(document.location.href).get("bill-month") || "";
var billYear = new URLSearchParams(document.location.href).get("bill-year") || "";
var billStatus = new URLSearchParams(document.location.href).get("bill-status") || "";

url = "?controller=bill&action=bill_page_ad";

function loadPaging(index, endPage) {
    index = parseInt(index);
    endPage = parseInt(endPage);
    page = "";
    page += "   <div class='col-lg-12'>";
    page += "   <nav aria-label='Page navigation'>";
    page += "   <ul class='pagination justify-content-center mb-4'>";
    page += "   <li class='page-item head'>";
    page +=
        "       <a class='page-link'  style='cursor:pointer' onclick='loadDataPage(" +
        1 +
        ")'>";
    page += "       <span aria-hidden='true'>&laquo; Trang đầu</span>";
    page += "       </a>";
    page += "   </li>";

    page += "   <li class='page-item head' id='previous'>";
    page +=
        "       <a class='page-link'  style='cursor:pointer' aria-label='Previous' onclick='loadDataPage(" +
        (index - 1) +
        ")'>";
    page += "       <span aria-hidden='true'>&laquo; Trước</span>";
    page += "       </a>";
    page += "   </li>";

    if (index > 2) {
        page +=
            "   <li class='page-item'><a class='page-link' style='cursor:pointer'  onclick='loadDataPage(" +
            (index - 2) +
            ")'>" +
            (index - 2) +
            "</a></li>";
        page +=
            "   <li class='page-item'><a class='page-link' style='cursor:pointer' onclick='loadDataPage(" +
            (index - 1) +
            ")'>" +
            (index - 1) +
            "</a></li>";
    } else if (index > 1) {
        page +=
            "   <li class='page-item'><a class='page-link' style='cursor:pointer' onclick='loadDataPage(" +
            (index - 1) +
            ")'>" +
            (index - 1) +
            "</a></li>";
    }
    page +=
        "   <li class='page-item active'><a class='page-link' style='cursor:pointer' onclick='loadDataPage(" +
        index +
        ")'>" +
        index +
        "</a></li>";
    for (let i = index + 1; i <= endPage; i++) {
        page +=
            "    <li class='page-item'><a class='page-link' style='cursor:pointer'  onclick='loadDataPage(" +
            i +
            ")'>" +
            i +
            "</a></li>";
        if (i == index + 3) break;
    }

    page += "    <li class='page-item foot' id='next'>";
    page +=
        "        <a class='page-link'  aria-label='Next' style='cursor:pointer' onclick='loadDataPage(" +
        (index + 1) +
        ")'>";
    page += "         <span aria-hidden='true'>Sau &raquo;</span>";
    page += "        </a>";
    page += "     </li>";

    page += "   <li class='page-item foot'>";
    page +=
        "       <a class='page-link'  style='cursor:pointer' onclick='loadDataPage(" +
        endPage +
        ")'>";
    page += "       <span aria-hidden='true'>Trang cuối &raquo;</span>";
    page += "       </a>";
    page += "   </li>";
    page += "     </ul>";
    page += " </nav>";
    page += " </div> ";
    $("#page").html(page);
    // if (index <= 1) $("#previous").addClass("disabled");
    // if (index >= endPage) $("#next").addClass("disabled");
    if (index <= 1) $(".head").addClass("disabled");
    if (index >= endPage) $(".foot").addClass("disabled");
}

function loadDataPage(page){
    $.ajax({
        type: "GET",
        url: "?controller=bill&action=data_bill",
        data: {
            billId: billId,
            billDate: billDate,
            ctmPhone: ctmPhone,
            billMonth: billMonth,
            billYear: billYear,
            billStatus: billStatus,
            index: page,
            limit: limitBillPage,
            token: sessionStorage.getItem("token")
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response.responseCode == responseCode.success) {
                param = "";
                if (billId != null && billId != "") param += "&bill-id=" + billId;
                if (ctmPhone != null && ctmPhone != "")
                    param += "&ctm-phone=" + ctmPhone;
                if (billDate != null && billDate != "") param += "&bill-date=" + billDate;
                if (billMonth != null && billMonth != "") param += "&bill-month=" + billMonth;
                if (billYear != null && billYear != "") param += "&bill-year=" + billYear;
                if (billStatus != null && billStatus != "") param += "&bill-status=" + billStatus;
                if (page > 1) {
                    window.history.pushState(null, "", url + param + "&page=" + page);
                } else window.history.pushState(null, "", url + param);
                loadDatabill(response.data.bills);
                loadPaging(page, Math.ceil(response.data.count / limitBillPage));
            } else if (response.responseCode == responseCode.dataEmpty) {
                window.history.pushState(null, "", url);
                $("#page").html("");
                $("#data-bill").html(
                    "<p style='font-size:20px; color:red; font-weight:bold; text-align:center'>Thông tin trống.</p>"
                );
            } else
                alert(
                    "RES: " +
                    response.responseCode +
                    ": " +
                    response.message +
                    "Vui lòng thử lại sau ít phút."
                );
        },
        error: function (xhr) {
            alert(
                "ER: Hệ thống gặp sự cố, vui lòng thử lại sau ít phút. Chi tiết lỗi: " +
                xhr.responseText +
                ", " +
                xhr.status +
                ", " +
                xhr.error
            );
        },
    });
}

function loadDatabill(data){
    var billData = "";
    data.forEach((element) => {
        statusBill = element.bill_status == statusObject.active ? "Đã thanh toán" : "Chưa thanh toán";
        discountCode = element.dc_code != null ? element.dc_code : "";
        billData += "<tr>";
        billData += "<th scope='row'>" + element.bill_id + "</th>";
        billData += "<td>" + element.bill_date_release + "</td>";
        billData += "<td>" + element.ad_username + "</td>";
        billData += "<td>" + element.ctm_phone + " - " + element.ctm_name + "</td>";
        billData += "<td>" + discountCode + "</td>";
        billData += "<td>" + new Intl.NumberFormat("vi-VN", {style: "currency",currency: "VND",}).format(element.sub_total) + "</td>";
        billData += "<td>" + new Intl.NumberFormat("vi-VN", {style: "currency",currency: "VND",}).format(element.value_reduced) + "</td>";
        billData += "<td>" + new Intl.NumberFormat("vi-VN", {style: "currency",currency: "VND",}).format(element.total_value) + "</td>";
        billData += "<td>" + statusBill + "</td>";
        billData += "<td><a class='btn btn-primary' href='?controller=bill&action=bill_edit_page&bill="+ element.bill_id +"' >Chi tiết</a></td>";
        billData += "</tr>";
    });
    $("#data-bill").html(billData);
}

function resetAddForm() {
    $("#form-add-bill")[0].reset();
}

$(document).ready(function(){

    indexPage = new URLSearchParams(document.location.href).get("page");

    indexPage = indexPage != null && indexPage != 1 ? indexPage : 1;

    loadDataPage(indexPage);

    $("#form-add-bill").submit(function (e) {
        ctmPhoneAdd = $("#ctm-phone-add").val().trim();
        if (ctmPhoneAdd == "" ) {
            $("#msg-bill-add").html("CLI: Thông tin không được bỏ trống.");
            $("#msg-bill-add").addClass(" alert-danger");
            $("#msg-bill-add").show();
            window.setTimeout(function () {
                $("#msg-bill-add").hide();
                $("#msg-bill-add").removeClass(" alert-danger");
            }, 3000);
            return false;
        } 
        if (!regNumber.test(ctmPhoneAdd)) {
            $("#msg-bill-add").html("CLI: Số điện thoại không hợp lệ.");
            $("#msg-bill-add").addClass(" alert-danger");
            $("#msg-bill-add").show();
            window.setTimeout(function () {
                $("#msg-bill-add").hide();
                $("#msg-bill-add").removeClass(" alert-danger");
            }, 3000);
            return false;
        }
        $.ajax({
            type: "POST",
            url: "?controller=bill&action=add_bill",
            data: {
                ctmPhone: ctmPhoneAdd,
                token: sessionStorage.getItem("token")
            },
            dataType: "json",
            success: function (response) {
                //console.log(response);
                if (response.responseCode == responseCode.success) {
                    $("#msg-bill-add").html("CLI: Thêm hoá đơn thành công.");
                    $("#msg-bill-add").addClass(" alert-success");
                    $("#msg-bill-add").show();
                    $("#form-add-bill")[0].reset();
                    window.setTimeout(function () {
                        $("#msg-bill-add").hide();
                        $("#msg-bill-add").removeClass(" alert-success");
                    }, 3000);
                    loadDataPage(1);
                } else {
                    $("#msg-bill-add").html(response.message);
                    $("#msg-bill-add").addClass(" alert-danger");
                    $("#msg-bill-add").show();
                    window.setTimeout(function () {
                        $("#msg-bill-add").hide();
                        $("#msg-bill-add").removeClass(" alert-danger");
                    }, 3000);
                }
            },
            error: function (xhr) {
                alert(
                    "ER: Hệ thống gặp sự cố, vui lòng thử lại sau ít phút. Chi tiết lỗi: " +
                    xhr.responseText +
                    ", " +
                    xhr.status +
                    ", " +
                    xhr.error
                );
            },
        });
        e.preventDefault();
    });

    $("#form-search-bill").submit(function (e) {
        billId = $("#bill-id").val().trim();
        ctmPhone = $("#ctm-phone").val().trim();
        billDate = $("#date-bill").val().trim();
        billMonth = $("#month-bill").val().trim();
        billYear = $("#year-bill").val().trim();
        billStatus = $("#bill-status").val().trim();
        loadDataPage(1);
        e.preventDefault();
    });

})