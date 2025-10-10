---
title: "Disable automatic SSL website creation"
date: 2025-10-10
author: "Ilia Ross"
weight: 2330005
---

By default, Virtualmin creates an SSL website record in the webserver
configuration and automatically tries to
request a Let’s Encrypt certificate when setting up a new virtual server.

Use the steps below to either create **HTTP-only** site or keep SSL but
**disable ACME** at creation time.

#### HTTP-only website

* In UI
  
  Go to **System Settings → Features and Plugins**, find **Apache SSL website**,
  uncheck **Default?**, and save. On **Create Virtual Server**, leave **Setup
  Apache SSL website** unchecked.

* In CLI
  
  Omit the `--ssl` flag:

  ```text
  virtualmin create-domain \
    --domain domain.tld \
    --pass 'password-for-new-domain' \
    --unix --dir --webmin --web --logrotate
  ```

#### Disable ACME during creation time

* In UI
  
  Go to **System Settings → Server Templates**, select your template, open **SSL
  website for domain**, set **Request SSL certificate from provider at domain
  creation time** to **No**, and save.

* In CLI
  
  Use `--acme-never` with `--ssl`:

  ```text
  virtualmin create-domain \
    --domain domain.tld \
    --pass 'password-for-new-domain' \
    --unix --dir --webmin --web --logrotate \
    --ssl --acme-never
  ```

#### Notes

* Re-enabling **Default?** for **Apache SSL website** hides the checkbox again
  (SSL chained to non-SSL sites).
* After DNS is live, you can enable SSL and request Let’s Encrypt from
  **Manage Virtual Server ⇾ Setup SSL Certificate** page.
