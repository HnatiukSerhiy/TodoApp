using Server.MsSQL.DataProviders;
using Server.XmlStorage.DataProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSingleton<TodoSqlDataProvider>();
builder.Services.AddSingleton<CategorySqlDataProvider>();
builder.Services.AddSingleton<TodoXmlDataProvider>();
builder.Services.AddSingleton<CategoryXmlDataProvider>();

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
