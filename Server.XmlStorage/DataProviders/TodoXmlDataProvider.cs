using System.Xml;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.XmlStorage.Utilities;

namespace Server.XmlStorage.DataProviders;

public class TodoXmlDataProvider : ITodoDataProvider
    {
        private readonly string todosXmlPath;
        private readonly TodoBuilder todoBuilder;
        private readonly XmlDocument xmlDocument;

        public TodoXmlDataProvider(IConfiguration configuration)
        {
            todosXmlPath = configuration["XmlPath:Todos"];
            todoBuilder = new TodoBuilder();
            xmlDocument = new XmlDocument();
        }

        public int Add(TodoModel todoModel)
        {
            xmlDocument.Load(todosXmlPath);

            var parentNode = xmlDocument.SelectSingleNode("Todos");
            var todoNode = xmlDocument.CreateElement("Todo");

            var descriptionNode = xmlDocument.CreateElement("Description");
            var isCompletedNode = xmlDocument.CreateElement("IsCompleted");
            var deadlineNode = xmlDocument.CreateElement("Deadline");
            var doneTimeNode = xmlDocument.CreateElement("DoneTime");
            var parentCategoryNode = xmlDocument.CreateElement("Category");

            if (todoModel.Category?.Id != null)
            {
                var categoryNameNode = xmlDocument.CreateElement("Name");
                parentCategoryNode.SetAttributeNode("Id", todoModel.Category.Id.ToString());
                parentCategoryNode.AppendChild(categoryNameNode);
            }

            string? deadlineDate = todoModel.Deadline.HasValue ? 
                $"{todoModel.Deadline.Value.Year}-{todoModel.Deadline.Value.Month}-{todoModel.Deadline.Value.Day}" : 
                null;

            int id = GetNewId();
            todoNode.SetAttribute("Id", id.ToString());

            descriptionNode.InnerText = todoModel.Description;
            isCompletedNode.InnerText = todoModel.IsCompleted.ToString()!;
            deadlineNode.InnerText = deadlineDate != null ? deadlineDate : String.Empty;

            todoNode.AppendChild(descriptionNode);
            todoNode.AppendChild(isCompletedNode);
            todoNode.AppendChild(deadlineNode);
            todoNode.AppendChild(doneTimeNode);
            todoNode.AppendChild(parentCategoryNode);
            parentNode!.AppendChild(todoNode);
            xmlDocument.Save(todosXmlPath);

            return id;
        }

        public int Delete(int id)
        {
            xmlDocument.Load(todosXmlPath);
            var todoNode = xmlDocument.SelectSingleNode($"//Todos/Todo[@Id='{id}']");
            var parentNode = todoNode!.ParentNode;

            parentNode!.RemoveChild(todoNode);
            xmlDocument.Save(todosXmlPath);

            return id;
        }

        public TodoModel GetById(int id)
        {
            xmlDocument.Load(todosXmlPath);
            var todoNode = xmlDocument.SelectSingleNode($"Todos/Todo[@Id='{id}']");

            return todoBuilder.BuildFromXmlNode(todoNode!);
        }

        public List<TodoModel> GetCompleted(int? categoryId)
        {
            xmlDocument.Load(todosXmlPath);

            string idCondition = categoryId != null ? $"and Category//@Id='{categoryId}'" : "";
            var xmlTodos = xmlDocument.SelectNodes($"Todos/Todo[IsCompleted='True' {idCondition}]"); 

            var todoModels = new List<TodoModel>();

            if (xmlTodos != null)
            {
                foreach (XmlNode todoNode in xmlTodos)
                {
                    todoModels.Add(todoBuilder.BuildFromXmlNode(todoNode));
                }
            }

            return todoModels.OrderBy(todo => todo.Deadline).ToList();
        }

        public List<TodoModel> GetUnCompleted(int? categoryId)
        {
            xmlDocument.Load(todosXmlPath);

            string idCondition = categoryId != null ? $"and Category//@Id='{categoryId}'" : "";
            var xmlTodos = xmlDocument.SelectNodes($"Todos/Todo[IsCompleted='False' {idCondition}]");

            var todoModels = new List<TodoModel>();

            if (xmlTodos != null)
            {
                foreach (XmlNode todoNode in xmlTodos)
                {
                    todoModels.Add(todoBuilder.BuildFromXmlNode(todoNode));
                }
            }

            return todoModels
                .OrderBy(todo => !todo.Deadline.HasValue)
                .ThenBy(todo => todo.Deadline)
                .ToList();
        }

        public int Solve(int id)
        {
            xmlDocument.Load(todosXmlPath);
            
            var todoNode = xmlDocument.SelectSingleNode($"//Todos/Todo[@Id='{id}']");

            todoNode!["IsCompleted"]!.InnerText = "True";
            todoNode["DoneTime"]!.InnerText = $"{DateTime.Now.Year}-{DateTime.Now.Month}-{DateTime.Now.Day}";

            xmlDocument.Save(todosXmlPath);

            return id;
        }

        public int Update(TodoModel todoModel)
        {
            xmlDocument.Load(todosXmlPath);

            var todoNode = xmlDocument.SelectSingleNode($"//TodoList/Todo[@Id='{todoModel.Id}']");

            todoNode!["Description"]!.InnerText = todoModel.Description;
            todoNode["Deadline"]!.InnerText = todoModel.Deadline.ToString()!;

            if (todoModel.Category?.Id == null)
            {
                todoNode.RemoveChild(todoNode.SelectSingleNode("Category")!);
            } else
            {
                todoNode["Category"]!.Attributes.RemoveNamedItem("Id");
                todoNode["Category"]!.SetAttribute("Id", todoModel.Category.Id.ToString());
                todoNode["Category/Name"]!.InnerText = todoModel.Category.Name;
            }

            xmlDocument.Save(todosXmlPath);

            return todoModel.Id;
        }

        private int GetNewId()
        {
            int maxId = 0;

            var xmlTodoList = xmlDocument.SelectNodes("TodoList/Todo");

            if (xmlTodoList != null)
            {
                foreach (XmlNode todo in xmlTodoList)
                {
                    int id = todo["Id"] != null ? int.Parse(todo["Id"]?.InnerText!) : 0;

                    if (id > maxId)
                    {
                        maxId = id;
                    }

                }
            }

            return ++maxId;
        }
    }