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
    public class LopsController : Controller
    {
        private readonly SinhVienContext _context;

        public LopsController(SinhVienContext context)
        {
            _context = context;
        }

        // GET: Lops
        public async Task<IActionResult> Index()
        {
            return View(await _context.Lops.ToListAsync());
        }

        // GET: Lops/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var lop = await _context.Lops
                .FirstOrDefaultAsync(m => m.Malop == id);
            if (lop == null)
            {
                return NotFound();
            }

            return View(lop);
        }

        // GET: Lops/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Lops/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Malop,Tenlop")] Lop lop)
        {
            if (ModelState.IsValid)
            {
                _context.Add(lop);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(lop);
        }

        // GET: Lops/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var lop = await _context.Lops.FindAsync(id);
            if (lop == null)
            {
                return NotFound();
            }
            return View(lop);
        }

        // POST: Lops/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Malop,Tenlop")] Lop lop)
        {
            if (id != lop.Malop)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(lop);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LopExists(lop.Malop))
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
            return View(lop);
        }

        // GET: Lops/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var lop = await _context.Lops
                .FirstOrDefaultAsync(m => m.Malop == id);
            if (lop == null)
            {
                return NotFound();
            }

            return View(lop);
        }

        // POST: Lops/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var lop = await _context.Lops.FindAsync(id);
            if (lop != null)
            {
                _context.Lops.Remove(lop);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LopExists(int id)
        {
            return _context.Lops.Any(e => e.Malop == id);
        }
    }
}
