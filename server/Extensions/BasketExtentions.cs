using System;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Server.DTOs;
using Server.Entities.Basket;

namespace Server.Extensions;

public static class BasketExtentions
{
    public static BasketDto ToDto(this Basket basket)
    {
        return new BasketDto()
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(item => new BasketItemDto()
            {
                ProductId = item.ProductId,
                BasePrice = item.BasePrice,
                Quantity = item.Quantity,
                Price = item.Price,
                Product = new ProductDto()
                {
                    Id = item.Product.Id,
                    Name = item.Product.Name,
                    Description = item.Product.Description,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    QuantityInStock = item.Product.QuantityInStock,
                },

            }).ToList<BasketItemDto>(),
            Discounts = basket.Discounts.Select(discount => new DiscountDto()
            {
                Type = discount.Type,
                Amount = discount.Amount,
            }).ToList<DiscountDto>(),
            MerchandizeTotalPrice = basket.MerchandizeTotalPrice,
            ShippingTotalPrice = basket.ShippingTotalPrice,
            TotalPrice = basket.TotalPrice,
        }; 
    }
}
