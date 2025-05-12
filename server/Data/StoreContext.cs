using Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace Server.Data;

public class StoreContext(DbContextOptions options) : DbContext(options)
{
    //public StoreContext(DbContextOptions options) : base (options) - old way of passing options to parent's constructor
    public required DbSet<Product> Products { get; set; }
}
