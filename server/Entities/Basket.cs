using Humanizer;

namespace Server.Entities;

public class Basket
{
    public int Id { get; set; }
    public required string BasketId { get; set; }
    public List<BasketItem> Items {get; set;} = new List<BasketItem>();
    public void AddItem(Product product, int quantity)
    {
        if (product == null) ArgumentNullException.ThrowIfNull(product);
        if (quantity <=0) throw new ArgumentException("Quantity should be greater than 0", nameof(quantity  ));

        var existingItem = FindItem(product.Id);

        if (existingItem == null)
        {
            Items.Add(new BasketItem()
            {
                ProductId = product.Id,
                Product = product,
                BasePrice = product.Price,
                Quantity = quantity,
                Price = product.Price * quantity
            });
        } else
        {
            existingItem.Quantity += quantity;
            existingItem.Price = product.Price * existingItem.Quantity;
        }
    }
    public void RemoveItem(int productId, int quantity)
    {
        if (quantity <=0) throw new ArgumentException("Quantity should be greater than 0", nameof(quantity  ));

        var Item = FindItem(productId);
        if (Item == null) return;

        Item.Quantity -= quantity;
        if (Item.Quantity <= 0) Items.Remove(Item);

    }
    private BasketItem? FindItem(int productId)
    {
        return Items.FirstOrDefault(item => item.ProductId == productId);
    }
}
