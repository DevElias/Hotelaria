<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

use PHPMailer\PHPMailer;

require(dirname(__FILE__).'/../../vendor/phpmailer/phpmailer/src/PHPMailer.php');
require(dirname(__FILE__).'/../../vendor/phpmailer/phpmailer/src/SMTP.php');
require(dirname(__FILE__).'/../../vendor/phpmailer/phpmailer/src/POP3.php');
require(dirname(__FILE__).'/../../vendor/phpmailer/phpmailer/src/Exception.php');

class Mail extends Model
{
    private $mail;
    private $from;

    function __construct()
    {
        $this->mail = new PHPMailer\PHPMailer();

        $this->mail->isSMTP();
        $this->mail->Host = env('MAIL_HOST');
        $this->mail->Port = env('MAIL_PORT');
        $this->mail->SMTPSecure = env('MAIL_ENCRYPTION');
        $this->mail->SMTPAuth = true;
        $this->mail->Username = env('MAIL_USERNAME');
        $this->mail->Password = env('MAIL_PASSWORD');

        $this->from = (object)
        [
            'email' => env('MAIL_FROM_ADDRESS'),
            'name'  => env('MAIL_FROM_NAME')
        ];
    }
    
    /**
     * sendMessage
     * Send email message
     * @param  array $recipients [['email', 'name']]
     * @param  string $subject Message subject
     * @param  string $message Message content
     * @param  boolean $isHtml If the message format is html
     * @param  array $attachmets [['path', 'name|null', 'encoding|null', 'type|null']]
     * @return object
     */
    public function sendMessage($recipients, $subject, $message, $isHtml=TRUE, $attachmets=[])
    {
        //Recipients
        $this->mail->setFrom($this->from->email, $this->from->name);

        $this->mail->isHTML($isHtml);
        $this->mail->Subject = $subject;

        // Content
        $this->mail->Body = $message;

        //Attachment
        if(is_array($attachmets) && !empty($attachmets))
        {
            foreach($attachmets as $attachmet)
            {
                if(is_array($attachmet) && !empty($attachmet[0]))
                {
                    $this->mail->addAttachment($attachmet[0], $attachmet[1]??NULL, $attachmet[2]??NULL, $attachmet[3]??NULL);
                }else
                {
                    return (object) ['error' => TRUE, 'response' => 'Erro ao anexar arquivo!'];
                }
            }
        }
        
        foreach($recipients as $recipient)
        {
            $this->mail->addAddress($recipient[0], utf8_decode($recipient[1]));
        }

        $send = $this->mail->send();

        $this->mail->ClearAllRecipients();
        $this->mail->ClearAttachments();
        
        if(!$send)
        {
            return (object) ['error' => TRUE, 'response' => $this->mail->ErrorInfo];
        }
        else
        {
            return (object) ['error' => FALSE, 'response' => 'Mensagem enviada!'];
        }
    }
}