using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using GroupProjectApi.Modules.Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace GroupProjectApi.Tests.Integration
{
    public abstract class IntegrationTest
    {
        public readonly HttpClient _client;

        protected IntegrationTest()
        {
            var appFactory = new WebApplicationFactory<Startup>()
                .WithWebHostBuilder(builder =>
                    builder.ConfigureServices(services =>
                    {
                        services.RemoveAll(typeof(GroupProjectDbContext));
                        services.AddDbContext<GroupProjectDbContext>(options =>
                        {
                            options.UseInMemoryDatabase("IntegrationDb");
                        });
                    })
                );
            _client = appFactory.CreateClient();
        }

    }
}
