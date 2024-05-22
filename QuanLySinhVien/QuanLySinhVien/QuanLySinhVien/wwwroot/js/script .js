/*Start On top */

var btn = $('#button');

$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});

/* End On top*/

/* Start Dark mode */
const toggleButton = document.getElementById("toggle-button")

toggleButton.addEventListener("change", () => {
    document.body.classList.toggle("dark")
})
/* End Dark mode */

/*Start pikaday NgaySinh modal*/
document.addEventListener("DOMContentLoaded", function () {
    var picker = new Pikaday({
        field: document.getElementById("Ngaysinh"),
        format: "DD-MM-YYYY",
        yearRange: [1900, moment().year()],
        i18n: {
            previousMonth: "Tháng trước",
            nextMonth: "Tháng sau",
            months: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
            ],
            weekdays: [
                "Chủ nhật",
                "Thứ hai",
                "Thứ ba",
                "Thứ tư",
                "Thứ năm",
                "Thứ sáu",
                "Thứ bảy",
            ],
            weekdaysShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        },
        yearSuffix: "",
    });

});
/*End pikaday NgaySinh modal*/


/*Start pikaday Edit-NgaySinh modal*/
document.addEventListener("DOMContentLoaded", function () {
    var picker = new Pikaday({
        field: document.getElementById("edit-Ngaysinh"),
        format: "DD-MM-YYYY",
        yearRange: [1900, moment().year()],
        i18n: {
            previousMonth: "Tháng trước",
            nextMonth: "Tháng sau",
            months: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
            ],
            weekdays: [
                "Chủ nhật",
                "Thứ hai",
                "Thứ ba",
                "Thứ tư",
                "Thứ năm",
                "Thứ sáu",
                "Thứ bảy",
            ],
            weekdaysShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        },
        yearSuffix: "",
    });

});
/*End pikaday NgaySinh modal*/