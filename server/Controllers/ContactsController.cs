using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        // GET: api/contacts
        [HttpGet]
        public IActionResult GetAllContacts()
        {
            return Ok(new { Message = "Get all contacts" });
        }

        // GET: api/contacts/{id}
        [HttpGet("{id}")]
        public IActionResult GetContactById(int id)
        {
            return Ok(new { Message = $"Get contact with ID {id}" });
        }

        // POST: api/contacts
        [HttpPost]
        public IActionResult CreateContact([FromBody] object contact)
        {
            return CreatedAtAction(nameof(GetContactById), new { id = 1 }, contact);
        }

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