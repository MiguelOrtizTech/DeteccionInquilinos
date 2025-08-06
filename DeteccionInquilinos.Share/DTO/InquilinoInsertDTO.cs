using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeteccionInquilinos.Share.DTO
{
    public class InquilinoInsertDTO
    {
        public string Nombre { get; set; }
        public bool Estatus { get; set; } = false;
    }
}
