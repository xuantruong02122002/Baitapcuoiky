
/*function fetchClassNamesFromDatabase() {
    const apiUrl = "https://localhost:7069/api/LopsApi";

    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                const select = new TomSelect(".select-links", {
                    valueField: "malop",
                    searchField: ["malop"],
                    allowEmptyOption: true,
                    options: data,
                    render: {
                        option: function (data, escape) {
                            return (
                                '<div class="d-flex justify-content-between">' +
                                '<span class="title">[' + escape(data.malop) + ']</span>' +
                                '<span class="title">' + escape(data.tenlop) + '</span>' +
                                '</div>'
                            );
                        },
                        item: function (data, escape) {
                            return "<div>" + "Lớp: " + escape(data.tenlop) + "</div> ";
                        },
                    },
                });

                // Add an "All Students" option
                select.addOption({ malop: 'All', tenlop: 'All Students' });

                select.on("item_add", function (value) {
                    if (value === 'All') {
                        // Handle the case where "All Students" is selected
                        fetchAllStudentsInfo()
                            .then(studentInfo => {
       
                                displayStudentTable(studentInfo);
                            })
                            .catch(error => {
                                console.error("Error fetching all students information:", error);
                            });
                    } else {
                        // Handle the case where a specific class is selected
                        fetchStudentInfo(value)
                            .then(studentInfo => {
                                displayStudentTable(studentInfo);
                            })
                            .catch(error => {
                                console.error("Error fetching student information:", error);
                            });
                    }
                });

                resolve(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                reject(error);
            });
    });
}



function fetchAllStudentsInfo() {
    const apiUrl = "https://localhost:7069/api/SinhviensApi";

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        });
}*/
const classApiUrl = "https://localhost:7069/api/LopsApi";
const studentApiUrl = "https://localhost:7069/api/SinhviensApi";

async function setupClassSelect(data) {
    const select = new TomSelect(".select-links", {
        valueField: "malop",
        searchField: ["malop"],
        allowEmptyOption: true,
        options: data,
        render: {
            option: function (data, escape) {
                return (
                    '<div class="d-flex justify-content-between">' +
                    '<span class="title">[' + escape(data.malop) + ']</span>' +
                    '<span class="title">' + escape(data.tenlop) + '</span>' +
                    '</div>'
                );
            },
            item: function (data, escape) {
                return "<div>" + "Lớp: " + escape(data.tenlop) + "</div> ";
            },
        },
    });

    // Add an "All Students" option
    select.addOption({ malop: 'All', tenlop: 'All Students' });

    select.on("item_add", async function (value) {
        try {
            if (!value || value === 'All') {
                // Display all students when no class is selected or 'All' is selected
                const studentInfo = await fetchAllStudentsInfo();
                displayStudentTable(studentInfo);
            } else {
                // Handle the case where a specific class is selected
                const studentInfo = await fetchStudentInfo(value);
                displayStudentTable(studentInfo);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    });
}

async function fetchClassNamesFromDatabase() {
    try {
        const response = await fetch(classApiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        await setupClassSelect(data);

        // Display all students initially
        const allStudentsInfo = await fetchAllStudentsInfo();
        displayStudentTable(allStudentsInfo);

        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}

async function fetchAllStudentsInfo() {
    try {
        const response = await fetch(studentApiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching all students information:", error.message);
        throw error;
    }
}

function fetchStudentInfo(malop) {

const studentInfoUrl = `https://localhost:7069/api/SinhviensApi`;

    return fetch(studentInfoUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const filteredStudents = data.filter(student => student.malop == malop);
            return filteredStudents;
        })
        .catch(error => {
            console.error("Error fetching student information:", error);
            throw error;
        });
}

function fetchStudentMaSVInfo(masv) {


    const studentInfoUrl = `https://localhost:7069/api/SinhviensApi`;

    return fetch(studentInfoUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const filteredStudents = data.filter(student => student.masv == masv);
            return filteredStudents;
        })
        .catch(error => {
            console.error("Error fetching student information:", error);
            throw error;
        });
}


function populateEditModal(studentId, onSaveCallback) {
    fetchStudentMaSVInfo(studentId)
        .then(studentInfo => {
            const editMasvInput = document.getElementById("edit-Masv");
            const editHotenInput = document.getElementById("edit-Hoten");
            const editNgaysinhInput = document.getElementById("edit-Ngaysinh");
            const editGioitinhInput = document.getElementById("edit-Gioitinh");
            const editMalopSelect = document.getElementById("edit-Malop");

            // Set values in the modal inputs
            editMasvInput.value = studentInfo[0].masv;
            editHotenInput.value = studentInfo[0].hoten;
            const rawNgaysinh = studentInfo[0].ngaysinh;
            const formattedNgaysinh = `${rawNgaysinh.substring(8, 10)}-${rawNgaysinh.substring(5, 7)}-${rawNgaysinh.substring(0, 4)}`;
            editNgaysinhInput.value = formattedNgaysinh;
            editGioitinhInput.value = studentInfo[0].gioitinh;
            editMalopSelect.tomselect.setValue([studentInfo[0].malop]);
         

        })
        .catch(error => {
            console.error("Error fetching student information:", error);
        });
}

/*function displayStudentTable(studentData) {
    const tableContainer = document.getElementById("student-table-container");

    const table = document.createElement("table");

    // Create table header
    const headerRow = table.createTHead().insertRow();
    for (const key in studentData[0]) {
        if (key !== 'malopNavigation') {
            const th = document.createElement("th");
            th.textContent = key;
            headerRow.appendChild(th);
        }
    }

    // Create table body
    const tbody = table.createTBody();
    studentData.forEach(student => {
        const row = tbody.insertRow();
        row.id = `row-${student.masv}`;
        for (const key in student) {
            if (key !== 'malopNavigation') {
                const cell = row.insertCell();
                // Check if the current column is 'ngaysinh'
                if (key === 'ngaysinh') {
                    // Format the date as 'ngày/tháng/năm'
                    const date = new Date(student[key]);
                    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                    cell.textContent = formattedDate;
                } else {
                    cell.textContent = student[key];
                }
                cell.setAttribute('data-key', key);
            }
        }


        const editCell = row.insertCell();
        const editLink = document.createElement("button");
        editLink.classList.add("btn", "btn-secondary", "edit-button");
        editLink.setAttribute("type", "button");
        editLink.setAttribute("data-bs-toggle", "modal");
        editLink.setAttribute("data-bs-target", "#editModal");

        // Set a data attribute to store the student ID
        editLink.dataset.studentId = student.masv;

        editLink.textContent = "Sửa";
        editLink.addEventListener("click", function () {
            var studentId = this.dataset.studentId;
            populateEditModal(studentId);
        });

        editCell.appendChild(editLink);

        function populateEditModal(studentId) {
            fetchStudentMaSVInfo(studentId)
                .then(studentInfo => {
                    // Example:


                    const editMasvInput = document.getElementById("edit-Masv");
                    const editHotenInput = document.getElementById("edit-Hoten");
                    const editNgaysinhInput = document.getElementById("edit-Ngaysinh");
                    const editGioitinhInput = document.getElementById("edit-Gioitinh");
                    const editMalopSelect = document.getElementById("edit-Malop");

                    // Set values in the modal inputs
                    editMasvInput.value = studentInfo[0].masv;
                    editHotenInput.value = studentInfo[0].hoten;
                    editNgaysinhInput.value = studentInfo[0].ngaysinh;
                    editGioitinhInput.value = studentInfo[0].gioitinh;
                    editMalopSelect.value = studentInfo[0].malop;



                    document.addEventListener("DOMContentLoaded", function () {
                        // Your existing code here

                        // Remove any previous click event listener on the "Lưu" button
                        const btnSave = document.getElementById("btnEditSinhVien");
                        if (btnSave) {
                            btnSave.removeEventListener("click", handleSaveClick);

                            // Add a new click event listener to the "Lưu" button in the edit modal
                            btnSave.addEventListener("click", function () {
                                // Handle the click event for the "Lưu" button in the edit modal
                                handleSaveClick(studentId);
                            });
                        } else {
                            console.error("Element with ID 'btnEditSinhVien' not found.");
                        }
                    });
                })
                .catch(error => {
                    console.error("Error fetching student information:", error);
                });
        }

        const detailsCell = row.insertCell();
        const detailsLink = document.createElement("a");
        detailsLink.classList.add("btn", "btn-info");
        detailsLink.setAttribute("href", `/Sinhviens/Details/${student.masv}`);
        detailsLink.textContent = "Thông tin";
        detailsCell.appendChild(detailsLink);

        const deleteCell = row.insertCell();
        const deleteLink = document.createElement("button");
        deleteLink.classList.add("btn", "btn-danger");
        deleteLink.textContent = "Xóa";   
        deleteLink.setAttribute("type", "button");
        deleteLink.setAttribute("data-bs-toggle", "modal");
        deleteLink.setAttribute("data-bs-target", "#deleteModal");
        deleteCell.appendChild(deleteLink);

        deleteLink.dataset.studentId = student.masv;


        deleteLink.addEventListener("click", function () {
            var studentId = this.dataset.studentId;
            populateDeleteModal(studentId);
        });

        editCell.appendChild(editLink);

        function populateDeleteModal(studentId) {
            fetchStudentMaSVInfo(studentId)
                .then(studentInfo => {
                    const deleteMasvInput = document.getElementById("delete-Masv");
                    const deleteHotenInput = document.getElementById("delete-Hoten");


                    // Set values in the modal inputs
                    deleteMasvInput.value = studentInfo[0].masv;
                    deleteHotenInput.value = studentInfo[0].hoten;
                })
                .catch(error => {
                    console.error(error);
                });
        }


    });

    // Add a search input field
    const searchInput = document.createElement("input");

    searchInput.setAttribute("type", "text");
    searchInput.classList.add("form-control", "border", "rounded-pill", "float-right", "mb-3");
    searchInput.setAttribute("placeholder", "Tìm kiếm");
    searchInput.setAttribute("style", "width: 300px");
    searchInput.addEventListener("input", function () {
        filterTable(this.value);
    });

    // Append the search input above the table
    tableContainer.innerHTML = "";
    tableContainer.appendChild(searchInput);
    tableContainer.appendChild(table);

    // Function to filter the table based on the search term
    function filterTable(searchTerm) {
        const rows = tbody.getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            let shouldShow = false;
            for (let j = 0; j < cells.length; j++) {
                const cellText = cells[j].textContent || cells[j].innerText;
                if (cellText.includes(searchTerm)) {
                    shouldShow = true;
                    break;
                }
            }

            // Check "hoten" separately
            const hotenCell = rows[i].querySelector('td:nth-child(2)');
            const hotenText = hotenCell.textContent || hotenCell.innerText;
            if (hotenText.includes(searchTerm)) {
                shouldShow = true;
            }

            rows[i].style.display = shouldShow ? "" : "none";
        }
    }
}*/

function createTableHeader(keys, excludeKey) {
    const headerRow = document.createElement("tr");

    for (const key of keys) {
        if (key !== excludeKey) {
            const th = document.createElement("th");
            th.textContent = key;
            headerRow.appendChild(th);
        }
    }

    return headerRow;
}

/* format ngày sinh với */
function populateTableRow(student, excludeKey) {
    const row = document.createElement("tr");
    row.id = `row-${student.masv}`;

    for (const key in student) {
        if (key !== excludeKey) {
            const cell = row.insertCell();

            if (key === 'ngaysinh') {
                const date = new Date(student[key]);      
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;
                cell.textContent = formattedDate;
                cell.classList.add('centered'); // Thêm lớp CSS 'centered' cho ô ngaysinh
            } else if (key === 'masv') {
                cell.textContent = student[key];
                cell.classList.add('centered'); // Thêm lớp CSS 'centered' cho ô masv
            } else {
                cell.textContent = student[key];
            }

            cell.setAttribute('data-key', key);
        }
    }

    return row;
}

function createEditButton(studentId, clickHandler) {
    const editCell = document.createElement("td");
    const editLink = document.createElement("button");
    editLink.classList.add("btn", "btn-secondary", "edit-button");
    editLink.setAttribute("type", "button");
    editLink.setAttribute("data-bs-toggle", "modal");
    editLink.setAttribute("data-bs-target", "#editModal");
    editLink.textContent = "Sửa";
    editLink.dataset.studentId = studentId;
    editLink.addEventListener("click", clickHandler);

    editCell.appendChild(editLink);
    return editCell;
}

function createDetailsButton(studentId) {
    const detailsCell = document.createElement("td");
    const detailsLink = document.createElement("a");
    detailsLink.classList.add("btn", "btn-info");
    detailsLink.setAttribute("href", `/Sinhviens/Details/${studentId}`);
    detailsLink.textContent = "Thông tin";
    detailsCell.appendChild(detailsLink);
    return detailsCell;
}

function createDeleteButton(studentId) {
    const deleteCell = document.createElement("td");
    const deleteLink = document.createElement("button");
    deleteLink.classList.add("btn", "btn-danger");
    deleteLink.textContent = "Xóa";
    deleteLink.setAttribute("type", "button");
    deleteLink.setAttribute("data-bs-toggle", "modal");
    deleteLink.setAttribute("data-bs-target", "#deleteModal");
    deleteLink.dataset.studentId = studentId;
    deleteLink.addEventListener("click", function () {
        var studentId = this.dataset.studentId;
        populateDeleteModal(studentId);
    });
    deleteCell.appendChild(deleteLink);
    return deleteCell;
}

function populateDeleteModal(studentId) {
    fetchStudentMaSVInfo(studentId)
        .then(studentInfo => {
            const deleteMasvInput = document.getElementById("delete-Masv");
            const deleteHotenInput = document.getElementById("delete-Hoten");

            // Set values in the modal inputs
            deleteMasvInput.value = studentInfo[0].masv;
            deleteHotenInput.value = studentInfo[0].hoten;
        })
        .catch(error => {
            console.error(error);
        });
}

/*function displayStudentTable(studentData) {
    const tableContainer = document.getElementById("student-table-container");

    // Create a new table element
    const table = document.createElement("table");

    // Create the table header
    const headerRow = createTableHeader(['MSV', 'Họ Tên', 'Ngày Sinh', 'Giới Tính', 'Mã Lớp'], 'malopNavigation');
    table.appendChild(headerRow);

    // Create the table body
    const tbody = table.createTBody();

    // Populate the table rows with student data
    studentData.forEach(student => {
        const row = populateTableRow(student, 'malopNavigation');

        // Create the "Sửa" (Edit) button cell
        const editCell = createEditButton(student.masv, function () {
            var studentId = this.dataset.studentId;
            populateEditModal(studentId);
        });

        // Create the "Thông tin" (Details) button cell
        const detailsCell = createDetailsButton(student.masv);

        // Create the "Xóa" (Delete) button cell
        const deleteCell = createDeleteButton(student.masv);

        // Append the "Sửa" (Edit), "Thông tin" (Details), and "Xóa" (Delete) button cells to the row
        row.appendChild(editCell);
        row.appendChild(detailsCell);     
        row.appendChild(deleteCell);

        // Append the row to the table body
        tbody.appendChild(row);
    });

    // Append the table body to the table
    table.appendChild(tbody);

    // Append the table to the container
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}*/
/*
function displayStudentTable(studentData) {
    const tableContainer = document.getElementById("student-table-container");

    // Create a new table element
    const table = document.createElement("table");

    // Create the table header
    const headerRow = createTableHeader(['MSV', 'Họ Tên', 'Ngày Sinh', 'Giới Tính', 'Mã Lớp'], 'malopNavigation');
    table.appendChild(headerRow);

    // Create the table body
    const tbody = table.createTBody();

    // Populate the table rows with student data
    studentData.forEach(student => {
        const row = populateTableRow(student, 'malopNavigation');

        // Create the "Sửa" (Edit) button cell
        const editCell = createEditButton(student.masv, function () {
            var studentId = this.dataset.studentId;
            populateEditModal(studentId);
        });

        // Create the "Thông tin" (Details) button cell
        const detailsCell = createDetailsButton(student.masv);

        // Create the "Xóa" (Delete) button cell
        const deleteCell = createDeleteButton(student.masv);

        // Append the "Sửa" (Edit), "Thông tin" (Details), and "Xóa" (Delete) button cells to the row
        row.appendChild(editCell);
        row.appendChild(detailsCell);
        row.appendChild(deleteCell);

        // Append the row to the table body
        tbody.appendChild(row);
    });

    // Append the table body to the table
    table.appendChild(tbody);

    // Append the table to the container
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}*/


const studentsPerPage = 30; // Adjust this number as needed

function displayStudentTable(studentData, currentPage = 1, totalPages = 1) {
    const tableContainer = document.getElementById("student-table-container");

    // Calculate start and end indices for the current page
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;

    // Get a subset of students for the current page
    const studentsOnPage = studentData.slice(startIndex, endIndex);

    // Create a new table element
    const table = document.createElement("table");

    // Create the table header
    const headerRow = createTableHeader(['MSV', 'Họ Tên', 'Ngày Sinh', 'Giới Tính', 'Mã Lớp'], 'malopNavigation');
    table.appendChild(headerRow);

    // Create the table body
    const tbody = table.createTBody();

    // Populate the table rows with student data for the current page
    studentsOnPage.forEach(student => {
        const row = populateTableRow(student, 'malopNavigation');

        // Create the "Sửa" (Edit) button cell
        const editCell = createEditButton(student.masv, function () {
            var studentId = this.dataset.studentId;
            populateEditModal(studentId);
        });

        // Create the "Thông tin" (Details) button cell
        const detailsCell = createDetailsButton(student.masv);

        // Create the "Xóa" (Delete) button cell
        const deleteCell = createDeleteButton(student.masv);

        // Append the "Sửa" (Edit), "Thông tin" (Details), and "Xóa" (Delete) button cells to the row
        row.appendChild(editCell);
        row.appendChild(detailsCell);
        row.appendChild(deleteCell);

        // Append the row to the table body
        tbody.appendChild(row);
    });

    // Append the table body to the table
    table.appendChild(tbody);

    // Append the table to the container
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);

    // Add pagination controls
    addPaginationControls(studentData, currentPage, totalPages);

}

function addPaginationControls(studentData, currentPage) {
    const totalPages = Math.ceil(studentData.length / studentsPerPage);
    const maxVisiblePages = 5; // Adjust this value based on your preference

    // Create pagination container
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination";

    // Create "First Page" button
    const firstPageButton = createPaginationButton("Đầu trang", 1, totalPages, studentData, currentPage);
    paginationContainer.appendChild(firstPageButton);

    // Create "Previous" button
    const prevButton = createPaginationButton("Trước", currentPage - 1, totalPages, studentData);
    paginationContainer.appendChild(prevButton);

    // Create page number buttons
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
        // If total pages are less than or equal to maxVisiblePages, display all pages
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = createPaginationButton(i, i, totalPages, studentData, currentPage);
            paginationContainer.appendChild(pageButton);
        }
    } else {
        // Calculate the range of visible pages based on the current page
        let startPage = Math.max(1, currentPage - halfVisiblePages);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        // Adjust the range if the current page is near the end
        if (endPage - startPage < maxVisiblePages - 1 && endPage < totalPages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Display the first few pages
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = createPaginationButton(i, i, totalPages, studentData, currentPage);
            paginationContainer.appendChild(pageButton);
        }

        // Add ellipsis (...) if there are more pages to the right
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement("span");
            ellipsis.innerText = "...";
            paginationContainer.appendChild(ellipsis);
        }

        // Display the last page only if it's not the current page
        if (currentPage !== totalPages) {
            const lastPageButton = createPaginationButton(totalPages, totalPages, totalPages, studentData, currentPage);
            paginationContainer.appendChild(lastPageButton);
        }
    }

    // Create "Next" button
    const nextButton = createPaginationButton("Sau", currentPage + 1, totalPages, studentData);
    paginationContainer.appendChild(nextButton);

    // Create "Last Page" button
    const lastPageButton = createPaginationButton("Cuối trang", totalPages, totalPages, studentData, currentPage);
    paginationContainer.appendChild(lastPageButton);

    // Append pagination container to the table container
    document.getElementById("student-table-container").appendChild(paginationContainer);
}

function createPaginationButton(text, page, totalPages, studentData, currentPage) {
    const button = document.createElement("button");
    button.innerText = text;

    // Attach click event to handle page changes
    button.addEventListener("click", function () {
        const newPage = typeof page === "number" ? Math.max(1, Math.min(page, totalPages)) : 1;
        displayStudentTable(studentData, newPage, totalPages);
    });

    // Add 'current' class if the button corresponds to the current page
    if (currentPage === page) {
        button.classList.add("current");
    }

    return button;
}



fetchClassNamesFromDatabase()
    .then(data => {
      /*  console.log("Data received:", data);*/
    })
    .catch(error => {
        console.error("Error:", error);
    });

////////


/* Select option lop*/
function fetchClassNamesFromDatabasee() {
    const apiUrl = "https://localhost:7069/api/LopsApi";
    const selectElement = document.querySelector("#Malop");
    const selectElement2 = document.querySelector("#edit-Malop");

    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Clear existing options
                selectElement.innerHTML = "";
                selectElement2.innerHTML = "";

                // Populate options for TomSelect
                const options = data.map(classInfo => ({
                    value: classInfo.malop,
                    text: `[${classInfo.malop}] ${classInfo.tenlop}`,
                }));

                // Initialize TomSelect
                const tomSelect1 = new TomSelect("#Malop", {
                    options: options,
                });

                const tomSelect2 = new TomSelect("#edit-Malop", {
                    options: options,
                });

                resolve(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                reject(error);
            });
    });
}



document.addEventListener("DOMContentLoaded", function () {
    fetchClassNamesFromDatabasee()
        .then(data => {
            console.log("Class names received:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

$('#formSaveSinhVien').submit(function (event) {
    event.preventDefault();

    var svData = $(this).serialize();

    var Url = "/Create";
    var Method = "POST";

    $.ajax({
        url: Url,
        method: Method,
        data: svData,
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Thêm sinh viên thành công',
                showConfirmButton: false,
                timer: 2000
            });
            console.log("Success:", response);
        },
        error: function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi thêm sinh viên',
                showConfirmButton: false,
                timer: 2000
            });
            console.log("Error:", error);
        }
    });
});

/*$('#formSaveSinhVien').submit(function (event) {
    event.preventDefault();

    var svData = $(this).serialize();
    var Url = "/Create";
    var Method = "POST";

    $.ajax({
        url: Url,
        method: Method,
        data: svData,
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Thêm sinh viên thành công',
                showConfirmButton: false,
                timer: 2000
            });

            console.log("Success:", response);

            // Update the table with the new student
            updateStudentTableAfterAdd(response);
        },
        error: function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi thêm sinh viên',
                showConfirmButton: false,
                timer: 2000
            });

            console.log("Error:", error);
        }
    });
});*/


/*function updateStudentTableAfterAdd(student) {
    // Assuming your table is the first (and only) table in the document
    var table = document.getElementsByTagName('table')[0];

    // Create a new row for the added student
    var newRow = document.createElement('tr');

    // Create cells for each property of the student
    var masvCell = document.createElement('td');
    masvCell.textContent = student.masv;
    newRow.appendChild(masvCell);

    var hotenCell = document.createElement('td');
    hotenCell.textContent = student.hoten;
    newRow.appendChild(hotenCell);

    var ngaysinhCell = document.createElement('td');
    ngaysinhCell.textContent = student.ngaysinh;
    newRow.appendChild(ngaysinhCell);

    var gioitinhCell = document.createElement('td');
    gioitinhCell.textContent = student.gioitinh;
    newRow.appendChild(gioitinhCell);

    var malopCell = document.createElement('td');
    malopCell.textContent = student.malop;
    newRow.appendChild(malopCell);

    // Append the "Sửa" (Edit), "Thông tin" (Details), and "Xóa" (Delete) button cells to the row
    newRow.appendChild(createEditButton(student.id, function () {
        populateEditModal(student.id);
    }));
    newRow.appendChild(createDetailsButton(student.id));
    newRow.appendChild(createDeleteButton(student.id));

    // Set a data attribute for the student ID on each button for reference
    newRow.querySelector('.edit-button').dataset.studentId = student.id;

    // Append the new row to the table
    table.appendChild(newRow);
}*/

/*function updateStudentTableAfterAdd(student) {
    // Assuming your table is the first (and only) table in the document
    var table = document.getElementsByTagName('table')[0];

    // Create a new row for the added student using populateTableRow function
    var newRow = populateTableRow(student, 'malopNavigation');

    // Append the "Sửa" (Edit), "Thông tin" (Details), and "Xóa" (Delete) button cells to the row
    newRow.appendChild(createEditButton(student.id, function () {
        populateEditModal(student.id);
    }));
    newRow.appendChild(createDetailsButton(student.id));
    newRow.appendChild(createDeleteButton(student.id));


    // Append the new row to the table
    table.appendChild(newRow);
}*/


// Clear the form when the modal is closed
$('#createStudentModal').on('hidden.bs.modal', function () {
    $('#formSaveSinhVien')[0].reset();
});

$('#formEditSinhVien').submit(function (event) {
    event.preventDefault();

    var svData = $(this).serialize();
    var id = $("#edit-Masv").val(); 

    var Url = "/Edit/" + id; 
    var Method = "POST";

    $.ajax({
        url: Url,
        method: Method,
        data: svData,
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Sửa sinh viên thành công',
                showConfirmButton: false,
                timer: 2000
            });        
            updateTableRow(id);           
            $('#editModal').modal('hide');
        },
        error: function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi sửa sinh viên',
                showConfirmButton: false,
                timer: 2000
            });
            console.log("Error:", error);
        }
    });
});


function updateTableRow(studentId) {
    fetchStudentMaSVInfo(studentId)
        .then(studentInfo => {
            const row = document.getElementById(`row-${studentId}`);
            for (const key in studentInfo[0]) {
                if (key !== 'malopNavigation') {
                    const cell = row.querySelector(`[data-key="${key}"]`);
                    if (cell) {
                        if (key === 'ngaysinh') {
                            // Format the date as 'ngày/tháng/năm' with leading zeros
                            const date = new Date(studentInfo[0][key]);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = date.getFullYear();
                            const formattedDate = `${day}-${month}-${year}`;
                            cell.textContent = formattedDate;
                        } else {
                            cell.textContent = studentInfo[0][key];
                        }
                    }
                }
            }
        })
        .catch(error => {
            console.error("Error fetching updated student information:", error);
        });
}

$('#formDeleteSinhVien').submit(function (event) {
    event.preventDefault();

    var svData = $(this).serialize();
    var id = $("#delete-Masv").val();
    var Url = "/Delete/" + id;
    var Method = "POST";

    $.ajax({
        url: Url,
        method: Method,
        data: svData,
        success: function (response) {
            // Xóa dòng từ bảng
            $("#row-" + id).remove();

            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Xóa sinh viên thành công',
                showConfirmButton: false,
                timer: 2000 
            });

            $('#deleteModal').modal('hide');
        },
        error: function (error) {
 
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi xóa sinh viên',
                showConfirmButton: false,
                timer: 2000 
            });

            console.log("Error:", error);
        }
    });
});



$(document).ready(function () {
    // Bắt sự kiện click của nút tìm kiếm
    $("#searchButton").click(function () {
        // Lấy giá trị từ ô input
        var masv = $("#masvInput").val();

        // Gửi yêu cầu AJAX
        $.ajax({
            type: "POST",
            url: "/Sinhviens/Search",
            data: { masv: masv },
            success: function (data) {
                // Xử lý kết quả trả về (data)
                
                // Ở đây, bạn có thể cập nhật giao diện người dùng với dữ liệu tìm kiếm
            },
            error: function (error) {
                console.log("Error:", error);
            }
        });
    });
});








