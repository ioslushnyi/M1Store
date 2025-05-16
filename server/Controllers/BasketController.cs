using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs;
using Server.Entities.Basket;
using Server.Extensions;

namespace Server.Controllers;

public class BasketController(StoreContext context): BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasketFromDB();
        
        if (basket == null) return NoContent();
        basket.Calculate();
        return basket.ToDto();
    }
    [HttpPost("item")]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        // get basket from the db
        var basket = await RetrieveBasketFromDB();
        // if no basket - create the basket
        basket ??= CreateBasket();
        // get product to add to basket
        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Problem adding an item to basket");
        // add item to basket
        basket.AddItem(product, quantity);
        // save changes to the db
        var result = await context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());
        return BadRequest("Problem updating basket");

    }
    [HttpDelete("item")]
    public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
    {
        // get basket from the db
        var basket = await RetrieveBasketFromDB();
        // if no basket - create the basket
        if (basket == null) return BadRequest("Could not retrieve basket");
        // remove item from basket
        basket.RemoveItem(productId, quantity);
        // save changes to the db
        var result = await context.SaveChangesAsync() > 0;
        if (result) return Ok(basket.ToDto());
        return BadRequest("Problem updating basket");
    }

    // TODO: move to repository
    private async Task<Basket?> RetrieveBasketFromDB()
    {
        return await context.Baskets
            .Include(basket => basket.Items)
            .ThenInclude(item => item.Product)
            .FirstOrDefaultAsync(basket => basket.BasketId == Request.Cookies["basketId"]);
    }
    private Basket CreateBasket()
    {
        var basket = BasketMgr.CreateBasket();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("basketId", basket.BasketId, cookieOptions);
        context.Baskets.Add(basket);
        return basket;
    }
}
