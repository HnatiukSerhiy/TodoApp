using System.Data.SqlClient;
using AutoMapper;
using Dapper;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;
using Server.MsSQL.Mapper;
using Server.MsSQL.Models;

namespace Server.MsSQL.DataProviders;

public class TodoSqlDataProvider : ITodoDataProvider
    {
        private readonly string connectionString;
        private readonly IMapper mapper;

        public TodoSqlDataProvider(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
            mapper = new MapperSetup().Mapper;
        }

        public int Add(TodoModel todoModel)
        {
            const string query = @"
                    INSERT INTO Todos
                        (Description, Deadline, CategoryId)
                    OUTPUT INSERTED.Id
                        VALUES(@Description, @Deadline, @categoryId)";

            var todoDbModel = mapper.Map<TodoDbModel>(todoModel);

            using var connection = new SqlConnection(connectionString);
            return connection.ExecuteScalar<int>(query, todoDbModel);
        }

        public int Delete(int id)
        {
            const string query = "DELETE FROM Todos WHERE Id=@Id OUTPUT DELETED.Id";

            var connection = new SqlConnection(connectionString);
            return connection.ExecuteScalar<int>(query, new { Id = id });
        }

        public TodoModel GetById(int id)
        {
            const string query = @"
                        SELECT * FROM Todos
                        LEFT JOIN Categories ON (Todos.CategoryId=Categories.Id)
                        WHERE Todos.Id=@Id";

            var connection = new SqlConnection(connectionString);
            return connection.Query<TodoModel, CategoryModel, TodoModel>(query, map: (todo, category) =>
            {
                todo.Category = category; 
                return todo;

            }, new { Id = id }).LastOrDefault()!;
        }

        public List<TodoModel> GetCompleted(int? categoryId)
        {
            string categoryСondition = categoryId.HasValue ? $"AND Todos.CategoryId=@CategoryId" : "";

            string query = @$"
                    SELECT * FROM Todos
                    LEFT JOIN Categories on (Todos.CategoryId=Categories.Id)
                    WHERE IsCompleted=1 {categoryСondition} ORDER BY DoneTime ASC";


            var connection = new SqlConnection(connectionString);
            return connection.Query<TodoModel, CategoryModel, TodoModel>(query, map: (todo, category) =>
            {
                todo.Category = category;
                return todo;

            }, new { CategoryId = categoryId}).ToList();
        }

        public List<TodoModel> GetUnCompleted(int? categoryId)
        {
            string categoryCondition = categoryId.HasValue ? $"AND Todos.CategoryId=@CategoryId" : "";

            string query = @$"
                    SELECT * FROM Todos 
                    LEFT JOIN Categories on (Todos.CategoryId = Categories.Id)
                    where IsCompleted=0 {categoryCondition} 
                    ORDER BY CASE WHEN Deadline IS NULL THEN 1 ELSE 0 END, Deadline";

            var connection = new SqlConnection(connectionString);
            return connection.Query<TodoModel, CategoryModel, TodoModel>(query, map: (todo, category) =>
            {
                todo.Category = category;
                return todo;

            }, new { CategoryId = categoryId }).ToList();
        }

        public int Solve(int id)
        {
            const string query = @"
                        UPDATE Todos 
                        SET 
                            IsCompleted=@IsCompleted, 
                            DoneTime=@DoneTime 
                        WHERE Id=@Id";

            var parameters = new
            {
                Id = id,
                doneTime = DateTime.Now,
                IsCompleted = true
            };

            var connection = new SqlConnection(connectionString);
            connection.Execute(query, parameters);

            return id;
        }

        public int Update(TodoModel todoModel)
        {
            string query = @"
                    UPDATE Todos 
                    SET 
                        Description=@Description, 
                        Deadline=@Deadline,
                        CategoryId=@categoryId 
                    WHERE Todos.Id = @Id
                    OUTPUT INSERTED.Id";

            var todoDbModel = mapper.Map<TodoDbModel>(todoModel);
            
            var connection = new SqlConnection(connectionString);
            return connection.ExecuteScalar<int>(query, todoDbModel);
        }
    }