using System.Xml;
using Server.Business.Entities;

namespace Server.XmlStorage.Utilities;

public class CategoryBuilder
{
    public CategoryModel BuildCategoryFromXmlNode(XmlNode node)
    {
        
        int id = int.Parse(node.Attributes!["Id"]!.Value);
        string name = node["Name"]!.InnerText;

        return new CategoryModel
        {
            Id = id,
            Name = name
        };
    }
}