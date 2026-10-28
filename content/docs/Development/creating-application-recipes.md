---
title: "Creating Application Recipes"
date: "2026-10-28"
author: "Ilia Ross"
weight: 4010030
edition: "pro"
---

A recipe is a JSON file that tells the [Podman plugin](/docs/plugins/podman/) which images to run, where to store data, and how to set up an application. You do not need to write a Webmin module.

This guide covers Podman plugin 2.1. Create and test recipes as a master administrator on a test server. Recipe files can run commands inside containers, so install only definitions you trust.

## Start with a small recipe

Save this as `my-nginx.json`. It runs the [unprivileged NGINX image](https://github.com/nginx/docker-nginx-unprivileged) and serves its welcome page through the virtual server's website.

```json
{
  "id": "my-nginx",
  "name": "My NGINX",
  "description": "A small web server for testing a custom recipe.",
  "categories": ["web_server", "development"],
  "required_runtime": "rootless",
  "app_port": 8080,
  "secrets": [],
  "default_variant": "default",
  "variants": [
    {
      "id": "default",
      "components": [
        {
          "role": "application",
          "image": "ghcr.io/nginx/nginx-unprivileged:stable-alpine"
        }
      ]
    }
  ]
}
```

`app_port` is the port **inside the container**. Virtualmin chooses a free host port, binds it to host loopback, and sets up the website's reverse proxy. Visitors use the domain's usual HTTP or HTTPS URL.

A **variant** is one complete installation choice, such as MariaDB or PostgreSQL. A **component** is one container in that choice. One component creates a standalone container; two or more create a pod. Every variant must have exactly one `application` component.

The example has no database, login, or persistent files. Add those only when your application needs them. For a production recipe, choose an image version you have tested; use a digest when you need an exact, unchanged image.

## Where to put the file

Local recipes belong on the **Virtualmin server** in:

```text
/etc/webmin/virtualmin-podman/recipes/
```

Run these commands as root on your test server, from the directory containing `my-nginx.json`:

```sh
install -d -o root -g root -m 0755 /etc/webmin/virtualmin-podman/recipes
install -o root -g root -m 0644 my-nginx.json /etc/webmin/virtualmin-podman/recipes/my-nginx.json
```

The filename must match `id`: `my-nginx` needs `my-nginx.json`. The directory and file must be owned by the Webmin process user, normally root, and must not be writable by other users or groups. Symlinks and files over 1 MiB are rejected.

Choose a new ID while testing. A local file with the same ID as a built-in recipe **replaces that recipe in the catalog**. Local files survive plugin updates.

Refresh **Manage Container Apps ⇾ Available Recipes** to see the new entry. You do not need to restart Webmin. The recipe is available to users allowed to manage recipes; set `master_only` to `true` to limit deployment to master administrators.

## Test, change, and remove it

1. Create a separate test virtual server, such as `recipes.example.com`. Use a domain you control that resolves to the test server.
2. Enable its website and **Podman containers** feature. Keep its website root free of other applications and reverse proxies.
3. Open **Manage Container Apps ⇾ Available Recipes**, select **My NGINX**, and choose **Configure Selected Application**.
4. Set the deployment name to `my-nginx-test`, then deploy. Open the displayed URL and check for the NGINX welcome page.
5. Check the container's logs. Stop and start it, and confirm the page still works. If you add storage, confirm that your files survive a restart and container replacement.

You can also check and deploy from the server's command line. Replace `recipes.example.com` with your test domain:

```sh
python3 -m json.tool /etc/webmin/virtualmin-podman/recipes/my-nginx.json >/dev/null
virtualmin list-application-recipes --domain recipes.example.com --recipe my-nginx --multiline
virtualmin deploy-application-recipe --domain recipes.example.com --recipe my-nginx --name my-nginx-test
```

The first command checks JSON syntax. The second loads the recipe and reports whether it can be deployed; it does not install the application. The third performs the deployment. Add `--variant` when testing a different installation choice.

Before sharing a recipe, test every variant and, if domain owners may use it, deploy through an owner's account too. Check that database ports remain private and that an intentional setup failure reports an error and removes the resources created by that attempt.

Editing the JSON file does **not** change running containers. To test a revised definition, delete the test deployment and deploy it again. This command also deletes that deployment's persistent data:

```sh
virtualmin delete-application-recipe --domain recipes.example.com --recipe my-nginx --name my-nginx-test
```

Use `--keep-data` only when you want to retain that data. Retained storage reserves the deployment name, so use a new name for the next test. `--delete-existing-storage` on the deploy command permanently removes retained data before a fresh install; it is not a way to reuse an existing database.

When finished, delete the test deployment **before** removing its recipe file:

```sh
rm /etc/webmin/virtualmin-podman/recipes/my-nginx.json
```

Refresh the catalog to remove the entry. Downloaded images remain cached and can be removed separately through **Manage Downloaded Images**.

### If the recipe does not appear

Check the filename, JSON syntax, ownership, and permissions first. Use the option names below; a JSON syntax check cannot catch misspelled fields. A rejected definition is logged with `virtualmin-podman recipe ignored` and its reason. Find the Webmin error log with:

```sh
grep '^errorlog=' /etc/webmin/miniserv.conf
```

A valid recipe with unmet requirements stays listed. Its installation page explains the problem and hides the deploy button. For startup failures, read the deployment error and container logs.

## Recipe options

These fields go at the top level of the JSON file. Use JSON booleans (`true` and `false`) for switches unless a field below explicitly requires `1` or `0`.

### Basic fields

| Field | What it does |
|---|---|
| `id` | Required. Unique ID, up to 40 lowercase letters, numbers, or dashes. Start with a letter or number. It also names the JSON file. |
| `name` | Required. Application name shown in the catalog. |
| `description` | Required. Short, plain-text explanation of the application. |
| `categories` | Required array. Groups the app in the catalog, for example `["monitoring"]`. An empty array is allowed. |
| `required_runtime` | Required. `rootless` runs Podman as the domain owner and keeps the image's user. `uid` uses rootful Podman but runs the application as the domain UID and GID. |
| `app_port` | Required. Main container TCP port, from 1 to 65535. This does not make the application listen on that port. |
| `secrets` | Required array. Names of random passwords or keys to generate for each deployment. Use `[]` when none are needed. |
| `variants` | Required, nonempty array of installation choices. Each has its own component list. |
| `default_variant` | ID selected initially. Defaults to `default`, which must exist if you omit this field. |
| `variant_type` | Labels a multi-variant selector: `database` by default, or `stack`. Omit it when variants offer different connection modes. |
| `version` | Optional application version for display. It does not select the container image version. |
| `url_path` | Landing page shown after deployment, such as `/admin/`. Defaults to `/`. The reverse proxy still owns the whole website root. |

Choose `rootless` for images that expect to start as container root or manage their own users. Domain owners can deploy only recipes compatible with the administrator's configured runtime. Master administrators can select the recipe's required runtime.

### Host requirements and access

| Field | What it does |
|---|---|
| `architectures` | Optional list of supported image architectures, such as `["amd64", "arm64"]`. Omit it to skip this recipe-level restriction. |
| `required_quota_bytes` | Minimum remaining domain disk quota. |
| `required_free_disk_bytes` | Minimum free space on the filesystem containing the domain home. |
| `required_available_memory_bytes` | Minimum available memory plus free swap. |
| `required_ipv6` | Require the kernel to create IPv6 sockets. No public IPv6 address is needed. Defaults to `false`. |
| `required_vm_max_map_count` | Minimum host `vm.max_map_count`, used by apps such as OpenSearch. The recipe checks it but does not change it. |
| `master_only` | Allow only master administrators to deploy this recipe. Defaults to `false`. |
| `terminal` | Set to `false` for images without an interactive shell. Hides browser terminal actions; logs and lifecycle controls remain. |

Resource minimums are checks before installation, not limits on later use. Values are in bytes: `1073741824` is 1 GiB. Leave an optional minimum unset when the application does not need it.

### Login, secrets, and handoff

| Field | What it does |
|---|---|
| `initial_login` | Adds initial username and password fields. Your image or initialization command must actually create the account. See below. |
| `secret_bytes` | Sets random byte counts for declared secrets, for example `{"app_key": 32}`. Each byte produces two text characters; allowed counts are 10–256. |
| `credentials` | Label/value pairs shown after deployment, such as `["recipes_credential_password", "{{admin_password}}"]`. Include only credentials users need. |
| `smtp` | Set to `true` to show outgoing-mail fields and provide the SMTP placeholders below. Your recipe must pass them to the application. |
| `virtualmin_mysql` | Set to `1` to show a MySQL/MariaDB server and port selector. Supplies `mysql_host` and `mysql_port`; it does not create a database or grant access to host loopback. |
| `post_install` | Array of short, plain-text instructions shown after deployment and on the installed recipe page. No HTML or secret placeholders. |
| `additional_ports` | Extra fixed host listeners. Each object needs `host_port`, `container_port`, and `protocol` (`tcp` or `udp`). Requires `master_only: true`. |

Generated secrets normally contain 48 characters. A secret displayed with a password credential label uses 24 unless `secret_bytes` overrides it. The install form separately fills in a 24-character login password, which users can edit. `secret_bytes` does not change that form value. Use lower-case names such as `db_password` so they can be expanded as placeholders.

## Variant options

Each object in `variants` has these fields:

| Field | What it does |
|---|---|
| `id` | Required, unique within the recipe. Uses the same naming rules as the recipe ID. |
| `components` | Required list of containers, in startup order. Put databases and caches before the application. |
| `label_key` | Optional existing module translation key, such as `recipes_db_mariadb`. Without a matching key, the selector shows the variant ID. |
| `description` | Short note shown below the selector for this variant. |
| `exposure` | `web` (default), `loopback`, or `direct`. See the connection modes below. |
| `app_port` | Overrides the recipe's main container port for this variant. |
| `connection_scheme` | Adds a scheme such as `http` or `https` to a loopback or direct connection address. Does not enable TLS inside the image. |
| `connection_path` | Adds a path such as `/login` to that address. Use a path starting with `/`. |
| `post_install` | Replaces the recipe-level instructions for this variant. An empty array hides them. |
| `pod_sysctls` | Limited pod settings for multi-container rootless recipes. Currently only `net.ipv4.ping_group_range` is supported. |

### Connection modes

| Mode | How users connect |
|---|---|
| `web` | Through the domain's website. Virtualmin binds the backend port to `127.0.0.1` and configures the reverse proxy. The image must serve HTTP on `app_port`; the website handles public HTTPS. |
| `loopback` | Through an allocated port on the **host's** `127.0.0.1`. No website or reverse proxy is required. This controls incoming connections; it does not grant the container access to host-local services. |
| `direct` | Through the domain name and the fixed `app_port` on the host. No reverse proxy is created. Requires `master_only: true`; arrange firewall access and any TLS inside the application. |

Different exposures automatically label the selector as a connection choice. Do not also set `variant_type`. A `loopback` variant cannot use `additional_ports`. Extra ports on other variants are direct listeners, not reverse-proxied services.

## Component options

Every object in a variant's `components` array describes one container:

| Field | What it does |
|---|---|
| `role` | Required. `application`, `database`, `cache`, `service`, `worker`, or `scheduler`. Exactly one must be `application`; it owns the main endpoint. |
| `image` | Required. Full image reference, including registry and tag or digest. |
| `suffix` | Required and unique when there is more than one component. A deployment named `myapp` with suffix `db` creates `myapp-db`. |
| `envs` | Array of `NAME=value` environment variables. Values may contain placeholders. |
| `volumes` | Writable persistent directories. Each entry is `["folder", "/container/path"]`, optionally followed by a numeric `"UID:GID"`. |
| `ready` | Command and arguments run inside the container until exit status is zero. Without it, Virtualmin checks that the container is running. |
| `ready_timeout` | Readiness timeout in seconds, 1–600. Defaults to 120. |
| `initialize` | Setup command and arguments run during initial deployment. Failed attempts are retried, so make the command safe to repeat. |
| `initialize_timeout` | Setup timeout in seconds, 1–600. Defaults to 120. |
| `initialize_before_dependents` | Set to `1` to run this component's `initialize` command immediately after readiness, before creating later components. Requires `initialize`. |
| `restart_after_initialize` | Set to `1` when the container must restart to read the configuration written by `initialize`. |
| `start_after_initialize` | Set to `1` to start a worker or scheduler after application setup. Deferred components must come last. Do not combine with `initialize_before_dependents`. |
| `command` | Text replacing the image's default command arguments. Keeps the image's entrypoint unless you replace that too. |
| `entrypoint` | Text replacing the image's entrypoint. Use only when the image's normal startup needs replacing. |
| `cap_adds` | For rootless recipes only. A nonempty list replaces Podman's default capabilities; it does not merely add to them. |
| `version_source` | Set to `true` on one component to use its image metadata for the installed application version. Otherwise, the application component is used. |

`ready` and `initialize` are argument arrays, for example `["healthcheck.sh", "--connect"]`. Use `["/bin/sh", "-c", "..."]` only when shell syntax is needed and the image includes that shell. Pass passwords as separate command arguments where possible; placeholder expansion does not escape shell scripts or SQL.

After the normal components start, Virtualmin checks the published TCP port and, for web recipes, an HTTP response. It then runs remaining initialization commands and starts deferred workers. An HTTP response alone does not prove the app is healthy; use `ready` for an application-specific check.

### Persistent files

This fragment adds a persistent web root to the NGINX component above:

```json
{
  "volumes": [["webroot", "/usr/share/nginx/html", "101:101"]],
  "initialize": [
    "/bin/sh",
    "-c",
    "if [ ! -e /usr/share/nginx/html/index.html ]; then echo 'My recipe works' > /usr/share/nginx/html/index.html; fi"
  ]
}
```

Merge these fields into the component; this fragment is not a complete recipe. The host directory becomes `<domain-home>/containers/<deployment-name>/webroot`. It starts empty and hides any image files at the mount point, so the setup command writes an initial page without overwriting an existing one.

The optional `101:101` gives that directory to NGINX's container UID and GID. In rootless mode, Virtualmin maps those IDs through Podman; they are not literal host account IDs. Omit the owner when the image handles its own directory ownership. The owner setting is applied only in rootless mode.

### Databases and background services

Add components for the database, cache, or worker, each with a unique suffix. Virtualmin creates a pod automatically, so its members can reach one another on `127.0.0.1` and their normal service ports. They must not try to listen on the same port. Use this shared address rather than assuming a Compose-style hostname such as `db` exists.

Use the same secret placeholder in the database and app settings, for example `{{db_password}}`. Give database storage its own volume, and use a database readiness command before starting the app. Do not add the database port to `additional_ports` for an internal database.

See the built-in [WordPress recipe](https://github.com/virtualmin/virtualmin-podman/blob/main/recipes/wordpress.json) for a private database, and [phpIPAM recipe](https://github.com/virtualmin/virtualmin-podman/blob/main/recipes/phpipam.json) for a scanner that starts after initialization.

### Capabilities and ping

Leave `cap_adds` out unless the image needs an explicit capability set. Supported names are `CHOWN`, `DAC_OVERRIDE`, `FOWNER`, `FSETID`, `KILL`, `NET_BIND_SERVICE`, `NET_RAW`, `SETFCAP`, `SETGID`, `SETPCAP`, `SETUID`, and `SYS_CHROOT`. The module's capability allow-list still applies.

For a rootless pod, `"pod_sysctls": {"net.ipv4.ping_group_range": "101 101"}` permits group 101 to open ping sockets inside that pod. The two IDs must be ordered and within 0–65535. It does not change host settings. `NET_RAW` permits raw network sockets inside the container's network namespace; neither option restricts which reachable networks an app can scan.

## Initial administrator login

For an image with supported account-creation settings, add these recipe-level fields:

```json
{
  "secrets": ["admin_password"],
  "initial_login": {
    "username_key": "admin_username",
    "password_key": "admin_password",
    "username_default": "admin"
  },
  "credentials": [
    ["recipes_credential_username", "{{admin_username}}"],
    ["recipes_credential_password", "{{admin_password}}"]
  ]
}
```

Merge these fields into your recipe, keeping any other secrets it already declares. Then pass `{{admin_username}}` and `{{admin_password}}` to the image's documented environment variables or setup command. Adding `initial_login` alone does not create an account. Do not enable this in the NGINX example, which has no login system.

| Field inside `initial_login` | What it does |
|---|---|
| `username_key` | Placeholder name for the username. Defaults to `admin_username`. |
| `password_key` | Placeholder name for the password. Defaults to `admin_password`; include it in `secrets`. |
| `username_default` | Initial username shown in the form. Defaults to `admin`; can use `{{domain}}` or `{{contact_email}}`. |
| `username_fixed` | Set to `true` when the app requires a fixed username. Hides username editing. |
| `username_lowercase` | Converts the username to lowercase before use. |
| `username_min_length`, `username_max_length` | Username length limits, each 1–64. Defaults are 1 and 64. |
| `password_only` | Set to `true` for an app that asks only for a password. No username placeholder is supplied. |
| `password_min_length` | Minimum password length, 8–128. Defaults to 8; the maximum accepted length is 128. |
| `email_key` | Adds a separate email field and names its placeholder. |
| `email_default` | Initial account email. Defaults to `{{contact_email}}`. |
| `email_lowercase` | Converts the account email to lowercase before use. |

## Placeholders

Use double braces, such as `{{domain}}`, in `envs`, `ready`, `initialize`, `command`, `entrypoint`, and credential values. Unknown placeholders cause a deployment error. Images and volume paths are not template fields.

| Placeholder | Value |
|---|---|
| `{{name}}` | Deployment name, such as `my-nginx-test`. |
| `{{domain}}` | Virtual server's domain name. |
| `{{contact_email}}` | Domain contact email, or `admin@<domain>` when unset. |
| `{{scheme}}` | `https` when the domain has an SSL website, otherwise `http`. |
| `{{url}}` | Domain-root URL with a trailing slash. Does not include `url_path`. |
| `{{url_no_trailing}}` | The same URL without the final slash. |
| `{{url_path}}` | Recipe's landing path, or `/`. |
| `{{secure_cookie}}` | Text `true` for an SSL website, otherwise `false`. Use with the app's HTTPS-cookie or HTTPS setting. |
| `{{storage}}` | Host path `<domain-home>/containers/<deployment-name>`. Containers see their declared mount destinations instead. |
| `{{db_password}}`, or another declared secret | A value generated for this deployment and reused wherever that name appears. |
| Login placeholders | Values named by `initial_login`, such as `{{admin_username}}` and `{{admin_password}}`. |
| `{{mysql_host}}`, `{{mysql_port}}` | Selected database endpoint; requires `virtualmin_mysql`. |
| `{{smtp_address}}`, `{{smtp_port}}` | Selected mail server and port; requires `smtp`. |
| `{{smtp_username}}`, `{{smtp_password}}`, `{{smtp_from}}` | Selected SMTP login and sender address; requires `smtp`. |
| `{{smtp_starttls}}`, `{{smtp_force_tls}}` | Text switches for the chosen mail encryption. Plain: `false`/`false`; STARTTLS: `true`/`false`; SSL: `true`/`true`. Map these to the image's documented options. |

`post_install` has a smaller, non-secret set: `name`, `domain`, `contact_email`, `scheme`, `url`, `url_path`, `url_no_trailing`, `storage`, and `connection`. Here, `{{connection}}` is the final web or service address. `{{ssl_cert}}` and `{{ssl_key}}` are also available here as **host file paths**, not certificate contents or container mounts.

## Start from an existing recipe

The built-in recipes are useful examples. On an installed server they are under `virtualmin-podman/recipes/` in Webmin's program directory, usually `/usr/share/webmin` or `/usr/libexec/webmin`.

Copy a similar definition to the local recipes directory, give it a new ID and filename, then change one part at a time. Use the upstream image documentation for ports, environment variables, data paths, and setup commands. These are application-specific, as Virtualmin does not invent them or convert Compose YAML into recipe JSON.
