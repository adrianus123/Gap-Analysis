using System.ComponentModel.DataAnnotations;

namespace restaurant_crud_api.Data.DTO.Request
{
    public class CustomerRequest
    {
        [Required]
        [MinLength(1, ErrorMessage = "Customer name cannot be empty")]
        [MaxLength(100, ErrorMessage = "Customer name must not exceed 100 characters")]
        public string CustomerName { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Customer address cannot be empty")]
        [MaxLength(255, ErrorMessage = "Customer address must not exceed 255 characters")]
        public string CustomerAddress { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Customer phone cannot be empty")]
        [MaxLength(13, ErrorMessage = "Customer phone must not exceed 13 characters")]
        public string CustomerPhone { get; set; }
    }
}
