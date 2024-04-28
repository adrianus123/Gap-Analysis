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
    public class UserControllerTests
    {
        private readonly IHttpClientFactoryWrapper _clientFactory;
        private readonly ILogger<UserController> _logger;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly UserController _controller;
        private readonly string FAKE_TOKEN = Guid.NewGuid().ToString();

        public UserControllerTests()
        {
            _logger = A.Fake<ILogger<UserController>>();
            _clientFactory = A.Fake<IHttpClientFactoryWrapper>();
            _contextAccessor = A.Fake<IHttpContextAccessor>();
            _controller = new UserController(_logger, _clientFactory, _contextAccessor);
        }

        [Fact]
        public async Task UserController_CreateUser_ReturnOk()
        {
            //Arrange
            var request = new CreateUserRequest
            {
                firstName = "Test",
                lastName = "Name",
                email = "newemail@mail.com",
                password = "Password!",
                repeatPassword = "Password!"
            };

            var user = new User
            {
                email = "newemail@mail.com",
                firstName = "Test",
                lastName = "Name"
            };

            var responseData = JsonConvert.SerializeObject(user);
            var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(responseData)
            };

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("users"))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.CreateUser(request);

            //Actual
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

            var okResult = (OkObjectResult)result;
            var userResult = okResult.Value as User;

            Assert.Equal((int)HttpStatusCode.OK, okResult.StatusCode);
            Assert.Equal(request.firstName, userResult.firstName);
            Assert.Equal(request.lastName, userResult.lastName);
            Assert.Equal(request.email, userResult.email);
        }

        [Fact]
        public async Task UserController_LoginUser_ReturnOk()
        {
            //Arrange
            var loginRequest = new LoginRequest { email = "test@mail.com", password = "password" };
            var signIn = new SignIn { id = 1, email = "test@mail.com", token = "fake_token" };
            var responseData = JsonConvert.SerializeObject(signIn);
            var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(responseData)
            };

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("users/login"))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.LoginUser(loginRequest);

            //Actual
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

            var okResult = (OkObjectResult)result;
            var signInResult = okResult.Value as SignIn;

            Assert.Equal((int)HttpStatusCode.OK, okResult.StatusCode);
            Assert.Equal(loginRequest.email, signInResult.email);
        }

        [Fact]
        public async Task UserController_GetUser_ReturnOk()
        {
            //Arrange
            var userId = 1;
            var user = new User
            {
                id = userId,
                firstName = "User",
                lastName = "Test",
                email = "test@mail.com"
            };
            var responseData = JsonConvert.SerializeObject(user);
            var responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(responseData)
            };

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("users/" + userId))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.GetUser(userId);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));

            var okResult = (OkObjectResult)result;
            var userResult = okResult.Value as User;

            Assert.Equal((int)HttpStatusCode.OK, okResult.StatusCode);
            Assert.Equal(userId, userResult.id);
            Assert.Equal("test@mail.com", userResult.email);
        }

        [Fact]
        public async Task UserController_UpdateUser_ReturnOk()
        {
            //Arrange
            var userId = 1;
            var updateRequest = new UpdateUserRequest { email = "newtest@mail.com", firstName = "test", lastName = "name" };
            var responseMessage = new HttpResponseMessage(HttpStatusCode.NoContent);

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("users/" + userId))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.UpdateUser(userId, updateRequest);

            //Assert
            result.Should().BeOfType(typeof(NoContentResult));
            Assert.Equal((int)HttpStatusCode.NoContent, ((NoContentResult)result).StatusCode);
        }

        [Fact]
        public async Task UserController_ChangePassword_ReturnOk()
        {
            //Arrange
            var userId = 1;
            var changePasswordRequest = new ChangePasswordRequest
            {
                oldPassword = "Password!",
                newPassword = "P4ssw0rd!",
                repeatPassword = "P4ssw0rd!"
            };
            var responseMessage = new HttpResponseMessage(HttpStatusCode.NoContent);

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl(userId + "/password"))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.ChangePassword(userId, changePasswordRequest);

            //Assert
            result.Should().BeOfType(typeof(NoContentResult));
            Assert.Equal((int)HttpStatusCode.NoContent, ((NoContentResult)result).StatusCode);
        }

        [Fact]
        public async Task UserController_DeleteUser_ReturnOk()
        {
            //Arrange
            var userId = 1;
            var responseMessage = new HttpResponseMessage(HttpStatusCode.NoContent);

            A.CallTo(() => _contextAccessor.HttpContext.Items["token"]).Returns(FAKE_TOKEN);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("users/" + userId))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.DeleteUser(userId);

            //Assert
            result.Should().BeOfType(typeof(NoContentResult));
            Assert.Equal((int)HttpStatusCode.NoContent, ((NoContentResult)result).StatusCode);
        }

        [Fact]
        public async Task UserController_LoginUser_ReturnUnauthorized()
        {
            //Arrange
            var loginRequest = new LoginRequest { email = "wrongemail@mail.com", password = "Password!" };
            var responseMessage = new HttpResponseMessage(HttpStatusCode.Unauthorized);

            var httpClient = new HttpClient(new FakeHttpMessageHandler(responseMessage))
            {
                BaseAddress = new Uri(ApiHelper.GetUrl("users/login"))
            };
            A.CallTo(() => _clientFactory.CreateClient()).Returns(httpClient);

            //Act
            var result = await _controller.LoginUser(loginRequest);

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, ((ObjectResult)result).StatusCode);


        }
    }
}
