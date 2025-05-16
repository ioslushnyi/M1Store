using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Entities.Basket;

[Table("BasketItems")]
public class BasketItem
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public required Product Product { get; set; }
    public long BasePrice { get; set; }
    public int Quantity { get; set; }
    public long Price { get; set; }
    public int BasketId { get; set; }
    
    public Basket Basket { get; set; } = null!;

}
