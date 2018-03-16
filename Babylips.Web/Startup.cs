using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Babylips.Web.Startup))]
namespace Babylips.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
