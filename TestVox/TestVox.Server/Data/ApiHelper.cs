namespace TestVox.Server.Data
{
    public class ApiHelper
    {
        public static string BaseUrl { get; set; } = "https://api-sport-events.php9-01.test.voxteneo.com/api/v1";
        public static string GetUrl(string endpoint)
        {
            return $"{BaseUrl}/{endpoint}";
        }
    }
}
