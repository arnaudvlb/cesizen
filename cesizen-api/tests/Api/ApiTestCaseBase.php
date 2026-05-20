<?php

namespace App\Tests\Api;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

abstract class ApiTestCaseBase extends ApiTestCase
{
    protected static ?bool $alwaysBootKernel = true;
}