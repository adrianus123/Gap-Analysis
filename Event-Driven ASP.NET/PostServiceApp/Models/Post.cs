namespace PostServiceApp.Models
{
    public class Post
    {
        public int PostId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public int UserId { get; set; }
        public required User User { get; set; }
    }
}
