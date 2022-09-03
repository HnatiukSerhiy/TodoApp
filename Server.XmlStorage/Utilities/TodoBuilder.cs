using System.Xml;
using Server.Business.Entities;

namespace Server.XmlStorage.Utilities;

public class TodoBuilder
{
    private readonly CategoryBuilder categoryBuilder;

    public TodoBuilder()
    {
        categoryBuilder = new CategoryBuilder();
    }

    public TodoModel BuildFromXmlNode(XmlNode node)
    {
        var category = categoryBuilder.BuildCategoryFromXmlNode(node["Category"]!);

        int id = int.Parse(node.Attributes!["Id"]!.Value);
        string description = node["Description"]!.InnerText;
        DateTime? deadline = node["Deadline"]!.InnerText != "" ? Convert.ToDateTime(node["Deadline"]!.InnerText) : null;
        DateTime? doneTime = node["DoneTime"]!.InnerText != "" ? Convert.ToDateTime(node["DoneTime"]!.InnerText) : null;
        var isCompleted = bool.Parse(node["IsCompleted"]!.InnerText);

        return new TodoModel
        {
            Id = id,
            Description = description,
            Deadline = deadline,
            DoneTime = doneTime,
            Category = category,
            IsCompleted = isCompleted
        };
    }
}