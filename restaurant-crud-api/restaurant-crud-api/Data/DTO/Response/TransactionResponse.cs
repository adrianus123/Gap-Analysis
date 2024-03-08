namespace restaurant_crud_api.Data.DTO.Response
{
    public class TransactionResponse
    {
        public int TransactionId { get; set; }
        public CustomerResponse Customer { get; set; }
        public FoodResponse Food { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
