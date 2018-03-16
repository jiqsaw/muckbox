using Babylips.Com.Helpers;
using Babylips.DB;
using Babylips.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Babylips.Web.Controllers
{
    public class MechanicController : BaseAuthController
    {
        public ActionResult Index(int? RecordId)
        {
            if (RecordId == null)
                return View();
            else
            {
                srvRecord service = new srvRecord();
                return View(service.GetPlayback(RecordId.Value));
            }
        }

        [HttpPost]
        public JsonResult SaveMusic(string RecordTitle, string RecordData)
        {
            try
            {
                srvRecord service = new srvRecord();

                if (RecordTitle == null || RecordTitle == String.Empty)
                    RecordTitle = "Müziğim";

                int savedId = service.Save(session.User.Data.Id, RecordTitle, RecordData);

                session.LastSavedMusicUrl = PathHelper.UrlMuckboxPlayback(session.User.Data.FirstName, session.User.Data.LastName, RecordTitle, savedId, true);
                session.LastSavedMusicTitle = RecordTitle;
                session.LastSavedMusicUrlShort = PathHelper.UrlMuckboxPlaybackShort(savedId, true);

                return Json(new { result = "OK" }, "text/plain");
            }
            catch (Exception ex)
            {
                return Json(new { result = "ERR: " + ex.Message + " inner ex: " + ex.InnerException }, "text/plain");
            }
        }

        public PartialViewResult RecordEndMusicTitle()
        {
            return PartialView();
        }


        public PartialViewResult RecordEndUserForm()
        {
            srvUserForm service = new srvUserForm();
            bool HasUserForm = service.HasUser(session.User.Data.Id);
            ViewBag.HasUserForm = HasUserForm;

            if (!HasUserForm) {
                srvCity cities = new srvCity();
                ViewBag.slCities = cities.GetAllActive().ToList();
            }


            return PartialView();
        }

        [HttpPost]
        public PartialViewResult RecordEndUserForm(Babylips.DB.UserForm model)
        {
            model.UserId = session.User.Data.Id;
            model.IsActive = true;
            model.CreateDate = DateTime.Now;
            
            srvUserForm service = new srvUserForm();
            service.Save(model);

            ViewBag.HasUserForm = true;
                
            return PartialView();
        }

        public PartialViewResult RecordEndThanks(Babylips.DB.UserForm model)
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult DeleteMusic(int RecordId)
        {
            try
            {
                srvRecord service = new srvRecord();
                service.DeleteById(RecordId);

                return Json(new { result = "OK" }, "text/plain");
            }
            catch (Exception ex)
            {
                return Json(new { result = "ERR: " + ex.Message + " inner ex: " + ex.InnerException }, "text/plain");
            }            
        }


	}
}