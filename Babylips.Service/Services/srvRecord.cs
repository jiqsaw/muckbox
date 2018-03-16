using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Babylips.DB;
using Babylips.Service.Models;

namespace Babylips.Service.Services
{
    public class srvRecord : BaseService<Record>, IBaseService<Record>
    {
        public IEnumerable<Record> GetByUserId(int UserId)
        {
            return c.Records.Where(m => m.UserId == UserId && m.IsActive == true && m.IsDeleted == false).ToList();

        }

        public RecordPlayback GetPlayback(int RecordId)
        {
            return c.Records.Where(m => m.Id == RecordId && m.IsActive == true && m.IsDeleted == false)
                .Join(c.Users,
                            tbl_record => tbl_record.UserId,
                            tbl_user => tbl_user.Id,
                            (tbl_record, tbl_user) =>
                                new RecordPlayback()
                                {
                                    ByUserId = tbl_user.Id,
                                    ByUserLastName = tbl_user.LastName,
                                    ByUserName = tbl_user.FirstName,
                                    ByUserPicture = tbl_user.PictureUrl,

                                    Id = tbl_record.Id,
                                    RecordData = tbl_record.RecordData,
                                    RecordTitle = tbl_record.Title
                                }).FirstOrDefault();
        }

        public int Save(int UserId, string RecordTitle, string RecordData)
        {
            try
            {
                DB.Record record = new Record();
                record.Title = RecordTitle;
                record.UserId = UserId;
                record.RecordData = RecordData;
                record.IsActive = true;

                Save(record);
                return record.Id;
            }
            catch (Exception)
            {
                return 0;
            }
        }

    }
}