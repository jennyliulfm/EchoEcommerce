using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Echo.Ecommerce.Host.Entities;

namespace Echo.Ecommerce.Host.Repositories
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly DBContext _dbContext;

        public GenericRepository(DBContext context)
        {
            this._dbContext = context;
        }

        public virtual async Task<int> CreateAsync(T t)
        {
            await this._dbContext.Set<T>().AddAsync(t);

            return await this._dbContext.SaveChangesAsync();

  
        }

        public virtual async Task<ICollection<T>> FindAllAsync()
        {
            return await _dbContext.Set<T>()
                .AsNoTracking()
                .ToListAsync();
        }

        public virtual async Task<T> FindByAsync(Expression<Func<T, bool>> match)
        {
            return await this._dbContext.Set<T>().SingleOrDefaultAsync(match);
        }

        public virtual async Task<int> DeleteAsync(T entity)
        {
            this._dbContext.Set<T>().Remove(entity);
            return await this._dbContext.SaveChangesAsync();

        }

        public virtual async Task<int> SaveAsync()
        {
            return await this._dbContext.SaveChangesAsync();
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    this._dbContext.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        } 
    }
}
