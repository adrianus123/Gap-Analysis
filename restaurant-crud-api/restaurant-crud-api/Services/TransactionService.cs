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
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ResponseAPI<TransactionResponse> GetDetailTransaction(int transactionId)
        {
            try
            {
                var transaction = _context.Transactions.Include(t => t.Customer).Include(t => t.Food).FirstOrDefault(t => t.TransactionId == transactionId);

                if (transaction != null)
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Data = new TransactionResponse
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
                        },
                        Message = "Successfully loaded data"
                    };
                }
                else
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Transaction not found"
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ResponseAPI<TransactionResponse> AddTransaction(TransactionRequest request)
        {
            try
            {
                var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == request.CustomerId);
                var food = _context.Foods.FirstOrDefault(f => f.FoodId == request.FoodId);

                if (customer == null)
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Customer not found"
                    };
                }
                else if (food == null)
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Food not found"
                    };
                }
                else
                {
                    var newTransaction = new Transaction
                    {
                        Customer = customer,
                        Food = food,
                        Quantity = request.Quantity,
                        TotalPrice = request.Quantity * food.FoodPrice,
                        TransactionDate = DateTime.Now
                    };

                    _context.Transactions.Add(newTransaction);
                    _context.SaveChanges();

                    return new ResponseAPI<TransactionResponse>
                    {
                        Data = new TransactionResponse
                        {
                            TransactionId = newTransaction.TransactionId,
                            Customer = new CustomerResponse
                            {
                                CustomerId = customer.CustomerId,
                                CustomerName = customer.CustomerName,
                                CustomerAddress = customer.CustomerAddress,
                                CustomerPhone = customer.CustomerPhone,
                            },
                            Food = new FoodResponse
                            {
                                FoodId = food.FoodId,
                                FoodName = food.FoodName,
                                FoodPrice = food.FoodPrice,
                            },
                            Quantity = newTransaction.Quantity,
                            TotalPrice = newTransaction.TotalPrice,
                            TransactionDate = newTransaction.TransactionDate
                        },
                        Message = "Successfully added transaction data"
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ResponseAPI<TransactionResponse> EditTransaction(int transactionId, TransactionRequest request)
        {
            try
            {
                var transaction = _context.Transactions.Include(t => t.Customer).Include(t => t.Food).FirstOrDefault(t => t.TransactionId == transactionId);
                if (transaction != null)
                {
                    var food = _context.Foods.FirstOrDefault(f => f.FoodId == request.FoodId);
                    transaction.CustomerId = request.CustomerId;
                    transaction.FoodId = request.FoodId;
                    transaction.Quantity = request.Quantity;
                    transaction.TotalPrice = request.Quantity * food.FoodPrice;
                    transaction.TransactionDate = DateTime.Now;
                    _context.SaveChanges();

                    return new ResponseAPI<TransactionResponse>
                    {
                        Data = new TransactionResponse
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
                        },
                        Message = "Successfully updated transaction data"
                    };
                }
                else
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Transaction not found"
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ResponseAPI<TransactionResponse> DeleteTransaction(int transactionId)
        {
            try
            {
                var transaction = _context.Transactions.FirstOrDefault(t => t.TransactionId == transactionId);
                if (transaction != null)
                {
                    _context.Remove(transaction);
                    _context.SaveChanges();

                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Successfully deleted transaction data"
                    };
                }
                else
                {
                    return new ResponseAPI<TransactionResponse>
                    {
                        Message = "Transaction not found"
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
