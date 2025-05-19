using Server.Entities;

namespace Server.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        return orderBy switch
        {
            "price" => query.OrderBy(x => x.Price),
            "priceDescending" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };
    }
    public static IQueryable<Product> Search(this IQueryable<Product> query, string? search)
    {
        if (string.IsNullOrEmpty(search)) return query;
        return query.Where(x => x.Name.ToLower().Contains(search.Trim().ToLower()));
    }
    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
    {
        var brandsList = new List<string>();
        var typesList = new List<string>();

        if (!string.IsNullOrEmpty(brands))
        {
            brandsList.AddRange(brands.ToLower().Split(",").ToList());
        }
        if (!string.IsNullOrEmpty(types))
        {
            typesList.AddRange(types.ToLower().Split(",").ToList());
        }
        return query
            .Where(x => brandsList.Count == 0 || brandsList.Contains(x.Brand.ToLower()))
            .Where(x => typesList.Count == 0 || typesList.Contains(x.Type.ToLower()));
    }
}