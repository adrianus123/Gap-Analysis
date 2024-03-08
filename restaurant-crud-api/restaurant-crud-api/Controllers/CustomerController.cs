using Microsoft.AspNetCore.Mvc;
using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Interfaces;
using restaurant_crud_api.Models;

namespace restaurant_crud_api.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<CustomerResponse>))]
        public IActionResult GetCustomers()
        {
            try
            {
                var data = _customerService.GetCustomers();
                var response = data.Select(c => new CustomerResponse
                {
                    CustomerId = c.CustomerId,
                    CustomerName = c.CustomerName,
                    CustomerAddress = c.CustomerAddress,
                    CustomerPhone = c.CustomerPhone
                });

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{customerId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<CustomerResponse>))]
        public IActionResult GetDetailCustomer([FromRoute] int customerId)
        {
            try
            {
                var response = _customerService.GetDetailCustomer(customerId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<CustomerResponse>))]
        public IActionResult AddCustomer([FromBody] CustomerRequest request)
        {
            try
            {
                var response = _customerService.AddCustomer(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit/{customerId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<CustomerResponse>))]
        public IActionResult EditCustomer([FromRoute] int customerId, [FromBody] CustomerRequest request)
        {
            try
            {
                var response = _customerService.EditCustomer(customerId, request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{customerId}")]
        [ProducesResponseType(200, Type = typeof(ResponseAPI<CustomerResponse>))]
        public IActionResult DeleteCustomer([FromRoute] int customerId)
        {
            try
            {
                var response = _customerService.DeleteCustomer(customerId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
