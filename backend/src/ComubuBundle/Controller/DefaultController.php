<?php

namespace ComubuBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/comubu-data")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        $heroTest = array(array(
            "message" => 'Combat Ubuesque API',
            "etat" => 'ok'
        ));
        
        return new JsonResponse($heroTest);
    }
}
