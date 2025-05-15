using System;
using Server.Data;

namespace Server.DTOs;

public class BasketDto
{
    public required string BasketId { get; set; }
    public List<BasketItemDto> Items {get; set;} = new List<BasketItemDto>();
}
