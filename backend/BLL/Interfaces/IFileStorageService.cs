namespace backend.BLL.Interfaces
{
    public interface IFileStorageService
    {
        Task<string> UploadFileAsync(IFormFile file, string filename);
        Task DeleteFileAsync(string filename);

    }
}
