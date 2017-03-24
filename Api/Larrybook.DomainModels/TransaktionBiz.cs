using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DomainModels
{
    public class TransaktionBiz
    {
        [Key]
        public int TransaktionId { get; set; }

        [Required]
        public bool IsEinnahme { get; set; }

        [Required]
        public decimal Betrag { get; set; }

        [Required]
        public string Beschreibung { get; set; }

        [Required]
        public DateTime Datum { get; set; }

        [ForeignKey("Kategorie")]
        public int KategorieId { get; set; }
        public virtual KategorieBiz Kategorie { get; set; }

    }
}
