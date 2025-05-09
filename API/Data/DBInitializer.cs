using System;
using System.Security.Cryptography.X509Certificates;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

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
                Name = "Cheap Piece of Wood",
                Description = "Your first guitar",
                PictureUrl = "images/products/cheap-piece-of-wood-1.jpg",
                Type = "Guitar",
                Brand = "Sp. z o.o. VINTAGE Classics Customs Łódź"
            },
            new() {
                Id = 2,
                Name = "Ultimate Shredder",
                Description = "Your keys to the Lamborghini!",
                PictureUrl = "images/products/ultimate-shredder-1.jpg",
                Type = "Guitar",
                Brand = "Sp. z o.o. VINTAGE Classics Customs Łódź"
            },
            new() {
                Id = 3,
                Name = "Pies Lol",
                Description = "The REAL VINTAGE CLASSICS Custom built by our Customer SATISFACTION Team",
                PictureUrl = "images/products/pies-lol-1.jpg",
                Type = "Guitar",
                Brand = "Sp. z o.o. VINTAGE Classics Customs Łódź"
            },
            new() {
                Id = 4,
                Name = "Beetlejuice",
                Description = "Perfect for both left-handed and right-handed players.",
                PictureUrl = "images/products/beetlejuice-1.jpg",
                Type = "Bass Guitar",
                Brand = "Sp. z o.o. VINTAGE Classics Customs Łódź"
            },
            new() {
                Id = 5,
                Name = "Ooh Cool Lele",
                Description = "Add one annoying whining voice to it and you'll be a star on Reels!",
                PictureUrl = "images/products/ooh-cool-lele-1.jpg",
                Type = "Accessories",
                Brand = "Sp. z o.o. VINTAGE Classics Customs Łódź"
            },
        };

        context.Products.AddRange(products);

        context.SaveChanges();
    }
}
