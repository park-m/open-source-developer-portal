---
layout: twoColumn
section: resources
type: archive
title:  "Negative Balances"
weight: 1
description: "Getting started with Dwolla's bank transfer API: Access API accounts."
---
# Negative Balance

When becoming an Access API Customer, it is advised to be educated on potential negative balances.

Dwolla is an agent of its financial institution partners, and as such, all funds associated with your account in the Dwolla network are held in pooled accounts. When a transfer is initiated, funds are taken from this pooled account rather than a pure bank to bank transfer.

<ol class="alerts">
    <li class="alert icon-alert-info">
        If you are an Access API Partner and have a negative balance, please reach out to your Account Manager.
    </li>
</ol>

## API procedures to avoid negative balance exposure

As an Access API Partner, it is possible to avoid negative balances and accumulating subsequent variable costs. While insufficient funds are bound to happen, performing a little due-diligence, one will be able to reduce their exposure to unnecessary risk. Read on to learn a few methods to avoid accumulating a negative balance.

#### Next-day // Same-day

| Clearing Method | ACH Processing    | Risk |
|-----------------|-------------------|------|
|   `standard`    | 3-5 Business Days | Low  |
|   `next-day`    | 1-2 Business Days | High |
|   `same-day`    | Same Business Day | High |

While Next-day and Same-day ACH are fantastic vehicles to move funds in an expedited fashion, they do present an inherent risk at the tradeoff of speed. These two clearing options pull funds immediately and will be available in the `destination` Customer bank without ever going through ACH processing.

You can greatly reduce risk to negative balance exposure by being selective about which of your Verified Customers are using `next-day` and `same-day` clearing. For instance, you could allow Customers to "upgrade" to faster clearing after they have a good track record or have a history of being able to make their payments in full.

Transfer failures when using Next-day or Same-day pose a significant risk. If a transfer fails with an `R01 - Insufficient Funds` return code, there is a high likelyhood of a negative balance. This is due to the fact that a Customer could not cover the transfer within the bank and money needed to be pulled from the `balance` funding source.

#### Balance Check

To hedge against insufficient funds risk on behalf of your Customers, you can perform a balance check to their `bank` funding source. If a Customer has a low bank account balance, you can be aware of this risk prior to initiating a transfer from this Customer.

<ol class="alerts">
    <li class="alert icon-alert-info">
       You must have Balance Check enabled in order to make this API call.
    </li>
</ol>

To learn more about how to perform this API call, feel free to [reference our API docs](https://docsv2.dwolla.com/#retrieve-a-funding-source-balance)

## Fraud checks to avoid negative balance exposure

While Dwolla is great at moving money via ACH, we are not a fraud service and do not offer active fraud monitoring. Thus, we cannot legally provide insight to suspicious transfers or Customers created. Partners, however, can still proactively manage and protect themselves against fraud. When an `R10 - Fraudulent transfer` return code is triggered, funds are automatically returned to the source?

#### Sift Science integration

While Dwolla does not actively monitor fraud, our [Sift Science integration](https://developers.dwolla.com/resources/dwolla-sift-science-integration.html) will help prevent . Integrating is simple and can be enabled via the dashboard.

![Animation of Sift Science Integration](/images/sift-integration.gif "Sift Science Integration")

Sift Science uses machine learning to detect fraudulent accounts and other red flags [in real-time](https://www.dwolla.com/ach/automated-ach-fraud-monitoring). By providing an extensive suite of risk scoring and monitoring, your analysts can better prevent fraud.

#### Application controls

If deciding not to use our Sift Science integration, it is adivsed to implement various controls to prevent application abuse. One such control could be input validation control. By default, Verified personal Customers have a transaction limit of $10,000. If your business does not expect your Customers to transfer large sums of money, it is a good idea to cap your transfer amount. Think of it this way; would a company that facilitates transfers between Customers for string cheese by the furlong need to utilize the $10,000 limit?

## Partner Actions to refund a negative balance

A Partner can attempt to refund a Customer’s negative balance by initiating a transfer from your Customer. To do this, initiate a transfer from your Customer's `bank` funding source to their `balance` funding source. If you are unable to rectify the negative balance your own, Dwolla will eventually take actions from the Partner account to make the balance whole.

## Dwolla actions to refund a negative balance

We understand that insufficient funds or fraud happens. This is just a fact of moving money via ACH. Dwolla will first communicate the outstanding balance to the Partner. If not action is taken by the Partner, Dwolla will then start processing a transfer on Thursday from the Partner billing funding source in an attempt to refund the Verified Customer account. On Friday, the transfer from the Partner billing funding source to the negative balance will be kicked off. The funds will refund the balance in ____ days.

#### Timeline of events

|    Day          |     Action      |
|-----------------|-----------------|
|    Saturday -> Tuesday | Grace period to get your shit together  |
|    Wednesday    | Dwolla notice of impending processing |
|    Thursday     | Dwolla will start **processing** of funds to refund negative balance |
|    Friday       | Dwolla will **pull** funds from Partners' billing funding source in an attempt to refund the negative balance. |


<ol class="alerts">
    <li class="alert icon-alert-info">
       Dwolla reserves the right to pull funds to make negative balances whole
    </li>
</ol>
