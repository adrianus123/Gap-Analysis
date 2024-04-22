using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using TestVox.Server.Data;
using TestVox.Server.Validator;

namespace TestVox.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IHttpClientFactory _clientFactory;

        public UserController(ILogger<UserController> logger, IHttpClientFactory clientFactory)
        {
            _logger = logger;
            _clientFactory = clientFactory;
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest user)
        {
            _logger.LogInformation("Received create user request.");

            CreateUserValidator validator = new CreateUserValidator();
            ValidationResult results = validator.Validate(user);

            if (!results.IsValid)
            {
                foreach (var failure in results.Errors)
                {
                    _logger.LogError("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }

                return StatusCode((int)HttpStatusCode.BadRequest, results.Errors);
            }

            var client = _clientFactory.CreateClient();
            var json = JsonConvert.SerializeObject(user);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(ApiHelper.GetUrl("users"), data);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("User created successfully.");
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                _logger.LogError("Error: " + response.Content.ReadAsStringAsync().Result);
                return StatusCode((int)response.StatusCode, "Failed to create user");
            }
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequest request)
        {
            _logger.LogInformation("Received login request.");

            LoginUserValidator validator = new LoginUserValidator();
            ValidationResult results = validator.Validate(request);

            if (!results.IsValid)
            {
                foreach (var failure in results.Errors)
                {
                    _logger.LogError("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }

                return StatusCode((int)HttpStatusCode.BadRequest, results.Errors);
            }

            var client = _clientFactory.CreateClient();
            var json = JsonConvert.SerializeObject(request);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(ApiHelper.GetUrl("users/login"), data);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("User login successfully.");
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);
                return StatusCode((int)response.StatusCode, "Email or password is incorrect");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            _logger.LogInformation("Received get user request.");

            var token = HttpContext.Request.Headers.Authorization;

            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Token is required!");
            }

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.GetAsync(ApiHelper.GetUrl("users/" + id));

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Success load data user id " + id);
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);
                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] UpdateUserRequest request)
        {
            _logger.LogInformation("Received update user data request.");

            var token = HttpContext.Request.Headers.Authorization;
            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Token is required!");
            }

            UpdateUserValidator validator = new UpdateUserValidator();
            ValidationResult results = validator.Validate(request);

            if (!results.IsValid)
            {
                foreach (var failure in results.Errors)
                {
                    _logger.LogError("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }

                return StatusCode((int)HttpStatusCode.BadRequest, results.Errors);
            }

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var json = JsonConvert.SerializeObject(request);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PutAsync(ApiHelper.GetUrl("users/" + id), data);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Update user data successfully.");
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);
                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }

        [HttpPut("{id}/password")]
        public async Task<IActionResult> ChangePassword([FromRoute] int id, [FromBody] ChangePasswordRequest request)
        {
            _logger.LogInformation("Received change password request.");

            var token = HttpContext.Request.Headers.Authorization;
            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.BadRequest, "Token is required!");
            }

            ChangePasswordValidator validator = new ChangePasswordValidator();
            ValidationResult results = validator.Validate(request);

            if (!results.IsValid)
            {
                foreach (var failure in results.Errors)
                {
                    _logger.LogError("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }

                return StatusCode((int)HttpStatusCode.BadRequest, results.Errors);
            }

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var json = JsonConvert.SerializeObject(request);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PutAsync(ApiHelper.GetUrl("users/" + id + "/password"), data);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Change password successfully");
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);
                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            _logger.LogInformation("Received detele user request.");

            var token = HttpContext.Request.Headers.Authorization;
            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Token is required!");
            }

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await client.DeleteAsync(ApiHelper.GetUrl("users/" + id));

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Delete user successfullly.");
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);
                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }
    }
}
