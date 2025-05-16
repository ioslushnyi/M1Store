using System;
using Server.Data;

namespace Server.DTOs;

public class BasketDto
{
    public required string BasketId { get; set; }
    public List<BasketItemDto> Items {get; set;} = new List<BasketItemDto>();
    public List<DiscountDto> Discounts { get; set; } = [];
    public long TotalPrice { get; set; }
    public long MerchandizeTotalPrice { get; set; }
    public long ShippingTotalPrice { get; set; }
}
