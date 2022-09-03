using Server.TodoTests.JsonObjectModels;
using Server.TodoTests.Services;

namespace Server.TodoTests
{
    public class TodoTests
    {
        private readonly HttpService _httpService;
        public TodoTests()
        {
            _httpService = new HttpService();
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
    }
}