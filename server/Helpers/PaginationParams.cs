using System;

namespace Server.Helpers;

public class PaginationParams
{
    private const int MaxPageSize = 27;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 27;
    public int PageSize
    {
        get { return _pageSize; }
        set { _pageSize = value > MaxPageSize ? MaxPageSize : value; }
    }
    
}
