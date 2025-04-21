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

        public async Task<List<ContactDto>> GetContacts()
        {

            return await _context.Contacts
                        .Include(c => c.ContactDetails)
                        .Select(c => new ContactDto
                   {
                       Id = c.Id,
                       FirstName = c.FirstName,
                       LastName = c.LastName,
                       ContactDetails = c.ContactDetails.Select(d => new ContactDetail
                       {
                           Id = d.Id,
                           Label = d.Label,
                           PhoneNumber = d.PhoneNumber,
                           Region = d.Region
                       }).ToList()
                   })
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
                ContactDetails = contact.ContactDetails.Select(d => new ContactDetail
                       {
                           Id = d.Id,
                           Label = d.Label,
                           PhoneNumber = d.PhoneNumber,
                           Region = d.Region
                       }).ToList()
            };
        }
    }
}
