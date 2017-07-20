<?php

namespace ComubuBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

use FOS\RestBundle\Controller\FOSRestController;

use ComubuBundle\Entity\Hero;

/**
 * @Route("/hero")
 */
class HeroController extends FOSRestController
{
    /**
     * @Route("/allHeroes")
     */
    public function allHeroesAction()
    {        
        $heroes = $this->getDoctrine()->getRepository("ComubuBundle:Hero")->findAll();

        $view = $this->view($heroes, 200);
        return $this->handleView($view);
    }

    /**
     * @Route("/getHeroes")
     */
    public function getHeroesAction()
    {
        $heroes = $this->getDoctrine()->getRepository("ComubuBundle:Hero")->findBy(array(
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
        if($hero = $this->getDoctrine()->getRepository("ComubuBundle:Hero")->find($id))
            $view = $this->view($hero, 200);
        else
            $view = $this->view(array("Erreur" => "Ce héros n'existe pas..."), 404);
        
        return $this->handleView($view);
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
            $hero->setUser($this->getUser());

            $em->persist($hero);
            $em->flush();

            $view = $this->view($heroes, 200);
            return $this->handleView($view);
        }

        $view = $this->view(array("Erreur" => "Ton héros n'a pas voulu se joindre à ton équipe..."), 400);
        return $this->handleView($view);
    }

    /**
     * @Route("/deleteHero/{id}")
     */
    public function deleteHero(Request $request, $id)
    {
        if($id)
        {
            $hero = $this->getDoctrine()->getRepository("ComubuBundle:Hero")->find($id);

            $em->remove($hero);
            $em->flush();

            $em = $this->getDoctrine()->getManager();
            $heroes = $em->getRepository("ComubuBundle:Hero")->findAll();

            $view = $this->view($heroes, 200);
            return $this->handleView($view);
        }
        
        $view = $this->view(array("Erreur" => "Ton héros ne veut pas partir de ton équipe..."), 400);
        return $this->handleView($view);
    }

    /**
     * @Route("/numberHeroes")
     */
    public function numberHeroes()
    {
        if($this->getUser()) {
            if($nbHeroes = $this->getDoctrine()->getRepository("ComubuBundle:Hero")->findByUser($this->getUser()))
                $view = $this->view(array("numberHeroes" => count($nbHeroes)), 200);
            else
                $view = $this->view(array("Erreur" => "Nous n'arrivons pas à compter ton équipe..."), 400);
        } else {
            $view = $this->view(array("Erreur" => "Nous n'arrivons pas à compter ton équipe..."), 400);
        }

        return $this->handleView($view);
    }
}