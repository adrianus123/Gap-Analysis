using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net;
using TestVox.Server.Config;
using TestVox.Server.Config.Interfaces;
using TestVox.Server.Controllers;
using TestVox.Server.Data;
using TestVox.Server.Data.Response;

namespace TestVox.Server.Tests.Controllers
{
    public class OrganizerControllerTests
    {
        private readonly ILogger<OrganizerController> _logger;
        private readonly IHttpClientFactoryWrapper _clientFactory;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly OrganizerController _controller;
        private readonly string FAKE_TOKEN = Guid.NewGuid().ToString();

        public OrganizerControllerTests()
        {
            _logger = A.Fake<ILogger<OrganizerController>>();
            _clientFactory = A.Fake<IHttpClientFactoryWrapper>();
            _contextAccessor = A.Fake<IHttpContextAccessor>();
            _controller = new OrganizerController(_logger, _clientFactory, _contextAccessor);
        }

        [Fact]
        public async Task OrganizerController_GetAllOrganizers_ReturnOk()
        {
            var page = 1;
            var perPage = 3;
            var organizerList = new List<Organizer>();
            organizerList.Add(new Organizer { id = 1, organizerName = "Organizer 1", imageLocation = "image_url" });
            organizerList.Add(new Organizer { id = 2, organizerName = "Organizer 2", imageLocation = "image_url" });
            organizerList.Add(new Organizer { id = 3, organizerName = "Organizer 3", imageLocation = "image_url" });

            var data = new OrganizerList { data = organizerList };

            var responseData = JsonConvert.SerializeObject(data);
            var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(responseData)
            };

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("organizers?page=" + page + "&perPage=" + perPage))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.GetAllOrganizers(page, perPage);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

            var okResult = (OkObjectResult)result;
            Assert.Equal((int)HttpStatusCode.OK, okResult.StatusCode);

            var organizerListResult = okResult.Value;

            //Assert.Equal(organizerList.Count(), organizerListResult.Count());
            //Assert.Equal(organizerList.First().id, organizerListResult.data.First().id);
        }

        [Fact]
        public async Task OrganizerController_GetOrganizer_ReturnOk()
        {
            //Arrange
            var organizerId = 1;
            var organizer = new Organizer
            {
                id = organizerId,
                organizerName = "Organizer Test",
                imageLocation = "http://example.com"
            };
            var responseData = JsonConvert.SerializeObject(organizer);
            var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(responseData)
            };

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("organizers/" + organizerId))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.GetOrganizer(organizerId);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

            var okResult = (OkObjectResult)result;
            var organizerResult = okResult.Value as Organizer;

            Assert.Equal((int)HttpStatusCode.OK, okResult.StatusCode);
            Assert.Equal(organizer.id, organizerResult.id);
            Assert.Equal(organizer.organizerName, organizerResult.organizerName);
            Assert.Equal(organizer.imageLocation, organizerResult.imageLocation);
        }

        [Fact]
        public async Task OrganizerController_CreateOrganizer_ReturnOk()
        {
            var request = new OrganizerRequest { organizerName = "Organizer Test", imageLocation = "image_url" };
            var organizer = new Organizer { id = 1, organizerName = "Organizer Test", imageLocation = "image_url" };
            var responseData = JsonConvert.SerializeObject(organizer);
            var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(responseData)
            };

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("organizers"))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.CreateOrganizer(request);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

            var okResult = (OkObjectResult)result;
            var organizerResult = (Organizer)okResult.Value;

            Assert.Equal((int)HttpStatusCode.OK, okResult.StatusCode);
            Assert.Equal(organizer.organizerName, organizerResult.organizerName);
            Assert.Equal(organizer.imageLocation, organizerResult.imageLocation);
        }

        [Fact]
        public async Task OrganizerController_UpdateOrganizer_ReturnOk()
        {
            var organizerId = 1;
            var request = new OrganizerRequest { organizerName = "Updated Organizer", imageLocation = "new_image_url" };
            var responseMessage = new HttpResponseMessage(HttpStatusCode.NoContent);

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("organizers/" + organizerId))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.UpdateOrganizer(organizerId, request);

            //Assert
            result.Should().BeOfType(typeof(NoContentResult));
            Assert.Equal((int)HttpStatusCode.NoContent, ((NoContentResult)result).StatusCode);

        }

        [Fact]
        public async Task OrganizerController_DeleteOrganizer_ReturnOk()
        {
            //Arrange
            var organizerId = 1;
            var responseMessage = new HttpResponseMessage(HttpStatusCode.NoContent);

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("organizers/" + organizerId))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.DeleteOrganizer(organizerId);

            //Assert
            result.Should().BeOfType(typeof(NoContentResult));
            Assert.Equal((int)HttpStatusCode.NoContent, ((NoContentResult)result).StatusCode);
        }
    }
}
