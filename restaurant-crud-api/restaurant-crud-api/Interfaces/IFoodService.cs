using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Models;

namespace restaurant_crud_api.Interfaces
{
    public interface IFoodService
    {
        ICollection<Food> GetFoods();
        ResponseAPI<FoodResponse> GetDetailFood(int foodId);
        ResponseAPI<FoodResponse> AddFood(FoodRequest request);
        ResponseAPI<FoodResponse> EditFood(int foodId, FoodRequest request);
        ResponseAPI<FoodResponse> DeleteFood(int foodId);
    }
}
