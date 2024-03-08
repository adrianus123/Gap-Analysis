using restaurant_crud_api.Data;
using restaurant_crud_api.Data.DTO;
using restaurant_crud_api.Data.DTO.Request;
using restaurant_crud_api.Data.DTO.Response;
using restaurant_crud_api.Interfaces;
using restaurant_crud_api.Models;

namespace restaurant_crud_api.Services
{
    public class FoodService : IFoodService
    {
        private readonly DataContext _context;

        public FoodService(DataContext context)
        {
            _context = context;
        }

        public ICollection<Food> GetFoods()
        {
            try
            {
                return _context.Foods.ToList();
            }
            catch (Exception ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<FoodResponse> GetDetailFood(int foodId)
        {
            try
            {
                if (!IsFoodExist(foodId))
                {
                    return new ResponseAPI<FoodResponse>
                    {
                        Message = "Food not found",
                    };
                }

                var food = _context.Foods.FirstOrDefault(f => f.FoodId == foodId);
                var response = new FoodResponse
                {
                    FoodId = food.FoodId,
                    FoodName = food.FoodName,
                    FoodPrice = food.FoodPrice
                };

                return new ResponseAPI<FoodResponse>
                {
                    Data = response,
                    Message = "Successfully loaded food data"
                };
            }
            catch (Exception ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<FoodResponse> AddFood(FoodRequest request)
        {
            try
            {
                _context.Foods.Add(new Food
                {
                    FoodName = request.FoodName,
                    FoodPrice = request.FoodPrice
                });
                _context.SaveChanges();

                return new ResponseAPI<FoodResponse>
                {
                    Message = "Successfully added food data"
                };
            }
            catch (Exception ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<FoodResponse> EditFood(int foodId, FoodRequest request)
        {
            try
            {
                if (!IsFoodExist(foodId))
                {
                    return new ResponseAPI<FoodResponse>
                    {
                        Message = "Food not found",
                    };
                }

                var food = _context.Foods.FirstOrDefault(f => f.FoodId == foodId);
                food.FoodName = request.FoodName;
                food.FoodPrice = request.FoodPrice;
                _context.SaveChanges();

                var response = new FoodResponse
                {
                    FoodId = food.FoodId,
                    FoodName = food.FoodName,
                    FoodPrice = food.FoodPrice
                };

                return new ResponseAPI<FoodResponse>
                {
                    Data = response,
                    Message = "Successfully updated food data"
                };
            }
            catch (Exception ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public ResponseAPI<FoodResponse> DeleteFood(int foodId)
        {
            try
            {
                if (!IsFoodExist(foodId))
                {
                    return new ResponseAPI<FoodResponse>
                    {
                        Message = "Food not found",
                    };
                }

                var food = _context.Foods.FirstOrDefault(f => f.FoodId == foodId);
                _context.Remove(food);
                _context.SaveChanges();

                return new ResponseAPI<FoodResponse>
                {
                    Message = "Successfully deleted food data"
                };
            }
            catch (Exception ex)
            {
                var innerException = ex.InnerException;
                throw new Exception(innerException.Message);
            }
        }

        public bool IsFoodExist(int foodId)
        {
            return _context.Foods.Any(f => f.FoodId == foodId);
        }
    }
}
