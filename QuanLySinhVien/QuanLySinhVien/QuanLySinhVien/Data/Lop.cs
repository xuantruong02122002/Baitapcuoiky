using System;
using System.Collections.Generic;

namespace QuanLySinhVien.Data;

public partial class Lop
{
    public int Malop { get; set; }

    public string Tenlop { get; set; } = null!;

    public virtual ICollection<Sinhvien> Sinhviens { get; set; } = new List<Sinhvien>();
}
