using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Models;

namespace restaurant_crud_api.Interfaces
{
    public interface ICustomerService
    {
        ICollection<Customer> GetCustomers();
        ResponseAPI<CustomerResponse> GetDetailCustomer(int customerId);
        ResponseAPI<CustomerResponse> AddCustomer(CustomerRequest request);
        ResponseAPI<CustomerResponse> EditCustomer(int customerId, CustomerRequest request);
        ResponseAPI<CustomerResponse> DeleteCustomer(int customerId);
    }
}
