---
description: Find out how to authentocate your routes
title: Authentication
tags:
  - Auth
  - Tokens
---

# Authentication

The gateway API uses [API keys](https://payme-dashboard.vercel.app) to authenticate your requests. You can manage all your keys is the [gateway Dashboard](https://payme-dashboard.vercel.app). it is advisable to have different keys for different projects.

Keys have different prefexis depending on the type of project. Test keys have **_pk*test*_** while live keys have **_pk*live*_**

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

## Authenticated Requests

Use your API key by setting it in the initial configuration of stripe. The Node.js library will then automatically send this key in each request. example:

```js title="gateway.js"
const API_KEY = "pk_test_ghYG672HG...s7asjhashh";

var Gateway = require("@gateway/classic");
var gateway = Gateway(API_KEY);
```

You can also set a per-request key with an option. This is often useful for Connect applications that use multiple API keys during the lifetime of a process. Methods on the returned object reuse the same API key.

All API requests must be over [HTTPS](en.wikipedia.org/wiki/HTTP_Secure). Calls made over plain HTTP will fail. API requests without authentication will also fail.

```js title="Per-Request api key"
var charge = await gateway.get("_6yuyLiiC52eZ...Ylo2C1da66ZSQ", {
  apiKey: API_KEY,
});
```

## Responses

Out of the box, reponses from the API are very limited. User has to specifically tell what they want to retrieve from the API in reponse object.

If you followed the steps above you would have git the reponse below

```js title="Example response object"
{
  "id": "ch_3LmzzQ2eZvKYlo2C0XjzUzJV",
  "object": "charge",
  "customer": {
    "id": "cu_14HOpH2eZvKYlo2CxXIM7Pb2",
    "object": "customer"
    // ...
  },
  "invoice": {
    "id": "in_1LmzzQ2eZvKYlo2CpyWn8szu",
    "object": "invoice",
    "subscription": {
      "id": "su_1LmzoG2eZvKYlo2Cpw6S7dAq",
      "object": "subscription"
      // ...
    }
    // ...
  }
  // ...
}
```

### Reponse meanings

1. Outer ID represents the transation ID.
1. Object represents type of request you asked for.
1. Customer object contains information about the customer.
1. invoice object contains information about the invoice.
