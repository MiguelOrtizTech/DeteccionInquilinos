using DeteccionInquilinos.Share;
using Microsoft.EntityFrameworkCore;

namespace DeteccionInquilinos.Server.Data
{
    public class InquilinoDbContext : DbContext
    {
        public InquilinoDbContext(DbContextOptions<InquilinoDbContext> options) : base(options) { }

        public DbSet<Inquilino> Inquilino { get; set; }
    }
}
