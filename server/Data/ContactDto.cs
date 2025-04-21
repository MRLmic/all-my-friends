using Server.Models;

namespace Server.Data
{
    public class ContactDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } 
        public string LastName { get; set; } 
        public List<ContactDetail> ContactDetails { get; set; } = new List<ContactDetail>();
    }
}
