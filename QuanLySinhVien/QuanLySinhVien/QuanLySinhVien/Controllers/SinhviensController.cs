using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using QuanLySinhVien.Data;


namespace QuanLySinhVien.Controllers
{
    public class SinhviensController : Controller
    {
        private readonly SinhVienContext _context;

        public SinhviensController(SinhVienContext context)
        {
            _context = context;
        }

        // GET: Sinhviens
        public async Task<IActionResult> Index()
        {
            var sinhVienContext = _context.Sinhviens.Include(s => s.MalopNavigation);
            return View(await sinhVienContext.ToListAsync());
        }

        // GET: Sinhviens/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sinhvien = await _context.Sinhviens
                .Include(s => s.MalopNavigation)
                .FirstOrDefaultAsync(m => m.Masv == id);
            if (sinhvien == null)
            {
                return NotFound();
            }

            return View(sinhvien);
        }


        [Route("Create")]
        public IActionResult Create()
        {
            ViewData["LopList"] = new SelectList(_context.Lops, "Malop", "Malop");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("Create")]
        public async Task<IActionResult> Create([Bind("Masv,Hoten,Ngaysinh,Gioitinh,Malop")] Sinhvien newSinhvien)
        {
            if (ModelState.IsValid)
            {
                _context.Add(newSinhvien);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            ViewData["LopList"] = new SelectList(_context.Lops, "Malop", "Malop", newSinhvien.Malop);
            return View(newSinhvien);
        }


        [HttpGet]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var sinhvien = await _context.Sinhviens.FindAsync(id);
            if (sinhvien == null)
            {
                return NotFound();
            }

            ViewData["LopList"] = new SelectList(_context.Lops, "Malop", "Malop", sinhvien.Malop);
            return View(sinhvien);
        }

        // POST: Sinhviens/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Masv,Hoten,Ngaysinh,Gioitinh,Malop")] Sinhvien sinhvien)
        {
            if (id != sinhvien.Masv || id <= 0)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sinhvien);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SinhvienExists(sinhvien.Masv))
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

            ViewData["LopList"] = new SelectList(_context.Lops, "Malop", "Malop", sinhvien.Malop);
            return View(sinhvien);
        }




        [HttpGet]
        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var sinhvien = await _context.Sinhviens
                .Include(s => s.MalopNavigation)
                .FirstOrDefaultAsync(m => m.Masv == id);

            if (sinhvien == null)
            {
                return NotFound();
            }

            return View(sinhvien);
        }

        // POST: Sinhviens/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var sinhvien = await _context.Sinhviens.FindAsync(id);

            if (sinhvien == null)
            {
                return NotFound();
            }

            try
            {
                _context.Sinhviens.Remove(sinhvien);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                // You might also want to provide feedback to the user about the failure
                return RedirectToAction(nameof(Delete), new { id = id, saveChangesError = true });
            }
        }





        // GET: Sinhviens/Search
        public IActionResult Search()
        {
            return View();
        }

        // POST: Sinhviens/Search

        [HttpPost]
        public async Task<IActionResult> Search(int? masv)
        {
            if (masv == null)
            {
                return RedirectToAction(nameof(Index));
            }

            var sinhVien = await _context.Sinhviens
                .Include(s => s.MalopNavigation)
                .FirstOrDefaultAsync(m => m.Masv == masv);

            if (sinhVien == null)
            {
                ViewBag.ErrorMessage = "Student not found.";
                return View(nameof(Index), await _context.Sinhviens.ToListAsync());
            }

            return View(nameof(Index), new List<Sinhvien> { sinhVien });
        }




        private bool SinhvienExists(int id)
        {
            return _context.Sinhviens.Any(e => e.Masv == id);
        }

      

    }
}


