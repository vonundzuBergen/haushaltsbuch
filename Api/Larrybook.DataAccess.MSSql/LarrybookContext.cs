using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql
{
    public class LarrybookContext : DbContext
    {
        public LarrybookContext(): base("Name=mssql") 
        {
            Database.SetInitializer(new LarrybookDbInitializer());
        }

        public DbSet<Kategorie> Kategorien { get; set; }
        public DbSet<Transaktion> Transaktionen { get; set; }
        public DbSet<WiederkehrendeTransaktion> WiederkehrendeTransaktionen { get; set; }

    }
}
