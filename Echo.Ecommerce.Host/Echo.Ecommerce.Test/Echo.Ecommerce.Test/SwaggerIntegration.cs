using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Serilog;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

using Echo.Ecommerce.Host.Models;
using Echo.Ecommerce.Host.Entities;
using Echo.Ecommerce.Host.Controllers;

namespace Echo.Ecommerce.Test
{
    public class SwaggerIntegration
    {
        private bool _started;
        public IHost ApiHost { get; set; }

        public HttpClient HttpTestClient;
        private IHostBuilder hostBuilder;

     
        public SwaggerIntegration()
        {
            hostBuilder = new HostBuilder()
               .ConfigureWebHost(webHost =>
               {
                   // Add TestServer
                   webHost.UseTestServer();
                   webHost.UseEnvironment("Test");
                   //Use standard Startup
                   webHost.UseStartup<Echo.Ecommerce.Host.Startup>();
                   //Setup the Config
                   webHost.ConfigureAppConfiguration((hostingContext, config) =>
                   {
                       config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                       config.AddEnvironmentVariables();
                   });
                   //Override some services and setup the manager host
                   webHost.ConfigureTestServices(svc =>
                   {
                       var descriptor = svc.SingleOrDefault(
                           d => d.ServiceType ==
                                typeof(DbContextOptions<DBContext>));

                       svc.Remove(descriptor);
                       svc.AddDbContext<DBContext>(options =>
                       {
                           options.UseInMemoryDatabase("InMemoryDbForTesting");
                       });

                       var sp = svc.BuildServiceProvider();
                       using (var scope = sp.CreateScope())
                       {
                           var scopedServices = scope.ServiceProvider;
                           var db = scopedServices.GetRequiredService<DBContext>();
                           db.Database.EnsureCreated();
                         
                       };
                       
                   });
               });
        }

        public async Task<SwaggerIntegration> Start()
        {
            ApiHost = await hostBuilder.StartAsync();

            // Create an HttpClient which is setup for the test host
            HttpTestClient = ApiHost.GetTestClient();

            HttpTestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Test");

            _started = true;
            Log.Logger.Information("Integration Rig Started");

            return this;
        }


        public void Stop()
        {
            if (!_started) return;
            _started = false;

            HttpTestClient.CancelPendingRequests();
            HttpTestClient.Dispose();
            HttpTestClient = null;

            ClearDatabase(ApiHost.Services.GetService<DBContext>());
            Log.Logger.Information("Integration Rig Stopped");
        }

        public void Dispose()
        {
            if (!_started) return;
        }

        public static void ClearDatabase(DBContext db)
        {
            db.Clear();
        }
    }
}
