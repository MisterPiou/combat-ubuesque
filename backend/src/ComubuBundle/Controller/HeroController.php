<?php

namespace ComubuBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as FOSRest;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ComubuBundle\Entity\Hero;

/**
 * @Route("/hero")
 */
class HeroController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @Route("/allHeroes")
     */
    public function allHeroesAction()
    {        
        $em = $this->getDoctrine()->getManager();
        $heroes = $em->getRepository("ComubuBundle:Hero")->findAll();

        $view = $this->view($heroes, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/getHeroes")
     */
    public function getHeroesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $heroes = $em->getRepository("ComubuBundle:Hero")->findBy(array(
            'state' => Hero::STATUS_OK,
            'user' => $this->getUser()
        ));

        $view = $this->view($heroes, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/getHero/{id}")
     */
    public function getHeroAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $hero = $em->getRepository("ComubuBundle:Hero")->find($id);

        $serializer = $this->get('serializer');
        $json = $serializer->serialize(
            $hero, 'json'
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

        throw new HttpException(400);
    }

    /**
     * @Route("/deleteHero/{id}")
     */
    public function deleteHero(Request $request, $id)
    {
        if($id)
        {
            $em = $this->getDoctrine()->getManager();
            $hero = $em->getRepository("ComubuBundle:Hero")->find($id);

            $em->remove($hero);
            $em->flush();

            $em = $this->getDoctrine()->getManager();
            $heroes = $em->getRepository("ComubuBundle:Hero")->findAll();

            $serializer = $this->get('serializer');
            $json = $serializer->serialize(
                $heroes, 'json'
            );

            return new Response($json);
        }

        throw new HttpException(400);
    }
}