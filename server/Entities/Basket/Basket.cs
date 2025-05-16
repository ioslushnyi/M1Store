using Humanizer;
using Microsoft.AspNetCore.Http.Features;

namespace Server.Entities.Basket;

public class Basket
{
    public int Id { get; set; }
    public required string BasketId { get; set; }
    public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    public List<Discount> Discounts { get; set; } = [];
    public long TotalPrice { get; set; }
    public long MerchandizeTotalPrice { get; set; }
    public long ShippingTotalPrice { get; set; }
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
            existingItem.Price = existingItem.BasePrice * existingItem.Quantity;
        }

        Calculate();
    }

    private void AdjustMerchandizeTotals()
    {
        long newMerchandizeTotal = 0;
        foreach (BasketItem item in Items)
        {
             newMerchandizeTotal += item.Product.Price * item.Quantity;
        }
        MerchandizeTotalPrice = newMerchandizeTotal;
    }

    private void ApplyShipping()
    {
        if (Items.Count() > 0) {
            ShippingTotalPrice = 500;
        }
    }
    private void AdjustTotals () {
        TotalPrice = 0;
        TotalPrice += MerchandizeTotalPrice;
        TotalPrice += ShippingTotalPrice;
    }

    private void ApplyDiscounts()
    {
        if (MerchandizeTotalPrice >= 10000) {
            ShippingTotalPrice = 0;
            Discounts.Add(new Discount()
            {
                Amount = 500,
                Type = "shipping"
            });
        } else {
            Discounts.RemoveAll(x => x.Type == "shipping");
        }
    }
    public void Calculate()
    {
        AdjustMerchandizeTotals();
        ApplyShipping();
        ApplyDiscounts();
        AdjustTotals();
    }

    public void RemoveItem(int productId, int quantity)
    {
        if (quantity <=0) throw new ArgumentException("Quantity should be greater than 0", nameof(quantity  ));

        var Item = FindItem(productId);
        if (Item == null) return;

        Item.Quantity -= quantity;
        Item.Price = Item.BasePrice * Item.Quantity;
        if (Item.Quantity <= 0) Items.Remove(Item);
        Calculate();

    }
    private BasketItem? FindItem(int productId)
    {
        return Items.FirstOrDefault(item => item.ProductId == productId);
    }
}