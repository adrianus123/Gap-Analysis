namespace restaurant_crud_api.Data.DTO
{
    public class ResponseAPI<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }
    }
}
