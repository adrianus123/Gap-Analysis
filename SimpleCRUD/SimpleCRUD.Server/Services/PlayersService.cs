﻿using Microsoft.EntityFrameworkCore;
using SimpleCRUD.Server.Data;
using SimpleCRUD.Server.Models;
using SimpleCRUD.Server.Services.Interfaces;

namespace SimpleCRUD.Server.Services
{
    public class PlayersService : IPlayersService
    {
        private readonly FootballDbContext _context;

        public PlayersService(FootballDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Player>> GetPlayersList()
        {
            return await _context.Players.Include(x => x.Position).ToListAsync();
        }

        public async Task<Player> GetPlayerById(int id)
        {
            return await _context.Players.Include(x => x.Position).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Player> CreatePlayer(Player player)
        {
            _context.Players.Add(player);
            await _context.SaveChangesAsync();
            return player;
        }

        public async Task UpdatePlayer(Player player)
        {
            _context.Players.Update(player);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePlayer(Player player)
        {
            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
        }
    }
}
