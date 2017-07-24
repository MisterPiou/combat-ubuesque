<?php

namespace ComubuBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use ComubuBundle\Entity\Spell;
use ComubuBundle\Entity\Race;

/**
 * Description of LoadSpellData
 *
 * @author Piou
 */
class LoadSpellRaceData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        /** SBIRE **/
        $spell0 = new Spell();
        $spell0->setName("Frappe");
        $spell0->setInfo("Une giffle des plus banales");
        $spell0->setType(0);
        $spell0->setInfluenceBy(0);
        $spell0->setCooldown(10);
        $spell0->setEffect(5);
        $spell0->setRatio(1.1);
        $manager->persist($spell0);

        /** BARBARE **/
        $spell1 = new Spell();
        $spell1->setName("Kikdatafasse");
        $spell1->setInfo("Gros coup de pied");
        $spell1->setType(0);
        $spell1->setInfluenceBy(0);
        $spell1->setCooldown(20);
        $spell1->setEffect(10);
        $spell1->setRatio(1.1);
        $manager->persist($spell1);

        $spell2 = new Spell();
        $spell2->setName("Krikitu");
        $spell2->setInfo("Cri qui motive le lanceur");
        $spell2->setType(1);
        $spell2->setInfluenceBy(2);
        $spell2->setCooldown(50);
        $spell2->setEffect(30);
        $spell2->setRatio(1.1);
        $manager->persist($spell2);

        $race1 = new Race();
        $race1->setName("Barbare");
        $race1->setInfo("Les barbares Branlarien");
        $race1->addSpell($spell0);
        $race1->addSpell($spell1);
        $race1->addSpell($spell2);
        $manager->persist($race1);

        /** Valkyri **/
        $spell3 = new Spell();
        $spell3->setName("Coude Glyphe");
        $spell3->setInfo("Lance une grosse giffle à l'adversaire");
        $spell3->setType(0);
        $spell3->setInfluenceBy(0);
        $spell3->setCooldown(20);
        $spell3->setEffect(10);
        $spell3->setRatio(1.1);
        $manager->persist($spell3);

        $spell4 = new Spell();
        $spell4->setName("Charmoi");
        $spell4->setInfo("Lance un charme qui pertube l'adversaire");
        $spell4->setType(2);
        $spell4->setInfluenceBy(4);
        $spell4->setCooldown(50);
        $spell4->setEffect(30);
        $spell4->setRatio(1.1);
        $manager->persist($spell4);

        $race2 = new Race();
        $race2->setName("Valkyri");
        $race2->setInfo("Les Valkyris du Bymb Hola");
        $race2->addSpell($spell0);
        $race2->addSpell($spell3);
        $race2->addSpell($spell4);
        $manager->persist($race2);

        /** Voleur **/
        $spell5 = new Spell();
        $spell5->setName("Fourbeur");
        $spell5->setInfo("Donne un petit coup dans le dos (plus efficace pendant timidité) qui pertube l'adversaire");
        $spell5->setType(0);
        $spell5->setInfluenceBy(0);
        $spell5->setCooldown(30);
        $spell5->setEffect(10);
        $spell5->setRatio(1.1);
        $manager->persist($spell5);

        $spell6 = new Spell();
        $spell6->setName("Timiditai");
        $spell6->setInfo("Se fais discret au point de se faire oublier");
        $spell6->setType(4);
        $spell6->setInfluenceBy(3);
        $spell6->setCooldown(50);
        $spell6->setEffect(30);
        $spell6->setRatio(1.1);
        $manager->persist($spell6);

        $race3 = new Race();
        $race3->setName("Voleur");
        $race3->setInfo("Les Voleurs des Scapinery");
        $race3->addSpell($spell0);
        $race3->addSpell($spell5);
        $race3->addSpell($spell6);
        $manager->persist($race3);

        $manager->flush();
    }
}