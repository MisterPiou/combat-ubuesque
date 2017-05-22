<?php

namespace ComubuBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Route("/hero")
 */
class HeroController extends Controller
{
    /**
     * @Route("/allHeroes")
     */
    public function allHeroesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $heroTest = $em->getRepository("ComubuBundle:Hero")->findAll();

        $serializer = $this->get('serializer');
        $json = $serializer->serialize(
            $heroTest, 'json'
        );

        return new Response($json);
    }
}