using Microsoft.AspNetCore.Mvc;
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

        public async Task<Contact> AddNewContact(ContactDto contactDto)
        {
            Contact contact = new Contact
            {
                FirstName = contactDto.FirstName,
                LastName = contactDto.LastName,
                ContactDetails = contactDto.ContactDetails.Select(d => new ContactDetail
                {
                    Label = d.Label,
                    PhoneNumber = d.PhoneNumber,
                    Region = d.Region
                }).ToList()
            };

            foreach (var detail in contact.ContactDetails)
            {
                detail.Contact = contact;
            }
            
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            if (contact == null)
            {
                return null;
            }

            return contact;

        }

        //Put
        //Delete
    }
}
