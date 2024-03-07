using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace restaurant_crud_api.Models
{
    [Table("customers")]
    public class Customer
    {
        [Column("customer_id")]
        [Required]
        public int CustomerId { get; set; }

        [Column("customer_name")]
        [Required]
        [MinLength(1, ErrorMessage = "Customer name cannot be empty")]
        [MaxLength(100, ErrorMessage = "Customer name must not exceed 100 characters")]
        public string CustomerName { get; set; }

        [Column("customer_address")]
        [Required]
        [MinLength(1, ErrorMessage = "Customer address cannot be empty")]
        [MaxLength(255, ErrorMessage = "Customer address must not exceed 255 characters")]
        public string CustomerAddress { get; set; }

        [Column("customer_phone")]
        [Required]
        [MinLength(1, ErrorMessage = "Customer phone cannot be empty")]
        [MaxLength(13, ErrorMessage = "Customer phone must not exceed 13 characters")]
        public string CustomerPhone { get; set; }

        [Column("created_at")]
        [Required]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        [Required]
        public DateTime UpdatedAt { get; set; }
    }
}
