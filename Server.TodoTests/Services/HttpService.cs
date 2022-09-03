using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using Server.TodoTests.JsonObjectModels;

namespace Server.TodoTests.Services;

public class HttpService
{
    private readonly HttpClient _client;
    private const string URL = "https://localhost:7095/graphql";

    public HttpService()
    {
        var appFactory = new WebApplicationFactory<Program>();
        _client = appFactory.CreateClient();
    }

    public StringContent GetRequestContent(string query, object? variables = null)
    {
        var payloadToParse = new { query, variables };

        string payload = JsonConvert.SerializeObject(payloadToParse);
        return new StringContent(payload, Encoding.UTF8, "application/json");
    }

    public async Task<ResponseModel<T>> GetResponse<T>(StringContent content) where T : class
    {
        var response = await _client.PostAsync(URL, content);
        var json = await response.Content.ReadAsStringAsync();

        ParentErrorJsonModel errors = new ParentErrorJsonModel();
        if (response.StatusCode != HttpStatusCode.OK)
        {
            errors = JsonConvert.DeserializeObject<ParentErrorJsonModel>(json);
        }
        
        return new ResponseModel<T>
        {
            ResponseMessage = response,
            Json = JsonConvert.DeserializeObject<T>(json),
            ErrorJson = errors
        };
    }
}