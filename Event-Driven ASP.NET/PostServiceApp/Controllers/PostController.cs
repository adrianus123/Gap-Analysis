using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostServiceApp.Data;
using PostServiceApp.Data.DTO;
using PostServiceApp.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PostServiceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostServiceContext _context;

        public PostController(PostServiceContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPost()
        {
            return await _context.Post.Include(x => x.User).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Post>> Post([FromBody] PostRequest post)
        {
            try
            {
                var newpost = new Post
                {
                    Title = post.Title,
                    Content = post.Content,
                    UserId = post.UserId
                };

                _context.Post.Add(newpost);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPost", new { id = newpost.PostId }, newpost);

            } catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                return BadRequest(innerException.Message);
            }
        }

    }
}
