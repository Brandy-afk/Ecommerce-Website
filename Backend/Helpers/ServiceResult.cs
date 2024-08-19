namespace ZdyesAPI.Helpers
{
    public class ServiceResult<T>
    {
        public bool IsSuccess { get; set; }
        public T Data { get; set; }
        public Dictionary<string, string[]> Errors { get; set; }

        public ServiceResult(T data)
        {
            IsSuccess = true;
            Data = data;
        }

        public ServiceResult(Dictionary<string, string[]> errors)
        {
            IsSuccess = false;
            Errors = errors;
        }
    }
}
