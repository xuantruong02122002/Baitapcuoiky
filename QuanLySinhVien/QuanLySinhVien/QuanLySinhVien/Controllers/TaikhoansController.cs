using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using QuanLySinhVien.Data;

namespace QuanLySinhVien.Controllers
{
    public class TaikhoansController : Controller
    {
        private readonly SinhVienContext _context;

        public TaikhoansController(SinhVienContext context)
        {
            _context = context;
        }

        // GET: Taikhoans
        public async Task<IActionResult> Index()
        {
            return View(await _context.Taikhoans.ToListAsync());
        }

        // GET: Taikhoans/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taikhoan = await _context.Taikhoans
                .FirstOrDefaultAsync(m => m.UserId == id);
            if (taikhoan == null)
            {
                return NotFound();
            }

            return View(taikhoan);
        }
        public IActionResult Login()
        {
            return View();
        }

        // Phương thức xử lý khi người dùng nhấn nút đăng nhập
        [HttpPost]
        public IActionResult Login(Taikhoan taikhoan)
        {
            if (ModelState.IsValid)
            {
                // Kiểm tra thông tin đăng nhập (ví dụ, kiểm tra trong cơ sở dữ liệu)
                if (taikhoan.TenTaiKhoan == "admin" && taikhoan.MatKhau == "password")
                {
                    // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
                    return RedirectToAction("Index", "Home");
                }

                // Nếu thông tin đăng nhập không hợp lệ, hiển thị thông báo lỗi
                ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng.");
            }

            // Nếu có lỗi, hiển thị lại trang đăng nhập với các thông báo lỗi
            return View(taikhoan);
        }
        [HttpPost]
     
        // GET: Taikhoans/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Taikhoans/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("UserId,TenTaiKhoan,MatKhau,HoTen,DiaChi")] Taikhoan taikhoan)
        {
            if (ModelState.IsValid)
            {
                _context.Add(taikhoan);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(taikhoan);
        }

        // GET: Taikhoans/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taikhoan = await _context.Taikhoans.FindAsync(id);
            if (taikhoan == null)
            {
                return NotFound();
            }
            return View(taikhoan);
        }

        // POST: Taikhoans/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("UserId,TenTaiKhoan,MatKhau,HoTen,DiaChi")] Taikhoan taikhoan)
        {
            if (id != taikhoan.UserId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(taikhoan);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TaikhoanExists(taikhoan.UserId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(taikhoan);
        }

        // GET: Taikhoans/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var taikhoan = await _context.Taikhoans
                .FirstOrDefaultAsync(m => m.UserId == id);
            if (taikhoan == null)
            {
                return NotFound();
            }

            return View(taikhoan);
        }

        // POST: Taikhoans/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var taikhoan = await _context.Taikhoans.FindAsync(id);
            if (taikhoan != null)
            {
                _context.Taikhoans.Remove(taikhoan);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TaikhoanExists(int id)
        {
            return _context.Taikhoans.Any(e => e.UserId == id);
        }
    }
}
