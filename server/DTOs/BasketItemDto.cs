using Server.Entities;

namespace Server.DTOs;

public class BasketItemDto
{
    public int ProductId { get; set; }
    public required ProductDto Product { get; set; }
    public long BasePrice { get; set; }
    public int Quantity { get; set; }
    public long Price { get; set; }
}
