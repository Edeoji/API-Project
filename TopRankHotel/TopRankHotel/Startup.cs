using Core.DATABASE;
using Core.Models;
using Hangfire;
using Hangfire.SqlServer;
using Logic.Helper;
using Logic.IHelper;
using Logic.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopRankHotel
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
            services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("TopRankTB")));

            services.AddScoped<IUserHelper, UserHelper>();
            services.AddScoped<IEmailHelper, EmailHelper>();
            /* services.AddScoped<IUserHelper, UserHelper>();*/

            services.AddControllersWithViews();
            services.AddSingleton<IEmailConfigurationcs>(Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>());
            services.AddSingleton<IGeneralConfiguration>(Configuration.GetSection("GeneralConfiguration").Get<GeneralConfiguration>());
            services.AddTransient<IEmailServices, EmailServices>();

            services.Configure<PasswordHasherOptions>(options =>
                options.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2);

            services.AddHangfire(x => x.UseSqlServerStorage(Configuration.GetConnectionString("TopRankTBHangfire")));
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 3;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            }).AddEntityFrameworkStores<ApplicationDbContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            /* app.UseHttpsRedirection();
             app.UseStaticFiles();

             app.UseRouting();

             app.UseAuthorization();*/

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
        public void HangFireConfiguration(IApplicationBuilder app)
        {

            var robotDashboardOptions = new DashboardOptions { Authorization = (IEnumerable<Hangfire.Dashboard.IDashboardAuthorizationFilter>)(new[] { new MyAuthorizationFilter() }) };

            var robotOptions = new BackgroundJobServerOptions
            {
                ServerName = String.Format(
                "{0}.{1}",
                Environment.MachineName,
                Guid.NewGuid().ToString())
            };
            app.UseHangfireServer(robotOptions);
            var RobotStorage = new SqlServerStorage(Configuration.GetConnectionString("TopRankTBHangfire"));
            JobStorage.Current = RobotStorage;
            app.UseHangfireDashboard("/OurEmails", robotDashboardOptions, RobotStorage);

        }
    }
}
