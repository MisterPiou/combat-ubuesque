<?php

namespace ComubuBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

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
        $heroTest = array(
            "id" => 1,
            "user_id" => 1,
            "name" => "Bernard",
            "race" => 1,
            "state" => 0,
            "xp" => 0,
            "level" => 1,
            "life" => 100
        );

        $serializer = $this->get('serializer');
        $json = $serializer->serialize(
            $heroTest,
            'json', array('groups' => array('data'))
        );
        
        return new Response($json);
    }
}
