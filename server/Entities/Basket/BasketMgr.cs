using System;

namespace Server.Entities.Basket;

public static class BasketMgr
{
    public static Basket CreateBasket()
    {
        var basket = new Basket()
        {
            BasketId = Guid.NewGuid().ToString()
        };
        return basket;
    
    }
}
