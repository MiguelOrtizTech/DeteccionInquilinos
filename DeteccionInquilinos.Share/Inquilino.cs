using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeteccionInquilinos.Share
{
    public class Inquilino
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nombre {  get; set; }
        public bool Estatus { get; set; } = false;
        public DateTime Fecha { get; set; } = DateTime.Now;
    }
}
