using System.ComponentModel.DataAnnotations;

namespace restaurant_crud_api.Data.DTO.Request
{
    public class FoodRequest
    {
        [Required]
        [MinLength(1, ErrorMessage = "Food name cannot be empty")]
        [MaxLength(100, ErrorMessage = "Food name must not exceed 100 characters")]
        public string FoodName { get; set; }

        [Required]
        public decimal FoodPrice { get; set; }
    }
}
