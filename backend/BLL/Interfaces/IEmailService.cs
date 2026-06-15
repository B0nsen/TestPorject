namespace DefaultNamespace;

using System.Net;
using System.Net.Mail;

public interface IEmailService
{
    Task SendAsync(string to, string subject, string body);
}