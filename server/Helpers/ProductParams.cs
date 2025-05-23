using System;

namespace Server.Helpers;

public class ProductParams : PaginationParams
{
    public string? OrderBy { get; set; }
    public string? Search { get; set; }
    public string? Brands { get; set; }
    public string? Types { get; set; }
}
