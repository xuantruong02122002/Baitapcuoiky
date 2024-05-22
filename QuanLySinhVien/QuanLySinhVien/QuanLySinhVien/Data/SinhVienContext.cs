using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace QuanLySinhVien.Data;

public partial class SinhVienContext : DbContext
{
    public SinhVienContext()
    {
    }

    public SinhVienContext(DbContextOptions<SinhVienContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Lop> Lops { get; set; }

    public virtual DbSet<Sinhvien> Sinhviens { get; set; }

    public virtual DbSet<Taikhoan> Taikhoans { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=XUANTRUONG\\SQLEXPRESS;Initial Catalog=sinhvien;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Lop>(entity =>
        {
            entity.HasKey(e => e.Malop).HasName("PK__lop__15F456FD6C6CB93D");

            entity.ToTable("lop");

            entity.Property(e => e.Malop)
                .ValueGeneratedNever()
                .HasColumnName("malop");
            entity.Property(e => e.Tenlop)
                .HasMaxLength(50)
                .HasColumnName("tenlop");
        });

        modelBuilder.Entity<Sinhvien>(entity =>
        {
            entity.HasKey(e => e.Masv).HasName("PK__sinhvien__7A21767CC459D20F");

            entity.ToTable("sinhvien");

            entity.Property(e => e.Masv)
                .ValueGeneratedNever()
                .HasColumnName("masv");
            entity.Property(e => e.Gioitinh)
                .HasMaxLength(50)
                .HasColumnName("gioitinh");
            entity.Property(e => e.Hoten)
                .HasMaxLength(50)
                .HasColumnName("hoten");
            entity.Property(e => e.Malop).HasColumnName("malop");
            entity.Property(e => e.Ngaysinh).HasColumnName("ngaysinh");

            entity.HasOne(d => d.MalopNavigation).WithMany(p => p.Sinhviens)
                .HasForeignKey(d => d.Malop)
                .HasConstraintName("FK__sinhvien__malop__4BAC3F29");
        });

        modelBuilder.Entity<Taikhoan>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.ToTable("taikhoan");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.DiaChi)
                .HasMaxLength(50)
                .HasColumnName("diaChi");
            entity.Property(e => e.HoTen)
                .HasMaxLength(50)
                .HasColumnName("hoTen");
            entity.Property(e => e.MatKhau)
                .HasMaxLength(50)
                .HasColumnName("matKhau");
            entity.Property(e => e.TenTaiKhoan)
                .HasMaxLength(50)
                .HasColumnName("tenTaiKhoan");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
