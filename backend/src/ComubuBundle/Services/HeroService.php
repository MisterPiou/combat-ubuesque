<?php

namespace ComubuBundle\Services;

use Doctrine\ORM\EntityManager;
use ComubuBundle\Entity\User;
use ComubuBundle\Entity\Hero;

/**
 * Description of HeroService
 *
 * @author Piou
 */
class HeroService
{
    protected $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function initHeroSelectedForUser(User $user){
        $hero = $this->em->getRepository("ComubuBundle:Hero")->findOneBy(array(
            'user' => $user,
            'state' => Hero::STATUS_SELECTED
        ));
        $hero->setState(Hero::STATUS_OK);
        $this->em->persist($hero);
        $this->em->flush();
    }
}