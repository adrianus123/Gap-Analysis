using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Models;

namespace restaurant_crud_api.Interfaces
{
    public interface ITransactionService
    {
        ICollection<Transaction> GetTransactions();
        ResponseAPI<TransactionResponse> GetDetailTransaction(int transactionId);
        ResponseAPI<TransactionResponse> AddTransaction(TransactionRequest request);
        ResponseAPI<TransactionResponse> EditTransaction(int transactionId, TransactionRequest request);
        ResponseAPI<TransactionResponse> DeleteTransaction(int transactionId);
    }
}
