using Microsoft.EntityFrameworkCore;
using Server.Models;

public class ContactsDbContext : DbContext
{
    public ContactsDbContext(DbContextOptions<ContactsDbContext> options) : base(options) {}

    public DbSet<Contact> Contacts { get; set; }
    public DbSet<ContactDetail> ContactDetails { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>()
            .HasMany(c => c.ContactDetails)
            .WithOne(cd => cd.Contact!)
            .HasForeignKey(cd => cd.ContactId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
