using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {

        private readonly ContactService _contactService;
        public ContactsController(ContactService contactService)
        {
            _contactService = contactService;
        }

        // GET: api/contacts
        [HttpGet]
        public async Task<IActionResult> GetAllContacts()
        {
            try
            {
                var contacts = await _contactService.GetContacts();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Internal server error", Error = ex.Message });
            } 
        }

        // GET: api/contacts/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            try
            {
                var contact = await _contactService.GetContact(id);
                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Internal server error", Error = ex.Message });
            }
        }

        // POST: api/contacts
        // [HttpPost]
        // public async Task<IActionResult> CreateContact([FromBody] ContactDto contact)
        // {
        //     try {
        //         ContactService contactService = new ContactService();
        //         Contact newContact = await contactService.AddContact(contact);
        //         return CreatedAtAction(nameof(GetContactById), new { id = newContact.Id }, newContact);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, new { Message = "Internal server error", Error = ex.Message });
        //     }

        // }

        // PUT: api/contacts/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateContact(int id, [FromBody] object contact)
        {
            return NoContent();
        }

        // DELETE: api/contacts/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            return NoContent();
        }
    }
}