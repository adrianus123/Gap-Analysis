using System.ComponentModel.DataAnnotations;

namespace restaurant_crud_api.Data.DTO.Response
{
    public class CustomerResponse
    {
        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        public string CustomerAddress { get; set; }

        public string CustomerPhone { get; set; }
    }
}
