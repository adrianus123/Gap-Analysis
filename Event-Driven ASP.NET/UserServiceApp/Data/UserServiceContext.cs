using Microsoft.EntityFrameworkCore;
using UserServiceApp.Models;

namespace UserServiceApp.Data
{
    public class UserServiceContext : DbContext
    {
        public UserServiceContext(DbContextOptions<UserServiceContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
    }
}
