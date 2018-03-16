using Babylips.DB.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.DB
{
    [MetadataType(typeof(IUserForm))]
    public partial class UserForm : BaseEntity<UserForm>, IUserForm
    {

    }
}
