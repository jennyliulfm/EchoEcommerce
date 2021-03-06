using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Echo.Ecommerce.Host.Entities;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Echo.Ecommerce.Host.Models;
using NSwag;
using NSwag.Generation.Processors.Security;
using NSwag.AspNetCore;
using System.Linq;
using System.Collections.Generic;
using Echo.Ecommerce.Host.Repositories;

namespace Echo.Ecommerce.Host
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Configure<MailSenderSetting>(Configuration.GetSection("MailSenderSettings"));
            services.Configure<AppSetting>(Configuration.GetSection("AppSettings"));

            #region DBSetup

            // Configure for mssql
            //services.AddDbContext<DBContext>(
            //   options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //Configure for mysql
            services.AddDbContextPool<DBContext>(options => options
                // replace with your connection string
                .UseMySql(Configuration.GetConnectionString("DefaultConnection"), mySqlOptions => mySqlOptions
                    // replace with your Server Version and Type
                    .ServerVersion(new Version(8, 0, 19), ServerType.MySql)
            ));
            services.AddTransient<ICategoryRepository, CategoryRepository>();

            services.AddIdentity<Entities.User, IdentityRole>()
                 .AddEntityFrameworkStores<DBContext>()
                .AddUserManager<UserManager<Entities.User>>()
                .AddSignInManager<SignInManager<Entities.User>>()
                .AddDefaultTokenProviders();
            #endregion

            #region Authentication
            var key = System.Text.Encoding.UTF8.GetBytes("0123456789123456".ToString());

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    IConfigurationSection googleAuthNSection =
                        Configuration.GetSection("GoogleSettings");

                    options.ClientId = googleAuthNSection["ClientId"];
                    options.ClientSecret = googleAuthNSection["ClientSecret"];
                })
                .AddFacebook(facebookOptions =>
                {
                    facebookOptions.AppId = Configuration["FacebookSettings:AppId"];
                    facebookOptions.AppSecret = Configuration["FacebookSettings:AppSecret"];
                });
   

            services.AddAuthorization();
            //services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("AdminRole",
            //         policy => policy.RequireRole("Admin"));
            //});

            #endregion

            #region cors
            services.AddCors();
            #endregion

            #region "Swagger"
           
            services.AddSwaggerDocument();
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseHttpsRedirection();
           

            app.UseRouting();

            app.UseCors(builder =>
            builder.WithOrigins("http://localhost:4200")
           .AllowAnyHeader()
           .AllowAnyMethod());

            app.UseAuthentication();
            app.UseAuthorization();
           

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //Configure Adminstrator
            AdminSeed.Initialize(app.ApplicationServices, this.Configuration);
        }
    }
}
