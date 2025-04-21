namespace Server.Models
{
    public class ContactDetail
    {
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Region { get; set; }
        public string Label { get; set; }
        public int ContactId { get; set; }
    }
}