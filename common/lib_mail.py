"""Mail related utility wrappers.
"""
import keyring
import os
import lib_ldenv as env

from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from smtplib import SMTP

__version__ = "$Revision$"
cfg = env.get_config_object()


def send_mail(recipients, subject, message, sender="noreply@finalyzed.com", attach_file=None):
    """Send email to recepients with attachment if attach file argument is passed."""
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = ';'.join(recipients)

    # That is what u see if dont have an email reader:
    msg.preamble = 'Multipart massage.\n'
    # This is the textual part:
    part = MIMEText(message)
    msg.attach(part)
    # This is the binary part(The Attachment):
    if attach_file:
        part = MIMEApplication(open(attach_file, "rb").read())
        file_name = os.path.basename(attach_file)
        part.add_header('Content-Disposition', 'attachment', filename=file_name)
        msg.attach(part)

    # Send email
    smtp = SMTP(host=cfg.SMTP.HOST, port=cfg.SMTP.PORT)
    passwd = cfg.SMTP.get('PASSWD', keyring.get_password('etl_mail', cfg.SMTP.USER))
    smtp.ehlo()
    smtp.starttls()
    smtp.login(cfg.SMTP.USER, passwd)
    smtp.sendmail(msg['From'], msg['To'], msg.as_string())
    smtp.quit()


if __name__ == "__main__":
    send_mail([ 'rgouda@hotmail.com', ],
              'Test', 'Test Message generated from lib_mail.py script',
              'noreply@finalyzed.com')
    send_mail(['rgouda@hotmail.com', ],
              'Test', 'Test Message generated from lib_mail.py script',
              'noreply@finalyzed.com', attach_file='/path/to/test_file.txt')
