using Azure;
using Microsoft.EntityFrameworkCore;
using restaurant_crud_api.Data;
using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Interfaces;
using restaurant_crud_api.Models;

namespace restaurant_crud_api.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly DataContext _context;

        public CustomerService(DataContext context)
        {
            _context = context;
        }

        public ICollection<Customer> GetCustomers()
        {
            try
            {
                return _context.Customers.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ResponseAPI<CustomerResponse> GetDetailCustomer(int customerId)
        {
            try
            {
                if (!IsCustomerExist(customerId))
                {
                    return new ResponseAPI<CustomerResponse>
                    {
                        Message = "Customer not found"
                    };
                }

                var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == customerId);
                var response = new CustomerResponse
                {
                    CustomerId = customer.CustomerId,
                    CustomerName = customer.CustomerName,
                    CustomerAddress = customer.CustomerAddress,
                    CustomerPhone = customer.CustomerPhone,
                };

                return new ResponseAPI<CustomerResponse>
                {
                    Data = response,
                    Message = "Successfully loaded customer data"
                };
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<CustomerResponse> AddCustomer(CustomerRequest request)
        {
            try
            {
                _context.Customers.Add(new Customer
                {
                    CustomerName = request.CustomerName,
                    CustomerAddress = request.CustomerAddress,
                    CustomerPhone = request.CustomerPhone
                });

                _context.SaveChanges();

                return new ResponseAPI<CustomerResponse>
                {
                    Message = "Successfully added customer data"
                };
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<CustomerResponse> EditCustomer(int customerId, CustomerRequest request)
        {
            try
            {
                if (!IsCustomerExist(customerId))
                {
                    return new ResponseAPI<CustomerResponse>
                    {
                        Message = "Customer not found"
                    };
                }

                var customer = _context.Customers.FirstOrDefault(x => x.CustomerId == customerId);
                customer.CustomerName = request.CustomerName;
                customer.CustomerAddress = request.CustomerAddress;
                customer.CustomerPhone = request.CustomerPhone;
                _context.SaveChanges();

                var response = new CustomerResponse
                {
                    CustomerId = customerId,
                    CustomerName = customer.CustomerName,
                    CustomerAddress = customer.CustomerAddress,
                    CustomerPhone = customer.CustomerPhone
                };

                return new ResponseAPI<CustomerResponse>
                {
                    Data = response,
                    Message = "Successfully updated customer data"
                };
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<CustomerResponse> DeleteCustomer(int customerId)
        {
            try
            {
                if (!IsCustomerExist(customerId))
                {
                    return new ResponseAPI<CustomerResponse>
                    {
                        Message = "Customer not found"
                    };
                }

                var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == customerId);
                _context.Customers.Remove(customer);
                _context.SaveChanges();

                return new ResponseAPI<CustomerResponse>
                {
                    Message = "Successfully deleted customer data"
                };
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public bool IsCustomerExist(int customerId)
        {
            return _context.Customers.Any(x => x.CustomerId == customerId);
        }
    }
}
