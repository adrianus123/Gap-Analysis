using Microsoft.AspNetCore.Mvc;
using SimpleCRUD.Server.Models;
using SimpleCRUD.Server.Services.Interfaces;

namespace SimpleCRUD.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PositionsController : ControllerBase
    {
        private readonly IPositionsService _positionsService;

        public PositionsController(IPositionsService positionService)
        {
            _positionsService = positionService;
        }

        [HttpGet]
        public async Task<IEnumerable<Position>> Get()
        {
            return await _positionsService.GetPositionsList();
        }
    }
}
