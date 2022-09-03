using Server.Utilities;

namespace Server.Api.Mutations;

public class DataProviderMutations
{
    public static string ChangeDataProvider(string dataProviderName)
    {
        DataProviderResolver.DataProviderName = dataProviderName;
        return $"Data provider has been changed to {dataProviderName}";
    }
}