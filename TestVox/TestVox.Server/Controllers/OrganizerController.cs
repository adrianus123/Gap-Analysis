using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Net.Http.Headers;
using System.Net;
using TestVox.Server.Data;
using Newtonsoft.Json;
using System.Text;
using TestVox.Server.Validator;
using FluentValidation.Results;
using TestVox.Server.Config.Interfaces;
using TestVox.Server.Data.Response;

namespace TestVox.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizerController : ControllerBase
    {
        private readonly ILogger<OrganizerController> _logger;
        private readonly IHttpClientFactoryWrapper _clientFactory;
        private readonly IHttpContextAccessor _contextAccessor;

        public OrganizerController(ILogger<OrganizerController> logger, IHttpClientFactoryWrapper clientFactory, IHttpContextAccessor contextAccessor)
        {
            _logger = logger;
            _clientFactory = clientFactory;
            _contextAccessor = contextAccessor;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrganizers([FromQuery] int page = 1, [FromQuery] int perPage = 10)
        {
            _logger.LogInformation("Received get organizers request.");

            var token = _contextAccessor.HttpContext.Items["token"] as string;

            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Token is required!");
            }

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.GetAsync(ApiHelper.GetUrl("organizers?page=" + page + "&perPage=" + perPage));

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Success fetch organizers data");
                var responseData = await response.Content.ReadAsStringAsync();
                //var result = JsonConvert.DeserializeObject<OrganizerList>(responseData);
                return Ok(responseData);
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);
                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrganizer([FromRoute] int id)
        {
            _logger.LogInformation("Received get organizer request, id " + id);

            var token = _contextAccessor.HttpContext.Items["token"] as string;

            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Token is required!");
            }

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await client.GetAsync(ApiHelper.GetUrl("organizers/" + id));

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Success fetch organizer data, id " + id);

                var responseData = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<Organizer>(responseData);
                return Ok(result);
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);
                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrganizer([FromBody] OrganizerRequest request)
        {
            _logger.LogInformation("Received create organizer request.");

            var token = _contextAccessor.HttpContext.Items["token"] as string;
            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Token is required!");
            }

            OrganizerValidator validator = new OrganizerValidator();
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

            var response = await client.PostAsync(ApiHelper.GetUrl("organizers"), data);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Organizer created successfully.");

                var responseData = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<Organizer>(responseData);
                return Ok(result);
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);

                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrganizer([FromRoute] int id, [FromBody] OrganizerRequest request)
        {
            _logger.LogInformation("Received update organizer request, id " + id);

            var token = _contextAccessor.HttpContext.Items["token"] as string;
            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Token is required!");
            }

            OrganizerValidator validator = new OrganizerValidator();
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

            var response = await client.PutAsync(ApiHelper.GetUrl("organizers/" + id), data);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Organizer updated successfully.");

                //var responseData = await response.Content.ReadAsStringAsync();
                //return Ok(responseData);

                return NoContent();
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);

                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrganizer([FromRoute] int id)
        {
            _logger.LogInformation("Received delete organizer request, id " + id);

            var token = _contextAccessor.HttpContext.Items["token"] as string;
            if (token.IsNullOrEmpty())
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, "Token is required!");
            }

            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await client.DeleteAsync(ApiHelper.GetUrl("organizers/" + id));
            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Organizer deleted successfully.");

                //var responseData = await response.Content.ReadAsStringAsync();
                //return Ok(responseData);

                return NoContent();
            }
            else
            {
                _logger.LogError(response.Content.ReadAsStringAsync().Result);

                return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
            }
        }
    }
}
