using Babylips.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.Service.Services
{
    public class srvStats
    {

        public StatsModel GetAllData()
        {
            StatsModel model = new StatsModel();

            srvUser serviceUser = new srvUser();
            model.ToplamUyeSayisi = serviceUser.GetAllActive().Count();

            srvUserForm serviceUserForm = new srvUserForm();
            model.DoldurulanFormSayisi = serviceUserForm.GetAllActive().Count();

            srvRecord serviceRecord = new srvRecord();
            model.KaydedilenMuzikSayisi = serviceRecord.GetAllActive().Count();

            return model;
        }
    }
}
