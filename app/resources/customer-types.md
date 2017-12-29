---
layout: twoColumn
section: resources
type: archive
title:  "Customer types"
description: "Getting started with Dwolla's bank transfer API."
---
# Customer types

When you are building your application, you’ll want to be aware of the different account types that exist on the Dwolla platform as well as their capabilities.

An Access API Customer is created programmatically by a Partner’s CIP Verified Dwolla account via the `Customers` endpoint. You can reference our developer docs to learn more on how to [create a Customer](https://docsv2.dwolla.com/#create-a-customer) within the API. All required account information will be handled through the API and the Customer will interact directly with the Partner to manage their account.

Regardless of your application type, it’s important to note that in a transfer of money between two parties at least one account must be Customer Identity Program (CIP) verified. It’s your decision about which party completes this process, based on your business model, and you may want to have both parties complete CIP verification. In addition, we also require CIP verification as a part of a customer holding funds in the Dwolla network.

## Access API Customer types

| **Customer Type** | CIP Verification | Dwolla `balance` | Transaction Limit | Transact with |
|------------|-------------|---------------|-------------|---------------|
| **Personal verified Customer** | Required | Yes | $5,000 per **transfer** | Any Customer type |
| **Business verified Customer** | Required | Yes | $10,000 per **transfer** | Any Customer type |
| **Unverified Customer** | Optional | No | $5,000 per **week** | Verified Customers |
| **Receive-only Customer** | Optional | No | N/A | Verified Customers |

## Personal verified Customer

Personal verified Customer's are defined by their ability to both send and receive money to and from any customer type. These Customers are able to hold a `balance` funding source within the Dwolla network. Think of the Dwolla `balance` as a wallet where a Customer can hold, send or receive funds to.

##### Application types applicable

* Pay-outs
* Pay-ins
* Facilitator Pay-out
* Facilitator Pay-in

## Business verified Customer

Business verified Customer's are defined by their ability to both send and receive money to any Customer type. Business verified Customers will need an authorized representative to provide their last four SSN for identity verification purposes. The authorized representative will also need to provide an EIN as a way for Dwolla to prove business identification.

##### Application types applicable

* Pay-outs
* Pay-ins
* Facilitator Pay-out
* Facilitator Pay-in

## Unverified Customer

An Unverified Customer is a third-party-created account that requires a minimal amount of account data: `firstName`, `lastName` and `email`.

**Note:** Unverified Customer accounts have a default sending transaction limit of $5000 per week. A week is defined as Monday to Sunday.

Some things to consider when determining whether to choose between to creating unverified or verified Customers:
How are you handling fraud? What kind of UX do you want? Do people feel comfortable sending their last four ssn?

##### Application types applicable

* Pay-outs
* Pay-ins
* Facilitator Pay-out
* Facilitator Pay-in

## Receive-only Customer

Receive-only Customers are restricted to a “payouts only” business model within the Access API. One advantage this Customer type maintains is that htey do not need to accept any of Dwolla's terms of A receive-only customer maintains limited functionality in the API and is only eligible to receive transfers to an attached bank funding source from the Dwolla Account that created it.

<ol class="alerts">
    <li class="alert icon-alert-info">
        Receive-only Customers cannot send funds back. If you need a refund for any reason, you may need to resolve this outside of the Dwolla network.
    </li>
</ol>

##### Application types applicable

* Pay-outs