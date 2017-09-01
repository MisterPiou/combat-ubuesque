<?php

namespace ComubuBundle\Services;

use ComubuBundle\Entity\User;

/**
 * Description of newPHPClass
 *
 * @author Piou
 */
class MailService
{
    private $mailer;
    private $templating;

    public function __construct(\Swift_Mailer $mailer, $templating)
    {
        $this->mailer = $mailer;
        $this->templating = $templating;
    }

    private function sendMail($to, $subject, $body)
    {
        $message = (new \Swift_Message($subject))
            ->setFrom("mrpiou@MrPiou-Debian.dev")
            ->setTo($to)
            ->setBody($body);

        $this->mailer->send($message);
    }

    public function validationMail(User $user)
    {
        $to = $user->getEmail();
        $subject = "Validation du compte";
        $body = $this->templating->render('mails/validation.html.twig', array(
            'user' => $user
        ));

        $this->sendMail($to, $subject, $body);
    }

    public function changePasswordMail(User $user)
    {
        $to = $user->getEmail();
        $subject = "Changement de mot de passe";
        $body = $this->templating->render('mails/change-password.html.twig', array(
            'user' => $user
        ));

        $this->sendMail($to, $subject, $body);
    }

    public function changeEmailMail(User $user)
    {
        $to = $user->getEmail();
        $subject = "Changement d'adresse email";
        $body = $this->templating->render('mails/change-email.html.twig', array(
            'user' => $user
        ));

        $this->sendMail($to, $subject, $body);
    }

    public function validationEmailMail(User $user, $mail)
    {
        $to = $user->getEmail();
        $subject = "Validation d'adresse email";
        $body = $this->templating->render('mails/validation-email.html.twig', array(
            'user' => $user,
            'mail' => $mail
        ));

        $this->sendMail($to, $subject, $body);
    }
}