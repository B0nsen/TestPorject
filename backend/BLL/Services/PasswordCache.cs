namespace DefaultNamespace;

using Microsoft.Extensions.Caching.Memory;
using System;


public class PasswordCache
{
    private readonly MemoryCache _cache = new MemoryCache(new MemoryCacheOptions());

    public void CachePassword(string username, byte[] hash, byte[] salt, TimeSpan expiration)
    {
        var cacheEntry = new CachedPassword { Hash = hash, Salt = salt };
        _cache.Set(username, cacheEntry, expiration);
    }

    public CachedPassword? GetCachedPassword(string username)
    {
        _cache.TryGetValue(username, out CachedPassword cachedPassword);
        return cachedPassword;
    }
}

public class CachedPassword
{
    public byte[] Hash { get; set; } = Array.Empty<byte>();
    public byte[] Salt { get; set; } = Array.Empty<byte>();
}