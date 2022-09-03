using Server.Api.Mutations;

namespace Server.Api;

public class RootMutation
{
    public static TodoMutations Todo => new();
    public static CategoryMutations Category => new();
    public static DataProviderMutations DataProvider => new();
}