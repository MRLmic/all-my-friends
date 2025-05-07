using Microsoft.EntityFrameworkCore;
using Server.Models;

public class ContactsDbContext : DbContext
{
    public ContactsDbContext(DbContextOptions<ContactsDbContext> options) : base(options) { }

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

    public static void SeedDatabase(ContactsDbContext dbContext)
    {
        if (!dbContext.Contacts.Any())
        {
            dbContext.Contacts.AddRange(
                new Contact
                {
                    FirstName = "John",
                    LastName = "Doe",
                    ContactDetails = new List<ContactDetail>
                    {
                    new ContactDetail { Label = "Mom's Phone", PhoneNumber = "+11234567890", Region = "US" },
                    new ContactDetail { Label = "Office", PhoneNumber = "+16232826356", Region = "US" }
                    }
                },
                new Contact
                {
                    FirstName = "Jane",
                    LastName = "Smith",
                    ContactDetails = new List<ContactDetail>
                    {
                    new ContactDetail { Label = "Phone", PhoneNumber = "+19876543210", Region = "US" },
                    new ContactDetail { Label = "Work Phone", PhoneNumber = "+16232826356", Region = "US" }
                    }
                }
            );
            dbContext.SaveChanges();
        }
    }
}
