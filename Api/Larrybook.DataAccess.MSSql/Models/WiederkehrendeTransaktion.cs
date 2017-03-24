using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql
{
    [Table("WiederkehrendeTransaktion")]
    public class WiederkehrendeTransaktion
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("WiederkehrendeTransaktionId", Order = 0, TypeName = "int")]
        public int WiederkehrendeTransaktionId { get; set; }

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
        [Column("StartDatum", Order = 25, TypeName = "date")]
        public DateTime StartDatum { get; set; }

        [Required]
        [Column("EndDatum", Order = 30, TypeName = "date")]
        public DateTime EndDatum { get; set; }

        [Required]
        [Column("Frequenz", Order = 35, TypeName = "int")]
        public int Frequenz { get; set; }

        [ForeignKey("KategorieId")]
        protected virtual Kategorie Kategorie { get; set; }
    }
}
