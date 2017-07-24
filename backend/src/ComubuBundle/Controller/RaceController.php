<?php

namespace ComubuBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

use FOS\RestBundle\Controller\FOSRestController;

use ComubuBundle\Entity\Race;

/**
 * @Route("/race")
 */
class RaceController extends FOSRestController
{
    /**
     * @Route("/getRaces")
     */
    public function getRacesAction()
    {
        $races = $this->getDoctrine()->getRepository("ComubuBundle:Race")->findAll();

        $view = $this->view($races, 200);
        return $this->handleView($view);
    }
}