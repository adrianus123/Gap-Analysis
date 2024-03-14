using Microsoft.AspNetCore.Mvc;
using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Interfaces;

namespace restaurant_crud_api.Controllers
{
    [Route("api/foods")]
    [ApiController]
    public class FoodController : Controller
    {
        private readonly IFoodService _foodService;

        public FoodController(IFoodService foodService)
        {
            _foodService = foodService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<FoodResponse>))]
        public IActionResult GetFoods()
        {
            try
            {
                var data = _foodService.GetFoods();
                var response = data.Select(f => new FoodResponse
                {
                    FoodId = f.FoodId,
                    FoodName = f.FoodName,
                    FoodPrice = f.FoodPrice
                });

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{foodId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<FoodResponse>))]
        public IActionResult GetDetailFood([FromRoute] int foodId)
        {
            try
            {
                var response = _foodService.GetDetailFood(foodId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<FoodResponse>))]
        public IActionResult AddFood([FromBody] FoodRequest request)
        {
            try
            {
                var response = _foodService.AddFood(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit/{foodId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<FoodResponse>))]
        public IActionResult EditFood([FromRoute] int foodId, [FromBody] FoodRequest request)
        {
            try
            {
                var response = _foodService.EditFood(foodId, request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{foodId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<FoodResponse>))]
        public IActionResult DeleteFood([FromRoute] int foodId)
        {
            try
            {
                var response = _foodService.DeleteFood(foodId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
