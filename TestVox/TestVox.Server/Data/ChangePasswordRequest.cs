namespace TestVox.Server.Data
{
    public class ChangePasswordRequest
    {
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
        public string repeatPassword { get; set; }
    }
}
