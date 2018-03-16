using Babylips.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.Service
{
    public interface IBaseService<T> where T : class
    {
        T GetById(int Id);
        IEnumerable<T> GetAll();
        int Save(T entity, bool IsActive = true);
        int SaveAsNotActive(T entity);
        void DeleteById(int Id);
    }
}
