using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using Server.Business.Entities;
using Server.Business.Interfaces;

namespace Server.MsSQL.DataProviders;

public class CategorySqlDataProvider : ICategoryDataProvider
{
    private readonly string connectionString;

    public CategorySqlDataProvider(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public int Add(CategoryModel categoryModel)
    {
        const string query = @"INSERT INTO Categories(Name) OUTPUT INSERTED.Id values(@Name)";

        using var connection = new SqlConnection(connectionString);
        return connection.ExecuteScalar<int>(query, categoryModel);
    }

    public int Delete(int id)
    {
        const string query = @"DELETE FROM Categories OUTPUT DELETED.Id WHERE Id=@Id";

        using var connection = new SqlConnection(connectionString);
        return connection.ExecuteScalar<int>(query, new { Id = id });
    }

    public CategoryModel GetById(int id)
    {
        const string query = @"SELECT * FROM Categories WHERE Id=@Id";

        using var connection = new SqlConnection(connectionString);
        return connection.Query<CategoryModel>(query, new { Id = id }).LastOrDefault()!;
    }

    public List<CategoryModel> GetCategories()
    {
        const string query = "SELECT * FROM Categories";

        using var connection = new SqlConnection(connectionString);
        return connection.Query<CategoryModel>(query).ToList();
    }

    public int Update(CategoryModel categoryModel)
    {
        const string query = @"
                        UPDATE Categories 
                            SET Name=@Name
                        OUTPUT INSERTED.Id
                        WHERE Id=@Id";

        using var connection = new SqlConnection(connectionString);
        return connection.ExecuteScalar<int>(query, categoryModel);
    }
}