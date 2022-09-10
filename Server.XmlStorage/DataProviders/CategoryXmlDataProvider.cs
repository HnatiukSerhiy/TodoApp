using System.Xml;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.XmlStorage.Utilities;

namespace Server.XmlStorage.DataProviders;

public class CategoryXmlDataProvider : ICategoryDataProvider
    {
        private readonly string categoriesXmlPath;
        private readonly CategoryBuilder categoryBuilder;
        private readonly XmlDocument xmlDocument;

        public CategoryXmlDataProvider(IConfiguration configuration)
        {
            categoriesXmlPath = configuration["XmlPath:Categories"];
            categoryBuilder = new CategoryBuilder();
            xmlDocument = new XmlDocument();
        }

        public int Add(CategoryModel categoryModel)
        {
            xmlDocument.Load(categoriesXmlPath);

            var parentNode = xmlDocument.SelectSingleNode("Categories");
            var categoryNode = xmlDocument.CreateElement("Category");
            var categoryNameNode = xmlDocument.CreateElement("Name");
            
            int id = GetNewId();

            categoryNode.SetAttribute("Id", id.ToString());
            categoryNameNode.InnerText = categoryModel.Name;

            categoryNode.AppendChild(categoryNameNode);
            parentNode!.AppendChild(categoryNode);

            xmlDocument.Save(categoriesXmlPath);

            return id;
        }

        public int Delete(int id)
        {
            xmlDocument.Load(categoriesXmlPath);
            var categoryNode = xmlDocument.SelectSingleNode($"Categories/Category[//@Id={id}]");

            categoryNode!.ParentNode!.RemoveChild(categoryNode);
            xmlDocument.Save(categoriesXmlPath);

            return id;
        }

        public CategoryModel GetById(int id)
        {
            xmlDocument.Load(categoriesXmlPath);

            var categoryXmlNode = xmlDocument.SelectSingleNode($"Categories/Category[//@Id={id}]");

            return categoryBuilder.BuildCategoryFromXmlNode(categoryXmlNode!);
        }

        public List<CategoryModel> GetCategories()
        {
            xmlDocument.Load(categoriesXmlPath);

            var xmlCategories = xmlDocument.SelectNodes("Categories/Category");
            var categoryModels = new List<CategoryModel>();

            if (xmlCategories != null)
            {
                foreach (XmlNode categoryXml in xmlCategories)
                {
                    categoryModels.Add(categoryBuilder.BuildCategoryFromXmlNode(categoryXml));
                }
            }

            return categoryModels;
        }

        public int Update(CategoryModel categoryModel)
        {
            xmlDocument.Load(categoriesXmlPath);
            var categoryNode = xmlDocument.SelectSingleNode($"Categories/Category[//@Id={categoryModel.Id}]");
            
            categoryNode!["Name"]!.InnerText = categoryModel.Name;
            xmlDocument.Save(categoriesXmlPath);

            return (int) categoryModel.Id!;
        }

        private int GetNewId()
        {
            int maxId = 0;

            var xmlCategories = xmlDocument.SelectNodes("Categories/Category");

            if (xmlCategories is null) return ++maxId;
            
            foreach (XmlNode idNode in xmlCategories)
            {
                int id = int.Parse(idNode.Attributes!["Id"]!.Value);

                if (id > maxId)
                {
                    maxId = id;
                }
            }

            return ++maxId;
        }
    }