using System;
using Server.DTOs;
using Server.Entities;

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
                Name = item.Product.Name,
                Price = item.Product.Price,
                Brand = item.Product.Brand,
                Type = item.Product.Type,
                PictureUrl = item.Product.PictureUrl,
                Quantity = item.Quantity
            }).ToList<BasketItemDto>()
        }; 
    }
}
