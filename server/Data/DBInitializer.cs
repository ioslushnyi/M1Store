using Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace Server.Data;

public class DBInitializer
{
    public static void InitDB(WebApplication app) {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
            ?? throw new InvalidOperationException("Failed to retrieve store context");

        SeedData(context);
    }

    private static void SeedData(StoreContext context)
    {
        context.Database.Migrate();

        if (context.Products.Any()) return;

        var products = new List<Product> {
            new() {
                Id = 1,
                Price = 999,
                QuantityInStock = 50,
                Name = "Cheap Piece of Wood",
                Description = "Your first guitar",
                PictureUrl = "/images/products/cheap-piece-of-wood.jpg",
                Type = "Guitar",
                Brand = "Januszex",

            },
            new() {
                Id = 2,
                Price = 49999,
                QuantityInStock = 30,
                Name = "Ultimate Shredder Unlimited",
                Description = "Your keys to the Lamborghini!",
                PictureUrl = "/images/products/ultimate-shredder-unlimited.jpg",
                Type = "Guitar",
                Brand = "ANKH WARRIORS OF THE WORLD UNITED"
            },
            new() {
                Id = 3,
                Price = 199999,
                QuantityInStock = 20,
                Name = "Old Money Blooze Rocker 2000",
                Description = "The real VINTAGE CLASSIC CUSTOM built by our Customer S.A.T.I.S.F.A.C.T.I.O.N. Team",
                PictureUrl = "/images/products/pies-lol.jpg",
                Type = "Guitar",
                Brand = "Sp. z o.o. VINTAGE CLASSIC CUSTOMS Łódź"
            },
            new() {
                Id = 4,
                Price = 99999,
                QuantityInStock = 10,
                Name = "Beatlesjuice",
                Description = "Perfect for both left-handed and right-handed players.",
                PictureUrl = "/images/products/beatlesjuice.jpg",
                Type = "Bass Guitar",
                Brand = "Sp. z o.o. VINTAGE Classic Customs Łódź"
            },
            new() {
                Id = 5,
                Price = 1999,
                QuantityInStock = 100,
                Name = "Ooh Cool Lele",
                Description = "Add one annoying whining voice to it and you'll be a star on Reels!",
                PictureUrl = "/images/products/ooh-cool-lele.jpg",
                Type = "Accessories",
                Brand = "Januszex"
            },
            new() {
                Id = 6,
                Price = 999999,
                QuantityInStock = 10,
                Name = "Star Ship Cruiser GT",
                Description = "Fuel it with some hot atomic chords and you are ready to fly sky high! The Spaceman should have played this one!",
                PictureUrl = "/images/products/star-ship-cruiser-gt.jpg",
                Type = "Guitar",
                Brand = "ANKH WARRIORS OF THE WORLD UNITED"
            },
            new() {
                Id = 7,
                Price = 499999,
                QuantityInStock = 10,
                Name = "Aquaman's Dream",
                Description = "Sometimes you just get bored and need something exotic, you know what I mean?",
                PictureUrl = "/images/products/aquamans-dream.jpg",
                Type = "Guitar",
                Brand = "Antique Treasure"
            },
            new() {
                Id = 8,
                Price = 399999,
                QuantityInStock = 10,
                Name = "Enterprize & Triax Bundle",
                Description = "Much before Captain Kirk's mission, Jonathan Archer leads the first starship, Enterprize. On their inter-galactic missions, the crew encounter several alien races and are exposed to new technologies...",
                PictureUrl = "/images/products/enterprize-triax-bundle.jpg",
                Type = "Guitar",
                Brand = "ANKH WARRIORS OF THE WORLD UNITED"
            },
            new() {
                Id = 9,
                Price = 89999,
                QuantityInStock = 20,
                Name = "Surf Rocker",
                Description = "Show up that muscular torso of yours and ride (or play) this oceanic beast!",
                PictureUrl = "/images/products/surf-rocker.jpg",
                Type = "Guitar",
                Brand = "West Coast Customs"
            },
        };

        context.Products.AddRange(products);

        context.SaveChanges();
    }
}
