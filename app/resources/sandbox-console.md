---
layout: twoColumn
section: resources
type: tool
title:  "Sandbox Console"
description: "Set up bank transfers with Dwolla's ACH API in our developer sandbox environment."
---

# What is a Sandbox Console?

Whether you intend to create traditional Dwolla accounts, view and manage programmatically created Access API Customers, or manipulate the status of transfers initiated by your application, Dwolla provides an interface that helps simplify your development experience.

There are two Sandbox admin consoles designed to support the specific needs of a developer’s application. The key distinction between each console—Access API vs. Transfer—is the type of test user associated with your application. 


<a href="https://sandbox-uat.dwolla.com" target="_blank" class="btn secondary large">Access the Sandbox Console</a>

### Access API Console vs. Transfer Console
Depending on how you interact with test users, you will access the interface specific to your integration type, either the Access API Console (using Sandbox Dashboard) or Transfer Console. As a developer, determine if you intend to manage the entire end-user experience (Access API) or if you want to leverage the Dwolla co-branded user experience and associated Dwolla account (Transfer). Read our [Account Types guide](https://developers.dwolla.com/resources/account-types.html) for more information on the differences between Access API Customers and traditional Dwolla accounts (Transfer accounts). **Note:** The Access API is a premium solution and you will need to work directly with Sales prior to activating in production. For more information about the Access API, please [contact sales](https://www.dwolla.com/contact).

![Screenshot of sandbox home](/images/sandbox-console-home.png "Sandbox Console home screen")

## Managing test users

#### Access API Console - Manage Access API Customers
The [Sandbox Dashboard](https://dashboard-uat.dwolla.com) allows you to manage Customers, as well as transfers associated with the Customers that belong to your Sandbox account. Once your application has created its Customers, you can access the [Sandbox Dashboard](https://dashboard-uat.dwolla.com) to validate that the request was recorded properly in our test environment.

![Screenshot of Access API Console](/images/sandbox-console-wl.png "Access API Console")

#### Transfer Console - Manage traditional Dwolla accounts
Unlike the Access API, you are unable to create accounts from your application. Traditional accounts should be created via Dwolla’s [OAuth account creation](https://developers.dwolla.com/guides/auth/oauth-account-creation.html) experience. However, to simplify the testing process, the Transfer Console allows you to create test Dwolla accounts and associate funding sources. Once the test accounts have been created, your application can facilitate a transfer of funds to, from, or between test accounts once authorization is obtained via [OAuth](https://developers.dwolla.com/guides/auth/authorization-code-flow.html). 

![Screenshot of Transfer Console](/images/sandbox-console-standard.png "Transfer Console")

## Managing test transfers
In either the Access API or Transfer Console, you can view and trigger bank transfer outcomes for transfers created from your application. For more information on transfer statuses, read the [bank transfer workflow](https://developers.dwolla.com/resources/bank-transfer-workflow.html) article.

#### Transfer behavior in the Sandbox

Unlike balance sourced transfers, which are processed instantaneously, bank-sourced transfers exist in the pending state for a few business days until they are `processed`, `failed`, `cancelled`, or `reclaimed`.

The Sandbox environment does not replicate any ACH processes, so a `pending` transfer will not clear or fail automatically after a few business days as it would in production. It will simply remain in the `pending` state indefinitely. Reference the sections below for more information on how-to simulate bank transfer processing in each console.

#### Access API Console - Simulate bank transfer processing

A “Process bank transfers” button is available in the [Sandbox Dashboard](https://dashboard-uat.dwolla.com/). This button allows you to simulate bank transfer processing in the Sandbox. Once the button is clicked, Dwolla will process or fail (see below for how-to trigger ACH failures) the last 500 bank transfers that occurred on your Sandbox account or the Access API Customer accounts you manage. Note: If a bank to bank transaction is initiated between two accounts, you’ll want to click “Process bank transfers” twice in order to process both sides of the transaction (debit and credit). Processing for bank transfers will also include initiated micro-deposits. If your application is [subscribed to webhooks](https://docsv2.dwolla.com/#webhook-subscriptions), notifications will be sent, including all transfer or micro-deposit related events, letting your application know that transfers have processed or failed.

![Screenshot of transfer manipulation](/images/sandbox-dashboard-processing.png "Process bank transfers")

#### Transfer Console - Simulate bank transfer processing

The Transfer Console interface allows you to immediately trigger any of the four possible outcomes for a given transfer: `processed`, `failed`, `cancelled`, `reclaimed`. If subscribed to [webhooks](/guides/webhooks), when a transfer outcome is triggered a webhook will be sent to your server which includes the corresponding created event.

![Screenshot of transfer manipulation](/images/sandbox-console-manipulation.gif "Transfer status manipulation")
