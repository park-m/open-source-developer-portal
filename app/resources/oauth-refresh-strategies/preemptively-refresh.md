---
layout: twoColumn
section: OAuth refresh strategies
type: article
title:  "Preemptively refresh authorization"
weight: 0
description: "Manage OAuth access tokens for Dwolla's bank transfer API: how to preemptively refresh."
---

# OAuth refresh strategies - Transfer

## Preemptively refresh authorization

You set up a cron job that runs in the background every hour to refresh each user account’s OAuth access token. Refreshing authorization would happen behind the scenes as a backend process. You would first query your database for tokens that are about to expire, make a POST request to refresh authorization, and update your database to include the newly refreshed token pair. Note: Be prepared to handle errors gracefully while the cron job is running.
