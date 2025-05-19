using System;
using Microsoft.EntityFrameworkCore;

namespace Server.Helpers;

public class PaginatedList<T> : List<T> //Product
{
    public PaginatedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        this.Metadata = new PaginationMetadata()
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };
        this.AddRange(items);
    }
    public PaginationMetadata Metadata { get; set; }
    public static async Task<PaginatedList<T>> ToPaginatedList(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = await query.CountAsync();
        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PaginatedList<T>(items, count, pageNumber, pageSize);
    }
}
