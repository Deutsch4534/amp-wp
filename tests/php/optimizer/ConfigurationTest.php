<?php

namespace Amp\Optimizer;

use Amp\Optimizer\Exception\InvalidConfigurationValue;
use Amp\Optimizer\Exception\UnknownConfigurationKey;
use PHPUnit\Framework\TestCase;

final class ConfigurationTest extends TestCase
{

    public function testDefaultConfiguration()
    {
        $configuration = new Configuration();
        $this->assertTrue($configuration->has(Configuration::KEY_TRANSFORMERS));
        $this->assertFalse($configuration->has('unknown_key'));
        $this->assertEquals(Configuration::DEFAULT_TRANSFORMERS, $configuration->get(Configuration::KEY_TRANSFORMERS));
    }

    public function testUserProvidedConfigurationCanAddKeys()
    {
        $configuration = new Configuration(['custom_key' => 'custom_value']);
        $this->assertTrue($configuration->has(Configuration::KEY_TRANSFORMERS));
        $this->assertTrue($configuration->has('custom_key'));
        $this->assertEquals(Configuration::DEFAULT_TRANSFORMERS, $configuration->get(Configuration::KEY_TRANSFORMERS));
        $this->assertEquals('custom_value', $configuration->get('custom_key'));
    }

    public function testUserProvidedConfigurationCanOverrideKeys()
    {
        $configuration = new Configuration([Configuration::KEY_TRANSFORMERS => ['my_transformer']]);
        $this->assertTrue($configuration->has(Configuration::KEY_TRANSFORMERS));
        $this->assertEquals(['my_transformer'], $configuration->get(Configuration::KEY_TRANSFORMERS));
    }

    public function testUnknownKeyThrowsException()
    {
        $configuration = new Configuration();
        $this->expectException(UnknownConfigurationKey::class);
        $configuration->get('unknown_key');
    }

    public function testInvalidTransformersTypeThrowsException()
    {
        $this->expectException(InvalidConfigurationValue::class);
        $this->expectExceptionMessage("The configuration key 'transformers' expected a value of type 'array', got 'integer' instead.");
        new Configuration([Configuration::KEY_TRANSFORMERS => 42]);
    }

    public function testInvalidTransformersSubTypeThrowsException()
    {
        $this->expectException(InvalidConfigurationValue::class);
        $this->expectExceptionMessage("The configuration value '2' for the key 'transformers' expected a value of type 'string', got 'integer' instead.");
        new Configuration([Configuration::KEY_TRANSFORMERS => ['first_one_is_good', 'second_one_is_good_as_well_but...', 42]]);
    }
}
