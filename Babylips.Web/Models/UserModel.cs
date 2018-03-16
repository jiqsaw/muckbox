using FbManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Babylips.Web.App_Manager;
using Babylips.DB;
using Babylips.Service;

namespace Babylips.Web.Models
{
    public class UserModel
    {
        public DB.User Data { get; set; }

        public List<UserFbFriendModel> Friends { get; set; }

        public List<UserFbAlbumModel> UserAlbums { get; set; }

        public string Ip { get; set; }
    }
        
    #region StructureCoding

    public class UserDataManager
    {


        public UserModel Handler(string JsonFbData)
        {
            UserModel uModel = new UserModel();

            srvUser _userService;
            FacebookUser FbData;

            _userService = new srvUser();

            FbData = LIB.JsonHelper.ToObject<FacebookUser>(JsonFbData);

            uModel.Data = _userService.FbDataSave(FbData);

            if (ConfigManager.GetInstance().Facebook_IncludeFriends)
                uModel.UserAlbums = FbAlbumTransfer(FbData.Albums);

            uModel.Ip = LIB.ServerVars.Ip();


            if (ConfigManager.GetInstance().Facebook_IncludeFriends)
            {
                ////user.Friends.Data daki idleri göndererek karşılık gelen msisdn no ları ve userId leri al            
                //IList<GetFriendUsersData_Result> UserFriendsData = _userService.GetFriendUsersDatas(uModel.Data.Id, uModel.Data.FbId, FbData.Friends);

                ////fb den gelen arkadaşların datalarını kendi arkadaş modelin ile merge (left join) edip, değerlerini set et
                //if (UserFriendsData.Count > 0)
                //{
                //    uModel.Friends = (from u in FbData.Friends
                //                    join uwd in UserFriendsData on u.FbId equals uwd.FbId
                //                    into a
                //                    from f in a.DefaultIfEmpty(new DB.GetFriendUsersData_Result { FbId = u.FbId, UserId = -1, Msisdn = null, BirthDate = "" })
                //                    select new UserFbFriendModel
                //                    {
                //                        FbId = u.FbId,
                //                        Name = u.Name,
                //                        FirstName = u.FirstName,
                //                        LastName = u.LastName,
                //                        PictureUrl = u.PictureUrl,

                //                        UserId = f.UserId,
                //                        Msisdn = f.Msisdn,
                //                        FbBirthDay = f.BirthDate

                //                    }).ToList();
                //}
            }

            return uModel;
        }

        private List<UserFbAlbumModel>  FbAlbumTransfer(IList<FacebookUserAlbum> FbAlbums)
        {
            List<UserFbAlbumModel> uFbAlbumList = new List<UserFbAlbumModel>();
            UserFbAlbumModel uFbAlbum;
            foreach (var item in FbAlbums)
            {
                uFbAlbum = new UserFbAlbumModel();
                uFbAlbum.CanUpload = item.CanUpload;
                uFbAlbum.Count = item.Count;
                uFbAlbum.CoverPhoto = item.CoverPhoto;
                uFbAlbum.CreatedTime = item.CreatedTime;
                uFbAlbum.Id = item.Id;
                uFbAlbum.Link = item.Link;
                uFbAlbum.Name = item.Name;
                uFbAlbum.Privacy = item.Privacy;
                uFbAlbum.Type = item.Type;
                uFbAlbum.UpdatedTime = item.UpdatedTime;

                uFbAlbumList.Add(uFbAlbum);
            }
            return uFbAlbumList;

        }

    }
    #endregion
}