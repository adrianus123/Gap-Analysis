using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace restaurant_crud_api.Models
{
    [Table("transactions")]
    public class Transaction
    {
        [Column("transaction_id")]
        [Required]
        public int TransactionId { get; set; }

        [Column("customer_id")]
        [Required]
        public int CustomerId { get; set; }

        [Column("food_id")]
        [Required]
        public int FoodId { get; set; }

        [Column("quantity")]
        [Required]
        public int Quantity { get; set; }

        [Column("total_price")]
        [Required]
        public decimal TotalPrice { get; set; }

        [Column("transaction_date")]
        [Required]
        public DateTime TransactionDate { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        public Customer Customer { get; set; }

        public Food Food { get; set; }
    }
}
