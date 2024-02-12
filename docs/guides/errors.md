---
description: Responses will appear in many error codes.
title: Errors
tags:
  - 404
  - Forbidden
  - Sucess
---

# Errors

The gateway uses convectional HTTP response codes to indicate the success or failure of an API request. Codes in the **2xx** range indicate success. Codes in the **4xx** range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the **5xx** range indicate an error with Gateway’s servers (these are rare).

Some **4xx** errors that could be handled programmatically (e.g., a card is declined) include an error code that briefly explains the error reported.

## Attributes

| STATUS  |       CODE        |                                                                                          MEANING |
| ------- | :---------------: | -----------------------------------------------------------------------------------------------: |
| **200** |        OK         |                                                                   Everything worked as expected. |
| **$00** |    Bad Request    |                         The request was unacceptable, often due to missing a required parameter. |
| **401** |   Unauthorized    |                                                                       No valid API key provided. |
| **402** |  Request Failed   |                                                The parameters were valid but the request failed. |
| **403** |     Forbidden     |                                     The API key doesn’t have permissions to perform the request. |
| **404** |     Not Found     |                                                            The requested resource doesn’t exist. |
| **409** |     Conflict      |       The request conflicts with another request (perhaps due to using the same idempotent key). |
| **429** | Too many requests | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests. |

## Handling Errors

Our Client libraries raise exceptions for many reasons, such as a failed charge, invalid parameters, authentication errors, and network unavailability. We recommend writing code that gracefully handles all possible API exceptions.

Related Guide: [Error Handlers](#example-handler)

### Example Handler

```js title="Example of how you could handle errors"

Server-side language

Node.js
// Note: Node.js API does not throw exceptions, and instead prefers the
// asynchronous style of error handling described below.
//
// An error from the Gateway API or an otherwise asynchronous error
// will be available as the first argument of any Gateway method's callback:
// E.g. Gateway.customers.create({...}, function(err, result) {});
//
// Or in the form of a rejected promise.
// E.g. Gateway.customers.create({...}).then(
//        function(result) {},
//        function(err) {}
//      );
switch (err.type) {
  case 'GatewayCardError':
    // A declined card error
    err.message; // => e.g. "Your card's expiration year is invalid."
    break;
  case 'GatewayRateLimitError':
    // Too many requests made to the API too quickly
    break;
  case 'GatewayInvalidRequestError':
    // Invalid parameters were supplied to Gateway's API
    break;
  case 'GatewayAPIError':
    // An error occurred internally with Gateway's API
    break;
  case 'GatewayConnectionError':
    // Some kind of error occurred during the HTTPS communication
    break;
  case 'GatewayAuthenticationError':
    // You probably used an incorrect API key
    break;
  default:
    // Handle any other types of unexpected errors
    break;
}
```
