using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DomainModels
{
    public class WiederkehrendeTransaktionBiz
    {
        [Key]
        public int WiederkehrendeTransaktionId { get; set; }

        [Required]
        public bool IsEinnahme { get; set; }

        [Required]
        public decimal Betrag { get; set; }

        [Required]
        public string Beschreibung { get; set; }

        [Required]
        public DateTime StartDatum { get; set; }

        [Required]
        public DateTime EndDatum { get; set; }

        [Required]
        public int Frequenz { get; set; }

        [ForeignKey("Kategorie")]
        public int KategorieId { get; set; }
        public virtual KategorieBiz Kategorie { get; set; }

    }
}
