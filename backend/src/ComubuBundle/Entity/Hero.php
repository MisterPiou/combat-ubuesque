<?php

namespace ComubuBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

use ComubuBundle\Entity\User;

/**
 * Hero
 *
 * @ORM\Table(name="hero")
 * @ORM\Entity(repositoryClass="ComubuBundle\Repository\HeroRepository")
 *
 * @Serializer\ExclusionPolicy("all")
 */
class Hero
{
    /**
     * State
     */
    const STATUS_OK = 0;
    const STATUS_DELETED = 1;
    const STATUS_SUSPENDED = 2;
    const STATUS_SELECTED = 3;

    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @Serializer\Expose
     */
    private $id;

    /**
     * Many heroes for One User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="heroes")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=33, unique=true)
     *
     * @Serializer\Expose
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(name="race", type="integer")
     *
     * @Serializer\Expose
     */
    private $race;

    /**
     * @var int
     *
     * @ORM\Column(name="state", type="smallint")
     *
     * @Serializer\Expose
     */
    private $state;

    /**
     * @var int
     *
     * @ORM\Column(name="xp", type="integer")
     *
     * @Serializer\Expose
     */
    private $xp;

    /**
     * @var int
     *
     * @ORM\Column(name="level", type="integer")
     *
     * @Serializer\Expose
     */
    private $level;

    /**
     * @var int
     *
     * @ORM\Column(name="life", type="integer")
     *
     * @Serializer\Expose
     */
    private $life;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set race
     *
     * @param integer $race
     *
     * @return Hero
     */
    public function setRace($race)
    {
        $this->race = $race;

        return $this;
    }

    /**
     * Get race
     *
     * @return int
     */
    public function getRace()
    {
        return $this->race;
    }

    /**
     * Set state
     *
     * @param integer $state
     *
     * @return Hero
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
     * Set xp
     *
     * @param integer $xp
     *
     * @return Hero
     */
    public function setXp($xp)
    {
        $this->xp = $xp;

        return $this;
    }

    /**
     * Get xp
     *
     * @return int
     */
    public function getXp()
    {
        return $this->xp;
    }

    /**
     * Set level
     *
     * @param integer $level
     *
     * @return Hero
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
    }

    /**
     * Get level
     *
     * @return int
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Set life
     *
     * @param integer $life
     *
     * @return Hero
     */
    public function setLife($life)
    {
        $this->life = $life;

        return $this;
    }

    /**
     * Get life
     *
     * @return int
     */
    public function getLife()
    {
        return $this->life;
    }

    /**
     * Set user
     *
     * @param \ComubuBundle\Entity\User $user
     *
     * @return Hero
     */
    public function setUser(\ComubuBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \ComubuBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Hero
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
}
