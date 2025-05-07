using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class ContactDetail
    {
        public int Id { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public string Region { get; set; }
        [Required]
        public string Label { get; set; }
        public int ContactId { get; set; }

        [JsonIgnore] 
        public Contact? Contact { get; set; }
    }
}