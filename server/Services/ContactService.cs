using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Services
{
    public class ContactService
    {
        private readonly ContactsDbContext _context;
        public ContactService(ContactsDbContext context)
        {
            _context = context;
        }

        public async Task<List<Contact>> GetContacts()
        {

            return await _context.Contacts
                        .Include(c => c.ContactDetails)
                        .ToListAsync();
        }

        public async Task<ContactDto> GetContact(int id)
        {
            var contact = await _context.Contacts
                .Include(c => c.ContactDetails)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (contact == null)
            {
                return null;
            }

            return new ContactDto
            {
                Id = contact.Id,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Label = contact.ContactDetails.FirstOrDefault()?.Label,
                Phone = contact.ContactDetails.FirstOrDefault()?.PhoneNumber
            };
        }
    }
}
