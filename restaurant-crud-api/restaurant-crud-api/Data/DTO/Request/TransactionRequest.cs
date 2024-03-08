using System.ComponentModel.DataAnnotations;

namespace restaurant_crud_api.Data.DTO.Request
{
    public class TransactionRequest
    {
        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int FoodId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}
