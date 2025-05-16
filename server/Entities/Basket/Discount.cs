namespace Server.Entities.Basket;

public class Discount
{
    public int Id { get; set; }
    public long Amount { get; set; }
    public required string Type { get; set; }
    public int BasketId { get; set; }
    public Basket Basket { get; set; } = null!;
}