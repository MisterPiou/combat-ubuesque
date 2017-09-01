<?php

namespace ComubuBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use FOS\RestBundle\Controller\FOSRestController;

/**
 * @Route("/user")
 */
class UserController extends FOSRestController
{
    /**
    * @Route("/infosUser")
    */
    function infosUserAction()
    {
        if($this->getUser()) {
            $user = $this->getUser();
            $statusCode = 200;
        } else {
            $user = array("Erreur" => "Cette utilisateur n'existe pas");
            $statusCode = 401;
        }

        $view = $this->view($user, $statusCode);
        return $this->handleView($view);
    }

    /**
     * @Route("/changeMail")
     */
    function changeMailAction(Request $request)
    {
        if($request->isMethod('POST') && $this->getUser()) {
            $userManager = $this->get('fos_user.user_manager');

            $mail = $request->request->get('newMail');
            $user->setToken(sha1(uniqid()));

            $userManager->updateUser($user);
            $statusCode = 200;

            $this->get('comubu.mail.service')->changeEmailMail($user);
            $this->get('comubu.mail.service')->validationEmailMail($user, $mail);
        } else {
            $user = array("Erreur" => "Le formulaire est erroné ou l'utilisateur inexistant");
            $statusCode = 401;
        }

        $view = $this->view($user, $statusCode);
        return $this->handleView($view);
    }

    /**
     * @Route("/validationMail/{token}/{email}")
     */
    function validationMailAction(Request $request, $token, $email)
    {
        if($token && $mail) {

            $user = $this->getDoctrine()->getRepository("ComubuBundle:User")->findByConfirmationToken($token);

            if($user) {
                $user->setConfirmationToken(null);
                $user->setEmail($mail);

                $userManager = $this->get('fos_user.user_manager');
                $userManager->updateUser($user);
                $statusCode = 200;
            }
            else {
                $user = array("Erreur" => "Ce token n'existe pas");
                $statusCode = 401;
            }
        }
        else {
            $user = array("Erreur" => "Données manquantes");
            $statusCode = 401;
        }

        $view = $this->view($user, $statusCode);
        return $this->handleView($view);
    }

    /**
     * @Route("/changePassword")
     */
    function changePasswordAction(Request $request)
    {
        if($request->isMethod('POST') && $this->getUser()) {
            $userManager = $this->get('fos_user.user_manager');

            $password = $request->request->get('newPassword');
            $user->setEmail($password);

            $userManager->updateUser($user);
            $statusCode = 200;
            
            $this->get('comubu.mail.service')->changePasswordMail($user);
        } else {
            $user = array("Erreur" => "Le formulaire est erroné ou l'utilisateur inexistant");
            $statusCode = 401;
        }

        $view = $this->view($user, $statusCode);
        return $this->handleView($view);
    }
}