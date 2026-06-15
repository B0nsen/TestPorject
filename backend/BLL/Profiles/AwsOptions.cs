namespace backend.BLL.Profiles
{
    public class AwsOptions
    {
        public string AccessKey { get; set; } = null!;
        public string SecretKey { get; set; } = null!;
        public string Region { get; set; } = null!;
        public string BucketName { get; set; } = null!;
    }
}
