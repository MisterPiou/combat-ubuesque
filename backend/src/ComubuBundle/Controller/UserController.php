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
    function infosUser()
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
}