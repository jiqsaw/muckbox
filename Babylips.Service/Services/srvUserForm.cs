using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Babylips.DB;
using Babylips.DB.Interface;

namespace Babylips.Service.Services
{
    public class srvUserForm : BaseService<UserForm>, IBaseService<UserForm>
    {
        public bool HasUser(int UserId)
        {
            return (c.UserForms.Where(m => m.UserId == UserId && m.IsActive == true && m.IsDeleted == false).Count() > 0);
        }
    }
}