using System;
using System.Collections.Generic;

namespace QuanLySinhVien.Data;

public partial class Sinhvien
{
    public int Masv { get; set; }

    public string Hoten { get; set; } = null!;

    public DateOnly? Ngaysinh { get; set; }

    public string? Gioitinh { get; set; }

    public int? Malop { get; set; }

    public virtual Lop? MalopNavigation { get; set; }
}
