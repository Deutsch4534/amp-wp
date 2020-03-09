<?php

namespace AmpProject\Optimizer;

use AmpProject\Dom\Document;
use AmpProject\Optimizer\Tests\MarkupComparison;
use AmpProject\Optimizer\Tests\TestMarkup;
use AmpProject\RemoteRequest\StubbedRemoteGetRequest;
use PHPUnit\Framework\TestCase;

/**
 * Test the transformation engine as a whole.
 *
 * @package ampproject/optimizer
 */
final class TransformationEngineTest extends TestCase
{
    use MarkupComparison;

    const MINIMAL_HTML_MARKUP           = '<html></html>';
    const MINIMAL_OPTIMIZED_HTML_MARKUP = TestMarkup::DOCTYPE .
                                          '<html i-amphtml-layout="" i-amphtml-no-boilerplate="" transformed="self;v=1"><head>' .
                                          TestMarkup::META_CHARSET .
                                          '<style amp-runtime="" i-amphtml-version="012345678900000">/* v0.css */</style>' .
                                          '</head><body></body></html>';

    /**
     * Provide data to test optimizing a string of HTML.
     *
     * @return array[] Associative array of data arrays.
     */
    public function dataOptimizeHtml()
    {
        return [
            'base_html_conversion' => [
                self::MINIMAL_HTML_MARKUP,
                self::MINIMAL_OPTIMIZED_HTML_MARKUP,
            ],
        ];
    }

    /**
     * Test optimizing a string of HTML.
     *
     * @covers       \AmpProject\Optimizer\TransformationEngine::optimizeHtml()
     * @dataProvider dataOptimizeHtml
     *
     * @param string $source   Source HTML string to optimize.
     * @param string $expected Expected HTML output.
     */
    public function testOptimizeHtml($source, $expected)
    {
        $errors = new ErrorCollection();

        $output = $this->getTransformationEngine()->optimizeHtml($source, $errors);

        $this->assertEqualMarkup($expected, $output);
        $this->assertCount(0, $errors);
    }

    /**
     * Test optimizing a DOM object directly.
     *
     * We're only testing the flow once here, to make sure all typing and plumbing works.
     * All conversion details will be the same as with optimizeHtml, so there's no point
     * in testing everything twice.
     *
     * @covers TransformationEngine::optimizeDom()
     */
    public function testOptimizeDom()
    {
        $dom    = Document::fromHtml(self::MINIMAL_HTML_MARKUP);
        $errors = new ErrorCollection();

        $this->getTransformationEngine()->optimizeDom($dom, $errors);
        $output = $dom->saveHTML();

        $this->assertEqualMarkup(self::MINIMAL_OPTIMIZED_HTML_MARKUP, $output);
        $this->assertCount(0, $errors);
    }

    /**
     * Get the transformation engine instance to test against.
     *
     * @return TransformationEngine Transformation engine instance to test against.
     */
    private function getTransformationEngine()
    {
        return new TransformationEngine(
            new Configuration(),
            new StubbedRemoteGetRequest(TestMarkup::STUBBED_REMOTE_REQUESTS)
        );
    }
}
