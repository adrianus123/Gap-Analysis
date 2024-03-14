using Microsoft.AspNetCore.Mvc;
using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Interfaces;

namespace restaurant_crud_api.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : Controller
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<TransactionResponse>))]
        public IActionResult GetTransactions()
        {
            try
            {
                var data = _transactionService.GetTransactions();
                var response = data.Select(t => new TransactionResponse
                {
                    TransactionId = t.TransactionId,
                    Customer = new CustomerResponse { CustomerId = t.Customer.CustomerId, CustomerName = t.Customer.CustomerName, CustomerAddress = t.Customer.CustomerAddress, CustomerPhone = t.Customer.CustomerPhone },
                    Food = new FoodResponse { FoodId = t.Food.FoodId, FoodName = t.Food.FoodName, FoodPrice = t.Food.FoodPrice },
                    Quantity = t.Quantity,
                    TotalPrice = t.TotalPrice,
                    TransactionDate = t.TransactionDate,
                });

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{transactionId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<TransactionResponse>))]
        public IActionResult GetDetailTransaction([FromRoute] int transactionId)
        {
            try
            {
                var response = _transactionService.GetDetailTransaction(transactionId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<TransactionResponse>))]
        public IActionResult AddTransaction([FromBody] TransactionRequest request)
        {
            try
            {
                var response = _transactionService.AddTransaction(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit/{transactionId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<TransactionResponse>))]
        public IActionResult EditTransaction([FromRoute] int transactionId, [FromBody] TransactionRequest request)
        {
            try
            {
                var response = _transactionService.EditTransaction(transactionId, request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{transactionId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<TransactionResponse>))]
        public IActionResult DeleteTransaction([FromRoute] int transactionId)
        {
            try
            {
                var response = _transactionService.DeleteTransaction(transactionId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
