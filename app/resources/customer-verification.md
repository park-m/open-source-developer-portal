---
layout: twoColumn
section: resources
type: access-api-article
title:  "Customer verification"
description: "How to verify a customer before sending a bank transfer with Dwolla's ACH API."
---

# Customer Verification

This article will walk through the identity verification process for verified Customers within the Access API. For more information on going live with the Access API, please [contact sales](https://www.dwolla.com/contact).

A `Customer` represents an individual or business that intends to send or receive funds on your platform. In any transaction at least one party—either the sender or the recipient—must complete the [identity verification](https://www.dwolla.com/updates/guide-to-cip-customer-identification-program-dwolla-payments-api/) process as outlined in this article. In cases where a Customer is only sending funds to or receiving funds from your full Dwolla account, the Customer is not required to complete the process set out below.

First, you should have an active [webhook subscription](https://docsv2.dwolla.com/#webhook-subscriptions). This active webhook subscription allows information about a Customer’s `status` in the verification process to be sent asynchronously to your application.
## Quick overview
We’ll outline the verification process for both `personal` and `business` Customers.

1. [Personal verified Customer](/resources/customer-verification/personal-verified-customers.html)
 * &#8226; Create a personal verified Customer
 * &#8226; Check the status of the personal Customer
2. [Business verified Customer](/resources/customer-verification/business-verified-customers.html)
 * &#8226; Create a business verified Customer
 * &#8226; Check the status of the business Customer
3. [Handling verification statuses](/resources/customer-verification/handling-verification-statuses.html)
 * &#8226; If necessary, `retry` verification
 * &#8226; If necessary, upload a `document`
 * &#8226; Overview of `suspended` status

* * *

#### View:

* [Personal verified Customers](/resources/customer-verification/personal-verified-customers.html)
* [Business verified Customers](/resources/customer-verification/business-verified-customers.html)
* [Handling verification statuses](/resources/customer-verification/handling-verification-statuses.html)
