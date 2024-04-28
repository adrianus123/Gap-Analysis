using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;

namespace TestVox.Server.Config
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers.Authorization.FirstOrDefault();
            if (token != null)
            {
                AttachUserToContext(context, token);
            }

            await _next(context);
        }

        private void AttachUserToContext(HttpContext context, string token)
        {
            try
            {
                context.Items["token"] = token;
            }
            catch
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            }
        }
    }
}
