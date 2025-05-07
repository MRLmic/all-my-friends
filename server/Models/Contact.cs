using PhoneNumbers;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Contact
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public ICollection<ContactDetail> ContactDetails { get; set; } 

        public Contact(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
            ContactDetails = new List<ContactDetail>();
        }

        public Contact() {}
    }
}