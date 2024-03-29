﻿using Microsoft.EntityFrameworkCore;
using PostServiceApp.Models;

namespace PostServiceApp.Data
{
    public class PostServiceContext : DbContext
    {
        public PostServiceContext(DbContextOptions<PostServiceContext> options) : base(options)
        {

        }

        public DbSet<Post> Post { get; set; }
        public DbSet<User> User { get; set; }
    }
}
