using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql
{
    [Table("Transaktion")]
    public class Transaktion
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        [Column("TransaktionId", Order = 0, TypeName = "int")]
        public int TransaktionId { get; set; }

        [Required]
        [Column("IsEinnahme", Order = 5, TypeName = "bit")]
        public bool IsEinnahme { get; set; }

        [Required]
        [Column("Betrag", Order = 10, TypeName = "decimal")]
        public decimal Betrag { get; set; }

        [Required]
        [Column("KategorieId", Order = 15, TypeName = "int")]
        public int KategorieId { get; set; }

        [Required]
        [Column("Beschreibung", Order = 20, TypeName = "nvarchar")]
        public string Beschreibung { get; set; }

        [Required]
        [Column("Datum", Order = 25, TypeName = "date")]
        public DateTime Datum { get; set; }

        [ForeignKey("KategorieId")]
        public virtual Kategorie Kategorie { get; set; }
    }
}
