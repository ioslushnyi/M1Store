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

            }).ToList<BasketItemDto>()
        }; 
    }
}
