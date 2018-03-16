using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.Com.Game
{
    public class Mechanic
    {
        #region InitialConf
        private static Mechanic _Mechanic;

        public static Mechanic GetInstance()
        {
            if (_Mechanic == null)
                _Mechanic = new Mechanic();
            return _Mechanic;
        }

        #endregion

        public enum Types
        {
            Add,
            Remove,
            Mute
        }

        public void StartRecord() { }

        

    }
}