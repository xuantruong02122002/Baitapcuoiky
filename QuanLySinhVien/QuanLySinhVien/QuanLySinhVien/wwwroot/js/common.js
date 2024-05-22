function configDateMask() {
    $(".input-date-mask").inputmask({
        alias: "datetime",
        inputFormat: "dd-mm-yyyy",
        placeholder: "__-__-____",
    });
}

function configDateTimeMask() {
    $(".input-date-time-mask").inputmask({
        alias: "datetime",
        inputFormat: "dd-mm-yyyy HH:MM",
        placeholder: "__-__-____ __:__",
    });
}
function formatPhoneNumber() {
    // Áp dụng inputmask cho các phần tử có lớp 'formatted-phone-number'
    $(".phone").inputmask({
        mask: "9999 999 999",
        allowMinus: false, // Chắc chắn không cho phép dấu trừ
        allowPlus: false, // Chắc chắn không cho phép dấu cộng
        onBeforeMask: function (value, opts) {
            // Xử lý giá trị trước khi áp dụng mask (nếu cần)
            return value;
        },
    });
}
function configTimeMask() {
    $(".input-time-mask").inputmask({
        alias: "datetime",
        inputFormat: "HH:MM",
        placeholder: "__:__",
    });
}
function showModalDanger(content) {
    var myModal = new bootstrap.Modal(
        document.getElementById("modal-danger"),
        {}
    );
    $("#modal-danger-content").text(content);
    myModal.show();
}
// hiện modal cảnh báo
function showModalWarning(content) {
    var myModal = new bootstrap.Modal(
        document.getElementById("modal-warning"),
        {}
    );
    $("#modal-warning-content").text(content);
    myModal.show();
}
var modalDanger = document.getElementById("modal-danger");
if (modalDanger) {
    modalDanger.addEventListener("hidden.bs.modal", function (event) {
        $("#btnDanger").off("click");
    });
}
// Hiện modalFullWidth từ layout
function showModalFullWidth(title, content) {
    $("#modal-title-fullwidth").html(title);
    $("#modal-body-fullwidth").empty();
    $("#modal-body-fullwidth").html(content);
    $("#modal-full-width").modal("show");
}
function hideModalFullWidth() {
    $("#modal-full-width").modal("hide");
}
var modalFullWidth = document.getElementById("modal-full-width");
if (modalFullWidth) {
    modalFullWidth.addEventListener("hidden.bs.modal", function (event) {
        $("#modal-body-fullwidth")
            .find("select")
            .each(function () {
                if ($(this)[0].tomselect) {
                    $(this)[0].tomselect.destroy();
                }
            });

        $("#modal-body-fullwidth").empty();
        $("#modal-title-fullwidth").text("");
        $(this).find("*").off();
    });
}

function showModalFullScreen(title, content) {
    $("#modal-title-fullscreen").text(title);
    $("#modal-body-fullscreen").empty();
    $("#modal-body-fullscreen").html(content);
    $("#modal-full-screen").modal("show");
}
var modalFullWidth = document.getElementById("modal-full-width");
if (modalFullWidth) {
    modalFullWidth.addEventListener("hidden.bs.modal", function (event) {
        $("#modal-body-fullscreen").empty();
        $("#modal-title-fullscreen").text("");
        $(this).find("*").off();
    });
}

// Hiện modalLargel từ layout
function showModalLargel(title, content) {
    var myModal = new bootstrap.Modal(
        document.getElementById("modal-largel"),
        {}
    );
    $("#modal-title-largel").text(title);
    $("#modal-body-largel").empty();
    $("#modal-body-largel").append(content);
    myModal.show();
}
function emptyModalLargel(title, content) {
    $("#modal-title-largel").text(title);
    $("#modal-body-largel").empty();
    $("#modal-body-largel").append(content);
}
function hideModalLargel() {
    $("#modal-largel").modal("hide");
}

var modalLargel = document.getElementById("modal-largel");
if (modalLargel) {
    modalLargel.addEventListener("hidden.bs.modal", function (event) {
        $("#modal-body-largel").empty();
        $("#modal-title-largel").text("");
        $("#formUpdate").removeClass("was-validated");
    });
}
function showProgress() {
    $("#progress").show();
}
//Ẩn quá trình tải trang
function hideProgress() {
    $("#progress").hide();
}
function showToast(message, statusCode) {
    var backgrounColor;
    document.getElementById("toast").className =
        "toast align-items-center text-white border-0 position-fixed top-0 end-0 p-3";
    $("#toastContent").text(message);
    if (statusCode === 200) {
        backgrounColor = "bg-success";
        $("#toast").addClass(backgrounColor);
    } else {
        backgrounColor = "bg-danger";
        $("#toast").addClass(backgrounColor);
    }
    $("#toast").show();
    setTimeout(function () {
        $("#toast").hide();
    }, 2000);
}
function showToastWithBg(message, statusCode, backgrounColor) {
    document.getElementById("toast").className =
        "toast align-items-center text-white border-0 position-fixed top-0 end-0 p-3";
    $("#toastContent").text(message);
    $("#toast").addClass(backgrounColor);
    $("#toast").show();
    setTimeout(function () {
        $("#toast").hide();
        $("#toast").removeClass(backgrounColor);
    }, 5000);
}
function clearFormTimKiem() {
    $("#formSearch");
    var form = $("#formSearch");
    // các input text = ""
    form.find('input[type="text"].form-control').val("");
    form.find('input[type="number"].form-control').val("");
    form.find('input[type="email"].form-control').val("");
    form.find('input[tyoe="hidden"]').val("");
    form.find("textarea").text("");
    form.find("textarea").val("");

    form.find('input[type="text"].form-control.input-date-time').val("");
    form
        .find('input[type="text"].form-control.input-date-time')
        .val(getDateTimeNow());

    form.find('input[type="text"].form-control.input-date').val("");
    form
        .find('input[type="text"].form-control.input-date-default')
        .val(getDateNow());
    form
        .find('input[type="text"].form-control.input-date-time-default')
        .val(getDateTimeNow());
    var selects = document
        .getElementById("formSearch")
        .querySelectorAll("select");

    selects.forEach(function (select) {
        if (select.tomselect) {
            select.tomselect.clear();
        } else {
            select.selectedIndex = 0;
        }
    });
    form
        .find('input[type="checkbox"]')
        .prop("checked", false)
        .trigger("change");
    form.find('input[type="checkbox"]').val("false");
    var selectElement = form.find($(".form-select[name='Active']"));
    selectElement.find("option[value='true']").prop("selected", true);
}
function getDateTimeNow() {
    // Lấy ngày giờ hiện tại
    var currentDate = new Date();

    // Lấy các thành phần ngày, tháng, năm, giờ và phút
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần +1 để đúng
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    // Chuyển đổi thành định dạng "dd-MM-yyyy HH:mm"
    return (
        ("0" + day).slice(-2) +
        "-" +
        ("0" + month).slice(-2) +
        "-" +
        year +
        " " +
        ("0" + hours).slice(-2) +
        ":" +
        ("0" + minutes).slice(-2)
    );
}
function getDateNow() {
    // Lấy ngày giờ hiện tại
    var currentDate = new Date();

    // Lấy các thành phần ngày, tháng và năm
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Ghi chú: Tháng trong JavaScript bắt đầu từ 0
    var year = currentDate.getFullYear();

    // Định dạng chuỗi ngày tháng
    return (
        (day < 10 ? "0" : "") +
        day +
        "-" +
        (month < 10 ? "0" : "") +
        month +
        "-" +
        year
    );
}
function configDate() {
    $(".input-date").datetimepicker({
        locale: "vi",
        format: "DD-MM-yyyy",
        useStrict: true,
        widgetPositioning: {
            horizontal: "auto",
            vertical: "bottom",
        },
        extraFormats: ["DD-MM-yyyy", "DD/MM/yyyy", "yyyy"],
        icons: {
            date: "ti ti-calendar",
            up: "ti ti-chevron-up",
            down: "ti ti-chevron-down",
            previous: "ti ti-chevron-left",
            next: "ti ti-chevron-right",
            time: "ti ti-alarm",
        },
        keyBinds: {
            left: null,
            right: null,
        },
    });
}
function formatDay(inputString) {
    if (inputString) {
        var inputDate = new Date(inputString);
        var day = inputDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var month = inputDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var year = inputDate.getFullYear();
        return day + "-" + month + "-" + year;
    } else {
        return "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    configDateMask();
});