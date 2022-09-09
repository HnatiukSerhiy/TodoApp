using GraphQL;
using Server.Api;
using Server.Interfaces;
using Server.Mapper;
using Server.MsSQL.DataProviders;
using Server.Utilities;
using Server.XmlStorage.DataProviders;

var builder = WebApplication.CreateBuilder(args);

const string corsSpecificOrigins = "CorsSpecificOrigins";

builder.Services.AddCors(options =>
    options.AddPolicy(corsSpecificOrigins,
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
    )
);

builder.Services.AddAutoMapper(typeof(TodoProfile), typeof(CategoryProfile));

builder.Services.AddSingleton<TodoSqlDataProvider>();
builder.Services.AddSingleton<CategorySqlDataProvider>();
builder.Services.AddSingleton<TodoXmlDataProvider>();
builder.Services.AddSingleton<CategoryXmlDataProvider>();

builder.Services.AddSingleton<IDataProviderResolver, DataProviderResolver>();

builder.Services.AddGraphQL(b => b
    .AddAutoSchema<RootQuery>(config => config.WithMutation<RootMutation>())
    .AddSystemTextJson()
    .AddErrorInfoProvider(e => e.ExposeExceptionDetails = true));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(corsSpecificOrigins);

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL("/graphql");
});
app.UseGraphQLAltair("/altair");

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "wwwroot";
});

app.Run();

public partial class Program { }