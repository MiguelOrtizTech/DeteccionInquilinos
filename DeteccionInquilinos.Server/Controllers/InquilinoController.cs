using DeteccionInquilinos.Server.Data;
using DeteccionInquilinos.Share;
using DeteccionInquilinos.Share.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeteccionInquilinos.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InquilinoController : ControllerBase
    {
        protected readonly InquilinoDbContext _context;
        
        public InquilinoController(InquilinoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<InquilinoDTO>>> GetListInquilinos()
        {
            var data = await _context.Inquilino
                .AsNoTracking()
                .ToListAsync();

            if(data.Count == 0)
            {
                return NotFound();
            }

            var mappedData = new List<InquilinoDTO>();

            foreach (var item in data)
            {
                var itemToAdd = new InquilinoDTO()
                {
                    Id = item.Id,
                    Nombre = item.Nombre,
                    Estatus = item.Estatus,
                    Fecha = item.Fecha,
                };
                mappedData.Add(itemToAdd);
            }

            return Ok(mappedData);
        }

        [HttpPost]
        public async Task<IActionResult> AgregarRegistroInquilino([FromBody] InquilinoInsertDTO insertDTO)
        {
            var AddInquilino = new Inquilino()
            {
                Nombre = insertDTO.Nombre,
                Estatus = insertDTO.Estatus,
                Fecha = DateTime.Now
            };

            _context.Inquilino.Add(AddInquilino);

            await _context.SaveChangesAsync();

            return Ok(AddInquilino);
        }
    }
}
