namespace DefaultNamespace;
using System.Security.Cryptography;
using System.Text;

public static class PasswordHelper
{
    public static (byte[] hash, byte[] salt) HashPassword(string password)
    {
        byte[] salt = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000, HashAlgorithmName.SHA256))
        {
            byte[] hash = pbkdf2.GetBytes(32);
            return (hash, salt);
        }
    }

    public static bool VerifyPassword(string password, byte[] hash, byte[] salt)
    {
        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000, HashAlgorithmName.SHA256))
        {
            byte[] hashToCompare = pbkdf2.GetBytes(32);
            return hashToCompare.SequenceEqual(hash);
        }
    }
}