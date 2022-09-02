using Hangfire;
using Logic.IHelper;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Services
{
    public interface IEmailServices
    {
        void Send(EmailMessages emailMessage);
        void CallHangfire(EmailMessages emailMessage);
        void SendEmail(string toEmail, string subject, string message);

       
    }
    public class EmailServices: IEmailServices
    {
        private readonly IEmailConfigurationcs _emailConfigurationcs;

        public EmailServices(IEmailConfigurationcs emailConfigurationcs)
        {
            _emailConfigurationcs = emailConfigurationcs;
        }
        public void SendEmail(string toEmail, string subject, string message)
        {
            EmailAddress fromAddress = new EmailAddress()
            {
                Name = "Smartenter Group.",
                Address = "bivisofttest@gmail.com"
            };

            List<EmailAddress> fromAddressList = new List<EmailAddress>
            {
                        fromAddress
            };
            EmailAddress toAddress = new EmailAddress()
            {
                Name = "Smartenter Group. ",
                Address = toEmail
            };
            List<EmailAddress> toAddressList = new List<EmailAddress>
            {
                    toAddress
            };

            EmailMessages emailMessages = new EmailMessages()
            {
                FromAddresses = fromAddressList,
                ToAddresses = toAddressList,
                Subject = subject,
                Content = message


            };
            Send(emailMessages);
           /* CallHangfire(emailMessages);*/
        }

        public void CallHangfire(EmailMessages emailMessages)
        {
            BackgroundJob.Enqueue(() => Send(emailMessages));
        }

        public void Send(EmailMessages emailMessage)
        {
            var message = new MimeMessage();
            message.To.AddRange(emailMessage.ToAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
            message.From.AddRange(emailMessage.FromAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));

            message.Subject = emailMessage.Subject;
            //We will say we are sending HTML. But there are options for plaintext etc. 
            message.Body = new TextPart(TextFormat.Html)
            {
                Text = emailMessage.Content
            };

            //Be careful that the SmtpClient class is the one from Mailkit not the framework!
            using (var emailClient = new SmtpClient())
            {
                emailClient.ServerCertificateValidationCallback = (s, c, h, e) => true;
                // emailClient.Timeout = 30000;
                //emailClient.LocalDomain = "https://localhost:44300";
                //The last parameter here is to use SSL (Which you should!)
                emailClient.Connect(_emailConfigurationcs.SmtpServer, _emailConfigurationcs.SmtpPort, SecureSocketOptions.Auto);

                //Remove any OAuth functionality as we won't be using it. 
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");

                emailClient.Authenticate(_emailConfigurationcs.SmtpUsername, _emailConfigurationcs.SmtpPassword);

                emailClient.Send(message);

                emailClient.Disconnect(true);


            }
           
        }
       /* public void CallHangfire(EmailMessages emailMessage)
        {
            throw new NotImplementedException();
        }*/

        /* public void Send(EmailMessages emailMessage)
         {
             throw new NotImplementedException();
         }*/
    }
}
