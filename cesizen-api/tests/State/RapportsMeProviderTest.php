<?php

namespace App\Tests\State;

use App\Entity\Rapports;
use App\Entity\Utilisateurs;
use App\Repository\RapportsRepository;
use App\State\RapportsMeProvider;
use ApiPlatform\Metadata\Operation;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\SecurityBundle\Security;

class RapportsMeProviderTest extends TestCase
{
    public function testRapportsProviderReturnsUser(): void
    {
        $user = new Utilisateurs();

        $expected = [
            new Rapports(),
        ];

        $security = $this->createStub(Security::class);
        $security
            ->method('getUser')
            ->willReturn($user);

        $repository = $this->createMock(RapportsRepository::class);
        $repository
            ->expects($this->once())
            ->method('findBy')
            ->with(['utilisateur' => $user])
            ->willReturn($expected);

        $provider = new RapportsMeProvider(
            $repository,
            $security
        );

        $result = $provider->provide(
            $this->createStub(Operation::class)
        );

        $this->assertSame($expected, $result);
    }

    public function testRapportsProviderWithNoUser(): void
    {
        $security = $this->createStub(Security::class);
        $security->method('getUser')->willReturn(null);

        $repository = $this->createMock(RapportsRepository::class);
        $repository
            ->expects($this->once())
            ->method('findBy')
            ->with(['utilisateur' => null])
            ->willReturn([]);

        $provider = new RapportsMeProvider($repository, $security);

        $result = $provider->provide($this->createStub(Operation::class));

        $this->assertSame([], $result);
    }
}
