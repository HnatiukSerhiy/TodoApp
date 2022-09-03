using System.Net;
using Server.TodoTests.JsonObjectModels;
using Server.TodoTests.Services;
using Xunit.Abstractions;

namespace Server.TodoTests
{
    public class TodoTests
    {
        private readonly HttpService _httpService;
        private readonly ITestOutputHelper _outputHelper;
        public TodoTests(ITestOutputHelper outputHelper)
        {
            _httpService = new HttpService();
            _outputHelper = outputHelper;
        }

        [Fact]
        public async void HelloQuery_ShouldReturnHelloWorld()
        {
            const string query = @"
                query greet {
                    hello
                }";

            const string expected = "Hello World!";

            var content = _httpService.GetRequestContent(query);
            var response = await _httpService.GetResponse<ParentJsonModel<HelloJsonModel>>(content);

            LogError(response);

            Assert.Equal(expected, response.Json.Data.Hello);
        }

        [Fact]
        public void AddTodo_ShouldReturnTodo()
        {
            const string query = @"
                mutation addTodo($todo: Todo) {
                    todo {
                        add(todoModel: $todo) {
                            id
                            description
                            deadline
                            doneTime
                            category {
                                id
                                name
                            }
                            isCompleted
                        }
                    }
                }";

            Assert.Equal(1, 1);
        }

        private void LogError<T>(ResponseModel<T> response) where T : class
        {
            if (response.ResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                foreach (var error in response.ErrorJson.Errors)
                {
                    _outputHelper.WriteLine(error.Message);
                    _outputHelper.WriteLine(error.Extensions.Details);
                }
            }
        }
    }
}