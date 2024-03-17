using SimpleCRUD.Server.Models;

namespace SimpleCRUD.Server.Services.Interfaces
{
    public interface IPositionsService
    {
        Task<IEnumerable<Position>> GetPositionsList();
    }
}
