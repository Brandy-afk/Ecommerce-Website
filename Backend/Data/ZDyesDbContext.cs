using Microsoft.EntityFrameworkCore;
using ZdyesAPI.Models.Domain;
using ZdyesAPI.Models.Domain.Orders;
using ZdyesAPI.Models.Domain.Payments;
using ZdyesAPI.Models.Domain.Products;

namespace ZdyesAPI.Data
{
    public class ZDyesDbContext : DbContext
    {

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Disc> Discs { get; set; }
        public DbSet<Clothing> Clothing { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<ClothingInventory> ClothingInventory { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Newsletter> NewsLetter { get; set; }
        public DbSet<PaymentRecord> PaymentRecords { get; set; }



        public ZDyesDbContext(DbContextOptions<ZDyesDbContext> dbContextOptions) : base(dbContextOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Image>()
                .HasKey(c => c.ImageId);

            modelBuilder.Entity<Newsletter>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<PaymentRecord>().HasKey(p => p.Id);

            modelBuilder.Entity<Newsletter>().HasIndex(n => n.Email).IsUnique();

            #region Product

            modelBuilder.Entity<Product>().HasKey(p => p.ProductId);
            modelBuilder.Entity<Disc>().HasKey(d => d.ProductId);
            modelBuilder.Entity<Clothing>().HasKey(c => c.ProductId);

            modelBuilder.Entity<Product>()
              .Property(p => p.Colors)
              .HasColumnType("text[]");

            modelBuilder.Entity<Product>()
               .Property(p => p.UploadDate)
               .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<Product>()
              .Property(p => p.LastUpdate)
              .HasDefaultValueSql("CURRENT_TIMESTAMP")
              .ValueGeneratedOnAddOrUpdate();

            modelBuilder.Entity<Product>()
              .HasOne(p => p.Image)
              .WithOne()
              .HasForeignKey<Product>(p => p.ImageId)
              .OnDelete(DeleteBehavior.SetNull);


            // Product to Disc relationship
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Disc)
                .WithOne(d => d.Product)
                .HasForeignKey<Disc>(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // Product to Clothing relationship
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Clothing)
                .WithOne(c => c.Product)
                .HasForeignKey<Clothing>(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);


            // Disc to Inventory relationship
            modelBuilder.Entity<Disc>()
                .HasOne(d => d.Inventory)
                .WithOne()
                .HasForeignKey<Inventory>(i => i.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // Clothing to Inventory relationship
            modelBuilder.Entity<Clothing>()
                .HasMany(c => c.Inventories)
                .WithOne(i => i.Clothing)
                .HasForeignKey(i => i.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            #endregion


            #region Inventory
            modelBuilder.Entity<Inventory>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<ClothingInventory>()
              .HasKey(c => c.Id);


            modelBuilder.Entity<Inventory>()
                .Property(i => i.LastUpdated)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnAddOrUpdate();

            modelBuilder.Entity<ClothingInventory>()
               .Property(i => i.LastUpdated)
               .HasDefaultValueSql("CURRENT_TIMESTAMP")
               .ValueGeneratedOnAddOrUpdate();

            #endregion

            #region Order
            modelBuilder.Entity<Order>()
                .HasKey(c => c.OrderId);

            modelBuilder.Entity<Order>()
                .Property(c => c.Status)
                .HasConversion<string>();

            modelBuilder.Entity<Order>()
               .HasMany(o => o.OrderItems)
               .WithOne(oi => oi.Order)
               .HasForeignKey(oi => oi.OrderId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.Orders)
                .HasForeignKey(o => o.CustomerId);

            modelBuilder.Entity<Order>()
                .Property(o => o.OrderDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            #endregion

            #region OrderItem
            modelBuilder.Entity<OrderItem>()
                .HasKey(o => o.OrderItemId);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Product)
                .WithMany()
                .HasForeignKey(oi => oi.ProductId);
            #endregion

            #region Customer
            modelBuilder.Entity<Customer>()
              .HasKey(c => c.CustomerId);

            modelBuilder.Entity<Customer>()
              .Property(c => c.DateAdded)
              .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<Customer>()
                .Property(c => c.LastOrderDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            #endregion
        }

   




    }
}
