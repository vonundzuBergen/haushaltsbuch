using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DomainModels
{
    public class KategorieBiz
    {
        [Key]
        public int KategorieId { get; set; }

        [Required]
        public string Name { get; set; }

    }
}
