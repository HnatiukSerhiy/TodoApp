using Server.Api.Queries;

namespace Server.Api;

public class RootQuery
{
    public static string Hello => "Hello World!";
    public static TodoQueries Todo => new();
    public static CategoryQueries Category => new();
}