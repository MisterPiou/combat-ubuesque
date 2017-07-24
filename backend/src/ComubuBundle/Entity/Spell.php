<?php

namespace ComubuBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Spell
 *
 * @ORM\Table(name="spell")
 * @ORM\Entity(repositoryClass="ComubuBundle\Repository\SpellRepository")
 */
class Spell
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=45)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="info", type="string", length=255)
     */
    private $info;

    /**
     * @var int
     *
     * @ORM\Column(name="type", type="smallint")
     */
    private $type;

    /**
     * @var int
     *
     * @ORM\Column(name="influenceBy", type="smallint")
     */
    private $influenceBy;

    /**
     * @var int
     *
     * @ORM\Column(name="cooldown", type="integer")
     */
    private $cooldown;

    /**
     * @var int
     *
     * @ORM\Column(name="effect", type="integer")
     */
    private $effect;

    /**
     * @var float
     *
     * @ORM\Column(name="ratio", type="float")
     */
    private $ratio;


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
     * Set name
     *
     * @param string $name
     *
     * @return Spell
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

    /**
     * Set info
     *
     * @param string $info
     *
     * @return Spell
     */
    public function setInfo($info)
    {
        $this->info = $info;

        return $this;
    }

    /**
     * Get info
     *
     * @return string
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * Set type
     *
     * @param integer $type
     *
     * @return Spell
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set influenceBy
     *
     * @param integer $influenceBy
     *
     * @return Spell
     */
    public function setInfluenceBy($influenceBy)
    {
        $this->influenceBy = $influenceBy;

        return $this;
    }

    /**
     * Get influenceBy
     *
     * @return int
     */
    public function getInfluenceBy()
    {
        return $this->influenceBy;
    }

    /**
     * Set cooldown
     *
     * @param integer $cooldown
     *
     * @return Spell
     */
    public function setCooldown($cooldown)
    {
        $this->cooldown = $cooldown;

        return $this;
    }

    /**
     * Get cooldown
     *
     * @return int
     */
    public function getCooldown()
    {
        return $this->cooldown;
    }

    /**
     * Set effect
     *
     * @param integer $effect
     *
     * @return Spell
     */
    public function setEffect($effect)
    {
        $this->effect = $effect;

        return $this;
    }

    /**
     * Get effect
     *
     * @return int
     */
    public function getEffect()
    {
        return $this->effect;
    }

    /**
     * Set ratio
     *
     * @param float $ratio
     *
     * @return Spell
     */
    public function setRatio($ratio)
    {
        $this->ratio = $ratio;

        return $this;
    }

    /**
     * Get ratio
     *
     * @return float
     */
    public function getRatio()
    {
        return $this->ratio;
    }
}
