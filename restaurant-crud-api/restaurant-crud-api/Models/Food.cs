using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace restaurant_crud_api.Models
{
    [Table("foods")]
    public class Food
    {
        [Column("food_id")]
        [Required]
        public int FoodId { get; set; }

        [Column("food_name")]
        [Required]
        [MinLength(1, ErrorMessage = "Food name cannot be empty")]
        [MaxLength(100, ErrorMessage = "Food name must not exceed 100 characters")]
        public string FoodName { get; set; }

        [Column("food_price")]
        [Required]
        public decimal FoodPrice { get; set; }

        [Column("created_at")]
        [Required]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        [Required]
        public DateTime UpdatedAt { get; set; }
    }
}
