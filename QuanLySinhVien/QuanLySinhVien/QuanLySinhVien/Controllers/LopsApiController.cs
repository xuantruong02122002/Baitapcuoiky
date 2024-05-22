using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuanLySinhVien.Data;

[Route("api/[controller]")]
[ApiController]
public class LopsApiController : ControllerBase
{
    private readonly SinhVienContext _context;

    public LopsApiController(SinhVienContext context)
    {
        _context = context;
    }

    // GET: api/LopsApi
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Lop>>> GetLops()
    {
        return await _context.Lops.ToListAsync();
    }

    // GET: api/LopsApi/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Lop>> GetLop(int id)
    {
        var lop = await _context.Lops.FindAsync(id);

        if (lop == null)
        {
            return NotFound();
        }

        return lop;
    }

    // POST: api/LopsApi
    [HttpPost]
    public async Task<ActionResult<Lop>> PostLop(Lop lop)
    {
        _context.Lops.Add(lop);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetLop", new { id = lop.Malop }, lop);
    }

    // PUT: api/LopsApi/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutLop(int id, Lop lop)
    {
        if (id != lop.Malop)
        {
            return BadRequest();
        }

        _context.Entry(lop).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!LopExists(id))
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

    // DELETE: api/LopsApi/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLop(int id)
    {
        var lop = await _context.Lops.FindAsync(id);
        if (lop == null)
        {
            return NotFound();
        }

        _context.Lops.Remove(lop);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool LopExists(int id)
    {
        return _context.Lops.Any(e => e.Malop == id);
    }
}
