using Microsoft.EntityFrameworkCore;
using SimpleCRUD.Server.Data;
using SimpleCRUD.Server.Models;
using SimpleCRUD.Server.Services.Interfaces;

namespace SimpleCRUD.Server.Services
{
    public class PositionsService : IPositionsService
    {
        private readonly FootballDbContext _context;

        public PositionsService(FootballDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> GetPositionsList()
        {
            return await _context.Positions.OrderBy(x => x.DisplayOrder).ToListAsync();
        }
    }
}
