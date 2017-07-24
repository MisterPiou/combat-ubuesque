<?php

namespace ComubuBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Race
 *
 * @ORM\Table(name="race")
 * @ORM\Entity(repositoryClass="ComubuBundle\Repository\RaceRepository")
 */
class Race
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
     * @var Spell
     *
     * @ORM\ManyToMany(targetEntity="Spell")
     * @ORM\JoinTable(name="spells",
     *      joinColumns={@ORM\JoinColumn(name="race_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="spell_id", referencedColumnName="id")}
     *      )
     */
    private $spells;


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
     * @return Race
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
     * @return Race
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
     * Constructor
     */
    public function __construct()
    {
        $this->spells = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add spell
     *
     * @param \ComubuBundle\Entity\Spell $spell
     *
     * @return Race
     */
    public function addSpell(\ComubuBundle\Entity\Spell $spell)
    {
        $this->spells[] = $spell;

        return $this;
    }

    /**
     * Remove spell
     *
     * @param \ComubuBundle\Entity\Spell $spell
     */
    public function removeSpell(\ComubuBundle\Entity\Spell $spell)
    {
        $this->spells->removeElement($spell);
    }

    /**
     * Get spells
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSpells()
    {
        return $this->spells;
    }
}
