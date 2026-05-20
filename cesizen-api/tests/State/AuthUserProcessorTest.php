<?php

namespace App\Tests\State;

use App\Entity\Trackers;
use App\Entity\Utilisateurs;
use App\State\AuthUserProcessor;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\SecurityBundle\Security;

class AuthUserProcessorTest extends TestCase
{
    public function testAuthUserProcess(): void
    {
        $user = new Utilisateurs();

        $security = $this->createStub(Security::class);
        $security
            ->method('getUser')
            ->willReturn($user);

        $em = $this->createMock(EntityManagerInterface::class);

        $em
            ->expects($this->once())
            ->method('persist');

        $em
            ->expects($this->once())
            ->method('flush');

        $processor = new AuthUserProcessor(
            $em,
            $security
        );

        $tracker = new Trackers();

        $result = $processor->process(
            $tracker,
            $this->createStub(Operation::class)
        );

        $this->assertSame(
            $user,
            $tracker->getUtilisateur()
        );

        $this->assertSame($tracker, $result);
    }
}