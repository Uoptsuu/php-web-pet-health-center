//console.log("token="+sessionStorage.getItem('token')); 
function loadDataCategoryNews(data) {
    var categoryNewsData = "";
    data.forEach(element => {
        categoryNewsData += "<li class='list-group-item d-flex justify-content-between align-items-center'>"
        categoryNewsData += "<a class='text-dark mb-2' href='?controller=news&action=news_page&category-news="+ element.cn_id +"'>" + element.cn_name + "</a>"
        categoryNewsData += "<span class='badge badge-primary badge-pill'>HOT</span>"
        categoryNewsData += "</li>"
    });
    $('.list-category-news').append(categoryNewsData);
}

function loadDataNews(data) {
    $('.news-title').append(data.news_title);
    $('.category-news').append(data.cn_name);
    $('.news-content').append(data.news_content);
    $('.news-date-release').append(data.news_date_release);
    $('.news-img').attr("src",data.news_img);
}

function loadDataRecentNews(data) {
    var recentNewsData = "";
    data.forEach(element => {
        recentNewsData += "<div class='d-flex align-items-center border-bottom mb-3 pb-3'>"
        recentNewsData += "<img class='img-fluid' src='"+ element.news_img +"' style='width: 30%; height: 30%;' alt=''>"
        recentNewsData += "<div class='d-flex flex-column pl-3'>"
        recentNewsData += "<a class='text-dark mb-2' href='?controller=news&action=detail_news&id=" + element.news_id + "'>" + element.news_title + "</a>"
        recentNewsData += "<div class='d-flex'>"
        recentNewsData += "<small class='mr-3'><i class='fa fa-user text-muted'></i> Admin</small>"
        //recentNewsData += "<small class='mr-3'><i class='fa fa-folder text-muted'></i> " + element.cn_id + "</small>"
        recentNewsData += "<small class='mr-3'><i class='fa fa-calendar text-muted'></i> " + element.news_date_release.substring(0,10) + "</small>"
        recentNewsData += "</div>"
        recentNewsData += "</div>"
        recentNewsData += "</div>"
    });
    $('.recent-news').append(recentNewsData);
}

$(document).ready(function () {
    
    loadDataShop();

    $.ajax({
        type: 'GET',
        url: '?controller=news&action=data_detail_news',
        data: {
            idNews: new URLSearchParams(document.location.href).get('id')
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.responseCode == responseCode.success) {
                document.title = response.data.news.news_title;
                loadDataNews(response.data.news);
            } else if (response.responseCode == responseCode.dataEmpty) {
                document.title = "Không tìm thấy thông tin phù hợp";
                $('#detail-news').html("<p style='margin:auto; margin-bottom:20px; color:black; font-size:20px; color:red; font-weight:bold'>Tin tức trống.</p>");
            } else alert(response.responseCode + ": " + response.message + "Vui lòng thử lại sau ít phút.");
        },
        error: function (xhr) {
            alert("ER: Hệ thống gặp sự cố, vui lòng thử lại sau ít phút. Chi tiết lỗi: " + xhr.responseText + ", " + xhr.status + ", " + xhr.error);
        }
    })

    $.ajax({
        type: 'GET',
        url: '?controller=categorynews&action=data_category_news',
        dataType: 'json',
        success: function (response) {
            //console.log(response);
            if (response.responseCode == responseCode.success) {
                loadDataCategoryNews(response.data.categoryNews);
            } else if (response.responseCode != responseCode.dataEmpty) alert(response.responseCode + ": " + response.message + "Vui lòng thử lại sau ít phút.");
        },
        error: function (xhr) {
            alert("ER: Hệ thống gặp sự cố, vui lòng thử lại sau ít phút. Chi tiết lỗi: " + xhr.responseText + ", " + xhr.status + ", " + xhr.error);
        }
    })

    $.ajax({
        type: 'GET',
        url: '?controller=news&action=data_news',
        data: {
            limit: 3
        },
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.responseCode == responseCode.success) {
                loadDataRecentNews(response.data.news);
            } else alert("RES: " + response.responseCode + ": " + response.message + "Vui lòng thử lại sau ít phút.");
        },
        error: function (xhr) {
            alert("ER: Hệ thống gặp sự cố, vui lòng thử lại sau ít phút. Chi tiết lỗi: " + xhr.responseText + ", " + xhr.status + ", " + xhr.error);
        }
    })

})