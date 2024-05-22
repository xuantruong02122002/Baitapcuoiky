create database student
CREATE TABLE truong (
    id_truong VARCHAR(50) PRIMARY KEY,
    tentruong VARCHAR(100)
);
CREATE TABLE sinhvien (
    id_sv INT PRIMARY KEY AUTO_INCREMENT,
    hoten VARCHAR(50) NOT NULL,
    ngaysinh DATE,
    id_lop INT,
    DepartmentID INT,
    FOREIGN KEY (ClassID) REFERENCES Classes(ClassID),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);
CREATE TABLE lop (
    id_lop INT PRIMARY KEY AUTO_INCREMENT,
    tenlop VARCHAR(100) NOT NULL,
    id_khoa INT,
    FOREIGN KEY (id_khoa) REFERENCES khoa(id_khoa)
);
CREATE TABLE lophocphan (
    id_lophocphan INT PRIMARY KEY,
    tenlophocphan VARCHAR(100) NOT NULL,
    id_giaovien INT,
    id_khoa INT,
    FOREIGN KEY (id_giaovien) REFERENCES giaovien(id_giaovien),
    FOREIGN KEY (id_khoa) REFERENCES khoa(id_khoa)
);
CREATE TABLE giaovien (
    id_giaovien INT PRIMARY KEY,
    hoten VARCHAR(50) NOT NULL,
	ngaysinh date,
	sdt nvarchar(50),
	diachi nvarchar(50),
    id_khoa INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);
CREATE TABLE Departments (
    id_khoa INT PRIMARY KEY ,
    tenkhoa VARCHAR(100) NOT NULL,
    id_truong INT,
    FOREIGN KEY (id_truong) REFERENCES truong(id_truong)
);