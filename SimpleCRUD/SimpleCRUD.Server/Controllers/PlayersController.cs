using Microsoft.AspNetCore.Mvc;
using SimpleCRUD.Server.Models;
using SimpleCRUD.Server.Services.Interfaces;

namespace SimpleCRUD.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayersService _playersService;

        public PlayersController(IPlayersService playersService)
        {
            _playersService = playersService;
        }

        [HttpGet]
        public async Task<IEnumerable<Player>> Get()
        {
            return await _playersService.GetPlayersList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> Get(int id)
        {
            var player = await _playersService.GetPlayerById(id);
            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        [HttpPost]
        public async Task<ActionResult<Player>> Post(Player player)
        {
            await _playersService.CreatePlayer(player);
            return CreatedAtAction("Post", new { id = player.Id }, player);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest("Not a valid player id");
            }

            await _playersService.UpdatePlayer(player);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Not a valid player id");
            }

            var player = await _playersService.GetPlayerById(id);
            if (player == null)
            {
                return NotFound();
            }

            await _playersService.DeletePlayer(player);
            return NoContent();
        }
    }
}
