using Server.MsSQL.DataProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSingleton<TodoSqlDataProvider>();
builder.Services.AddSingleton<CategorySqlDataProvider>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

/*app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL("/graphql");
});
app.UseGraphQLAltair();*/

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "wwwroot";
});

app.Run();

public partial class Program { }
