<?php

namespace ComubuBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

use ComubuBundle\Entity\Hero;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="ComubuBundle\Repository\UserRepository")
 */
class User extends BaseUser
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * One user for Many Heroes
     *
     * @ORM\OneToMany(targetEntity="Hero", mappedBy="user")
     */
    private $heroes;

    /**
     * @var int
     *
     * @ORM\Column(name="state", type="smallint")
     */
    private $state;


    /**
     * Set state
     *
     * @param integer $state
     *
     * @return User
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return int
     */
    public function getState()
    {
        return $this->state;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->heroes = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add hero
     *
     * @param \ComubuBundle\Entity\Hero $hero
     *
     * @return User
     */
    public function addHero(\ComubuBundle\Entity\Hero $hero)
    {
        $this->heroes[] = $hero;

        return $this;
    }

    /**
     * Remove hero
     *
     * @param \ComubuBundle\Entity\Hero $hero
     */
    public function removeHero(\ComubuBundle\Entity\Hero $hero)
    {
        $this->heroes->removeElement($hero);
    }

    /**
     * Get heroes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getHeroes()
    {
        return $this->heroes;
    }
}
