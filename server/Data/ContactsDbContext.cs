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
                    new ContactDetail { Label = "Mom's Phone", PhoneNumber = "123-456-7890", Region = "US" },
                    new ContactDetail { Label = "Office", PhoneNumber = "623-282-6356", Region = "US" }
                    }
                },
                new Contact
                {
                    FirstName = "Jane",
                    LastName = "Smith",
                    ContactDetails = new List<ContactDetail>
                    {
                    new ContactDetail { Label = "Phone", PhoneNumber = "987-654-3210", Region = "US" },
                    new ContactDetail { Label = "Work Phone", PhoneNumber = "623-282-6356", Region = "US" }
                    }
                }
            );
            dbContext.SaveChanges();
        }
    }
}
