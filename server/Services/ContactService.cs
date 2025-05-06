using Microsoft.AspNetCore.Http.HttpResults;
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

        public async Task<Contact?> UpdateContact(int id, ContactDto contactUpdates, List<int> detailsForDelete)
        {
            var contact = await _context.Contacts
                .Include(c => c.ContactDetails)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (contact == null)
            {
                return null;
            }

            contact.FirstName = contactUpdates.FirstName;
            contact.LastName = contactUpdates.LastName;

            var detailsToRemove = contact.ContactDetails
                .Where(d => detailsForDelete.Contains(d.Id))
                .ToList();

            foreach (var item in detailsToRemove)
            {
                contact.ContactDetails.Remove(item);
            }

            _context.ContactDetails.RemoveRange(detailsToRemove);

            foreach (var detail in contactUpdates.ContactDetails)
            {
                if (detail.Id == 0)
                {
                    contact.ContactDetails.Add(new ContactDetail
                    {
                        Label = detail.Label,
                        PhoneNumber = detail.PhoneNumber,
                        Region = detail.Region,
                        ContactId = contact.Id
                    });
                }
                else
                {
                    var updatedDetail = contact.ContactDetails.FirstOrDefault(d => d.Id == detail.Id);
                    if (updatedDetail != null)
                    {
                        updatedDetail.Label = detail.Label;
                        updatedDetail.PhoneNumber = detail.PhoneNumber;
                        updatedDetail.Region = detail.Region;
                        updatedDetail.ContactId = contact.Id;
                    }
                }
            }

            await _context.SaveChangesAsync();

            var updatedContact = await _context.Contacts
                .Include(c => c.ContactDetails)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (updatedContact == null)
            {
                return null;
            }

            return updatedContact;
        }

        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.FindAsync<Contact>(id);

            if (contact == null)
            {
                return new NotFoundObjectResult(new { Message = "Contact not found" });
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return new NoContentResult();
        }
    }
}