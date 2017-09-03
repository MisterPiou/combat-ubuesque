<?php

namespace ComubuBundle\Controller;

use FOS\UserBundle\Controller\RegistrationController as BaseController;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\FOSUserEvents;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Form\FormInterface;
use JMS\Serializer\SerializationContext;

class RegistrationController extends BaseController
{
    /**
     * @Route("/user/register", name="user_register")
     * @Method("POST")
     */
    public function registerAction(Request $request)
    {
        /** @var \FOS\UserBundle\Form\Factory\FactoryInterface */
        $formFactory = $this->get('fos_user.registration.form.factory');
        /** @var \FOS\UserBundle\Model\UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');
        /** @var \Symfony\Component\EventDispatcher\EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $user = $userManager->createUser();
        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

        $response = new Response("{\"erreur\": \"lors de l'inscription (le mail ou le pseudo sont surement déja existant)\"}", Response::HTTP_BAD_REQUEST);

        if (null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $form = $formFactory->createForm(array('csrf_protection' => false));
        $form->setData($user);
        $this->processForm($request, $form);

        if ($form->isValid()) {
            $event = new FormEvent($form, $request);
            $dispatcher->dispatch(
                          FOSUserEvents::REGISTRATION_SUCCESS, $event
                       );

            $user->setConfirmationToken(sha1(uniqid()));
            $userManager->updateUser($user);

            $this->get('comubu.mail.service')->validationMail($user);

            $response = new Response($this->serialize('User created.'), Response::HTTP_CREATED);
        }

        return $this->setBaseHeaders($response);
    }

    /**
     * @param  Request $request
     * @param  FormInterface $form
     */
    private function processForm(Request $request, FormInterface $form)
    {
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            throw new BadRequestHttpException();
        }

        $form->submit($data);
    }

    /**
     * Data serializing via JMS serializer.
     *
     * @param mixed $data
     *
     * @return string JSON string
     */
    private function serialize($data)
    {
        $context = new SerializationContext();
        $context->setSerializeNull(true);

        return $this->get('jms_serializer')
            ->serialize($data, 'json', $context);
    }

    /**
     * Set base HTTP headers.
     *
     * @param Response $response
     *
     * @return Response
     */
    private function setBaseHeaders(Response $response)
    {
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @Route("/user/validation/{token}", name="user_validation")
     */
    private function validationAction(Request $request, $token)
    {
        if(empty($token)) {
            return new Response($this->serialize('No token'), Response::HTTP_BAD_REQUEST);
        }

        $user = $this->getDoctrine()->getRepository("ComubuBundle:User")->findByConfirmationToken($token);

        if(empty($user)) {
            return new Response($this->serialize('Token no exist'), Response::HTTP_BAD_REQUEST);
        }

        $user->setConfirmationToken(null);
        $user->setEnabled(TRUE);

        return new Response($this->serialize('User validated'), Response::HTTP_CREATED);
    }
}