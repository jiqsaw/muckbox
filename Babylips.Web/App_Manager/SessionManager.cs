using Babylips.Web.Models;
using LIB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Babylips.Web.App_Manager
{
    public class SessionManager
    {
        #region Structure
        private System.Web.SessionState.HttpSessionState S;
        private Serialize _serializer;

        private SessionManager() { this.S = HttpContext.Current.Session; }

        public static SessionManager GetInstance()
        {
            return new SessionManager();
        }

        private void SET(SessionType SessionName, object Value) { S[SessionName.ToString()] = Value; }
        private object GET(SessionType SessionName) { return S[SessionName.ToString()]; }
        #endregion

        public enum SessionType
        {
            IsFbLogin,
            UserData,
            FbAccessToken,
            LastSavedMusicUrl,
            LastSavedMusicTitle,
            LastSavedMusicUrlShort
        }

        public UserModel User
        {
            get { return (UserModel)(GET(SessionType.UserData)); }
            set { SET(SessionType.UserData, value); }
        }

        public string FbAccessToken
        {
            get { return (GET(SessionType.FbAccessToken).ToString()); }
            set { SET(SessionType.FbAccessToken, value); }
        }

        public string LastSavedMusicUrl
        {
            get { return (GET(SessionType.LastSavedMusicUrl).ToString()); }
            set { SET(SessionType.LastSavedMusicUrl, value); }
        }

        public string LastSavedMusicUrlShort
        {
            get { return (GET(SessionType.LastSavedMusicUrlShort).ToString()); }
            set { SET(SessionType.LastSavedMusicUrlShort, value); }
        }


        public string LastSavedMusicTitle
        {
            get { return (GET(SessionType.LastSavedMusicTitle).ToString()); }
            set { SET(SessionType.LastSavedMusicTitle, value); }
        }

        public bool IsFbLogin { get { return User != null; } }


        public void Destroy()
        {
            S.Clear();
            S.Abandon();
        }
        

    }
}