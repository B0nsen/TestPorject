using System.Data;
using System.Runtime.CompilerServices;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using backend.BLL.Interfaces;
using backend.BLL.Profiles;
using Microsoft.Extensions.Options;

namespace backend.BLL.Services
{
    public class S3StorageService : IFileStorageService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly AwsOptions _options;
        public S3StorageService(IOptions<AwsOptions> options)
        {
            _options = options.Value;
            _s3Client = new AmazonS3Client(
                _options.AccessKey,
                _options.SecretKey,
                RegionEndpoint.GetBySystemName(_options.Region)
                );
            
        }
        public async Task<string> UploadFileAsync(IFormFile file, string filename)
        {
            using var stream = file.OpenReadStream();

            var request = new PutObjectRequest
            {
                BucketName = _options.BucketName,
                Key = filename,
                InputStream = stream,
                ContentType = file.ContentType
            };

            await _s3Client.PutObjectAsync(request);
            return $"https://{_options.BucketName}.s3.amazonaws.com/{filename}";
        }
        public async Task DeleteFileAsync(string filename)
        {
            var request = new DeleteObjectRequest
            {
                BucketName = _options.BucketName,
                Key = filename
            };
            await _s3Client.DeleteObjectAsync(request);
        }
        public Task<string> GetFileUrlAsync(string filename)
        {
            var url = $"https://{_options.BucketName}.s3.amazonaws.com/{filename}";
            return Task.FromResult(url);
        }
        public string GetPreSignedUrl(string filename, TimeSpan expiry)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _options.BucketName,
                Key = filename,
                Expires = DateTime.UtcNow.Add(expiry)
            };

            return _s3Client.GetPreSignedURL(request);
        }
    }
}
