using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuanLySinhVien.Data;

[Route("api/[controller]")]
[ApiController]
public class SinhviensApiController : Controller
{
    private readonly SinhVienContext _context;

    public SinhviensApiController(SinhVienContext context)
    {
        _context = context;
    }

    // GET: api/SinhviensApi
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Sinhvien>>> GetSinhviens()
    {
        return await _context.Sinhviens.ToListAsync();
    }

    // GET: api/SinhviensApi/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Sinhvien>> GetSinhvien(int id)
    {
        var sinhvien = await _context.Sinhviens.FindAsync(id);

        if (sinhvien == null)
        {
            return NotFound();
        }

        return sinhvien;
    }

    // PUT: api/SinhviensApi/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSinhvien(int id, Sinhvien sinhvien)
    {
        if (id != sinhvien.Masv)
        {
            return BadRequest();
        }

        _context.Entry(sinhvien).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SinhvienExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/SinhviensApi
    [HttpPost]
    public async Task<ActionResult<Sinhvien>> PostSinhvien(Sinhvien sinhvien)
    {
        _context.Sinhviens.Add(sinhvien);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSinhvien), new { id = sinhvien.Masv }, sinhvien);
    }

    // DELETE: api/SinhviensApi/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSinhvien(int id)
    {
        var sinhvien = await _context.Sinhviens.FindAsync(id);
        if (sinhvien == null)
        {
            return NotFound();
        }

        _context.Sinhviens.Remove(sinhvien);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SinhvienExists(int id)
    {
        return _context.Sinhviens.Any(e => e.Masv == id);
    }
}
