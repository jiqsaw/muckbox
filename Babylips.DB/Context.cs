using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Babylips.DB
{
    public class Context : BabylipsEntities
    {

        public DbSet<TEntity> GetTable<TEntity>() where TEntity : class
        {
            return this.Set<TEntity>();
        }

    }
}
