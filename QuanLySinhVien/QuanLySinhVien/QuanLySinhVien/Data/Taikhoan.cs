using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace QuanLySinhVien.Data;

public partial class Taikhoan
{
    public int UserId { get; set; }

    public string TenTaiKhoan { get; set; } = null!;

    public string MatKhau { get; set; } = null!;

    public string? HoTen { get; set; }

    public string? DiaChi { get; set; }
}
