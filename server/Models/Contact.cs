using PhoneNumbers;

namespace Server.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<ContactDetail> ContactDetails { get; private set; } 

        public Contact(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        private Contact() {}
    }
}