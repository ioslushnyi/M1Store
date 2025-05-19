using Server.Data;
using Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Extensions;
using Server.Helpers;

namespace Server.Controllers
{
    public class ProductsController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = context.Products
                .AsQueryable()
                .Sort(productParams.OrderBy)
                .Search(productParams.Search)
                .Filter(productParams.Brands, productParams.Types);

            var paginatedList = await PaginatedList<Product>.ToPaginatedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(paginatedList.Metadata);

            return paginatedList;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {

            var product = await context.Products.FindAsync(id);

            return product == null ? NotFound() : product;
        }
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
