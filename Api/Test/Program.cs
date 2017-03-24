using Larrybook.DataAccess.MSSql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var y = new KategorieRepository(new LarrybookContext()))
            {
                var i = y.GetAll();

                foreach (var item in i)
                {
                    Console.WriteLine(item.Name);
                }
            }

            Console.WriteLine("Done");

            Console.ReadLine();
        }
    }
}
