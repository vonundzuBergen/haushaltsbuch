using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql
{
    [Table("Kategorie")]
    public class Kategorie
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("KategorieId", Order = 0, TypeName = "int")]
        public int KategorieId { get; set; }

        [Required]
        [Index(IsUnique = true)]
        [Column("Name", Order = 5, TypeName = "nvarchar")]
        public string Name { get; set; }
    }
}
