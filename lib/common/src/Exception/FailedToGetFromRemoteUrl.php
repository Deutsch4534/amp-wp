<?php

namespace AmpProject\Exception;

use Exception;
use RuntimeException;

/**
 * Exception thrown when a remote request failed.
 *
 * @package ampproject/common
 */
final class FailedToGetFromRemoteUrl extends RuntimeException implements AmpException
{

    /**
     * Instantiate a FailedToGetFromRemoteUrl exception for a URL if an HTTP status code is available.
     *
     * @param string $url    URL that failed to be fetched.
     * @param string $status HTTP Status that was returned.
     * @return self
     */
    public static function withHttpStatus($url, $status)
    {
        $message = "Failed to fetch the contents from the URL '{$url}' as it returned HTTP status {$status}.";

        return new self($message);
    }

    /**
     * Instantiate a FailedToGetFromRemoteUrl exception for a URL if an HTTP status code is not available.
     *
     * @param string $url URL that failed to be fetched.
     * @return self
     */
    public static function withoutHttpStatus($url)
    {
        $message = "Failed to fetch the contents from the URL '{$url}'.";

        return new self($message);
    }

    /**
     * Instantiate a FailedToGetFromRemoteUrl exception for a URL if an exception was thrown.
     *
     * @param string    $url       URL that failed to be fetched.
     * @param Exception $exception Exception that was thrown.
     * @return self
     */
    public static function withException($url, Exception $exception)
    {
        $message = "Failed to fetch the contents from the URL '{$url}': {$exception->getMessage()}.";

        return new self($message, null, $exception);
    }
}
