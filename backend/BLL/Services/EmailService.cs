using AutoMapper;
using backend.BLL.DTO;
using backend.BLL.Interfaces;
using backend.DAL.Interfaces;
using Microsoft.Extensions.Logging;
using DefaultNamespace;
namespace backend.BLL.Services;
using System.Net;
using System.Net.Mail;
public class EmailService : IEmailService
{
    private readonly IConfiguration configuration;

    public EmailService(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    public async Task SendAsync(string to, string subject, string body)
    {
        var host = configuration["Smtp:Host"];
        var port = int.Parse(configuration["Smtp:Port"]);
        var user = configuration["Smtp:User"];
        var password = configuration["Smtp:Password"];
        var from = configuration["Smtp:From"];

        using var client = new SmtpClient(host, port)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(user, password)
        };

        var message = new MailMessage(from, to, subject, body)
        {
            IsBodyHtml = false
        };

        await client.SendMailAsync(message);
    }
}