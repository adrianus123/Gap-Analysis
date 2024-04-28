﻿using TestVox.Server.Config.Interfaces;

namespace TestVox.Server.Config
{
    public class HttpClientFactoryWrapper : IHttpClientFactoryWrapper
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HttpClientFactoryWrapper(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public HttpClient CreateClient()
        {
            return _httpClientFactory.CreateClient();
        }
    }
}
