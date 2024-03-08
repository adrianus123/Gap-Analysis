using Microsoft.EntityFrameworkCore;
using restaurant_crud_api.Data;
using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Interfaces;
using restaurant_crud_api.Models;

namespace restaurant_crud_api.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly DataContext _context;

        public TransactionService(DataContext context)
        {
            _context = context;
        }

        public ICollection<Transaction> GetTransactions()
        {
            try
            {
                return _context.Transactions.Include(t => t.Customer).Include(t => t.Food).ToList();
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<TransactionResponse> GetDetailTransaction(int transactionId)
        {
            try
            {
                if (!IsTransactionExist(transactionId))
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Transaction not found"
                    };
                }

                var transaction = _context.Transactions.Include(t => t.Customer).Include(t => t.Food).FirstOrDefault(t => t.TransactionId == transactionId);
                var response = new TransactionResponse
                {
                    TransactionId = transaction.TransactionId,
                    Customer = new CustomerResponse
                    {
                        CustomerId = transaction.CustomerId,
                        CustomerName = transaction.Customer.CustomerName,
                        CustomerAddress = transaction.Customer.CustomerAddress,
                        CustomerPhone = transaction.Customer.CustomerPhone
                    },
                    Food = new FoodResponse
                    {
                        FoodId = transaction.FoodId,
                        FoodName = transaction.Food.FoodName,
                        FoodPrice = transaction.Food.FoodPrice,
                    },
                    Quantity = transaction.Quantity,
                    TotalPrice = transaction.TotalPrice,
                    TransactionDate = transaction.TransactionDate
                };

                return new ResponseAPI<TransactionResponse>
                {
                    Data = response,
                    Message = "Successfully loaded data"
                };
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<TransactionResponse> AddTransaction(TransactionRequest request)
        {
            try
            {
                if (!IsCustomerExist(request.CustomerId))
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Customer Not Found"
                    };
                }

                if (!IsFoodExist(request.FoodId))
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Food Not Found"
                    };
                }

                var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == request.CustomerId);
                var food = _context.Foods.FirstOrDefault(f => f.FoodId == request.FoodId);
                _context.Transactions.Add(new Transaction
                {
                    Customer = customer,
                    Food = food,
                    Quantity = request.Quantity,
                    TotalPrice = request.Quantity * food.FoodPrice,
                    TransactionDate = DateTime.Now,
                });
                _context.SaveChanges();

                return new ResponseAPI<TransactionResponse>
                {
                    Message = "Successfully added transaction data"
                };
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<TransactionResponse> EditTransaction(int transactionId, TransactionRequest request)
        {
            try
            {
                if (!IsTransactionExist(transactionId))
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Transaction not found"
                    };
                }

                var transaction = _context.Transactions.Include(t => t.Customer).Include(t => t.Food).FirstOrDefault(t => t.TransactionId == transactionId);
                var food = _context.Foods.FirstOrDefault(f => f.FoodId == request.FoodId);
                transaction.CustomerId = request.CustomerId;
                transaction.FoodId = request.FoodId;
                transaction.Quantity = request.Quantity;
                transaction.TotalPrice = request.Quantity * food.FoodPrice;
                transaction.TransactionDate = DateTime.Now;
                _context.SaveChanges();

                var response = new TransactionResponse
                {
                    TransactionId = transaction.TransactionId,
                    Customer = new CustomerResponse
                    {
                        CustomerId = transaction.CustomerId,
                        CustomerName = transaction.Customer.CustomerName,
                        CustomerAddress = transaction.Customer.CustomerAddress,
                        CustomerPhone = transaction.Customer.CustomerPhone
                    },
                    Food = new FoodResponse
                    {
                        FoodId = transaction.FoodId,
                        FoodName = transaction.Food.FoodName,
                        FoodPrice = transaction.Food.FoodPrice,
                    },
                    Quantity = transaction.Quantity,
                    TotalPrice = transaction.TotalPrice,
                    TransactionDate = transaction.TransactionDate
                };

                return new ResponseAPI<TransactionResponse>
                {
                    Data = response,
                    Message = "Successfully updated transaction data"
                };
            }
            catch (DbUpdateException ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<TransactionResponse> DeleteTransaction(int transactionId)
        {
            try
            {
                if (!IsTransactionExist(transactionId))
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Transaction not found"
                    };
                }

                var transaction = _context.Transactions.FirstOrDefault(t => t.TransactionId == transactionId);
                _context.Remove(transaction);
                _context.SaveChanges();

                return new ResponseAPI<TransactionResponse>
                {
                    Message = "Successfully deleted transaction data"
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
            return _context.Customers.Any(c => c.CustomerId == customerId);
        }

        public bool IsFoodExist(int foodId)
        {
            return _context.Foods.Any(f => f.FoodId == foodId);
        }

        public bool IsTransactionExist(int transactionId)
        {
            return _context.Transactions.Any(t => t.TransactionId == transactionId);
        }
    }
}
