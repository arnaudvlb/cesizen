<?php

namespace App\Tests\State;

use App\Entity\Trackers;
use App\Entity\Utilisateurs;
use App\Repository\TrackersRepository;
use App\State\TrackersMeProvider;
use ApiPlatform\Metadata\Operation;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\SecurityBundle\Security;

class TrackersMeProviderTest extends TestCase
{
    public function testTrackersProviderReturnsUser(): void
    {
        $user = new Utilisateurs();

        $expected = [
            new Trackers(),
        ];

        $security = $this->createStub(Security::class);
        $security
            ->method('getUser')
            ->willReturn($user);

        $repository = $this->createMock(TrackersRepository::class);
        $repository
            ->expects($this->once())
            ->method('findBy')
            ->with(['utilisateur' => $user])
            ->willReturn($expected);

        $provider = new TrackersMeProvider(
            $repository,
            $security
        );

        $result = $provider->provide(
            $this->createStub(Operation::class)
        );

        $this->assertSame($expected, $result);
    }

    public function testTrackersProviderWithNoUser(): void
    {
        $security = $this->createStub(Security::class);
        $security->method('getUser')->willReturn(null);

        $repository = $this->createMock(TrackersRepository::class);
        $repository
            ->expects($this->once())
            ->method('findBy')
            ->with(['utilisateur' => null])
            ->willReturn([]);

        $provider = new TrackersMeProvider($repository, $security);

        $result = $provider->provide($this->createStub(Operation::class));

        $this->assertSame([], $result);
    }
}
