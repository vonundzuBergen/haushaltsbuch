using Larrybook.DomainModels;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larrybook.DataAccess.MSSql.Mapping
{
    [TestFixture]
    public class KategorieMapperTests
    {
        private Kategorie _sampleKategorie;
        private KategorieBiz _sampleKategorieBiz;

        [SetUp]
        public void Init()
        {
            _sampleKategorie = new Kategorie() { KategorieId = 1, Name = "Hallo" };
            _sampleKategorieBiz = new KategorieBiz() { KategorieId = 1, Name = "Hallo" };
        }

        [Test]
        public void MapToDomainModel_ValidKategorie_KategorieBizPropertiesSetCorrectly()
        {
            //Arrange 
            var mapper = new KategorieMapper();
            var expectedId = _sampleKategorieBiz.KategorieId;
            var expectedName = _sampleKategorieBiz.Name;

            //Act
            var mappedKategorie = mapper.MapToDomainModel(_sampleKategorie);

            //Assert
            Assert.AreEqual(expectedId, mappedKategorie.KategorieId);
            Assert.AreEqual(expectedName, mappedKategorie.Name);
        }

        [Test]
        public void MapFromDomainModel_ValidKategorieBiz_KategoriePropertiesSetCorrectly()
        {
            //Arrange 
            var mapper = new KategorieMapper();
            var expectedId = _sampleKategorie.KategorieId;
            var expectedName = _sampleKategorie.Name;

            //Act
            var mappedKategorie = mapper.MapFromDomainModel(_sampleKategorieBiz);

            //Assert
            Assert.AreEqual(expectedId, mappedKategorie.KategorieId);
            Assert.AreEqual(expectedName, mappedKategorie.Name);
        }
    }
}
