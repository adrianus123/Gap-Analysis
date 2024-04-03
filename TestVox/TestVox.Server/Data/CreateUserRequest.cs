namespace TestVox.Server.Data
{
    public class CreateUserRequest
    {
        public required string firstName { get; set; }
        public required string lastName { get; set; }
        public required string email { get; set; }
        public required string password { get; set; }
        public required string repeatPassword { get; set; }
    }
}
