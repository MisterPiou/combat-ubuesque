<?php

namespace ComubuBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

use ComubuBundle\Entity\Hero;

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

    /**
     * @Route("/addHero")
     */
    public function addHero(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);

        $name = $request->request->get('name');
        $race = $request->request->get('race');
        if($name && $race)
        {
            $em = $this->getDoctrine()->getManager();
            $hero = new Hero();

            $hero->setName($name);
            $hero->setRace($race);
            $hero->setLevel(1);
            $hero->setState(Hero::STATUS_OK);
            $hero->setXp(0);
            $hero->setLife(100);
            $hero->setUser(null);

            $em->persist($hero);
            $em->flush();

            $serializer = $this->get('serializer');
            $json = $serializer->serialize(
                $hero, 'json'
            );

            return new Response($json);
        }

        return new Response("name: ".$name." - race".$race);
        //throw new HttpException(400, "name: ".$name." - race".$race);
    }
}