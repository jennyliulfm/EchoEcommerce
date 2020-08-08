using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task<int> CreateAsync(T t);

        Task<ICollection<T>> FindAllAsync();

        Task<T> FindByAsync(Expression<Func<T, bool>> match);

        Task<int> DeleteAsync(T entity);
        
        Task<int> SaveAsync();

        void Dispose();

    }
}
