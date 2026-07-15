---
title: "Podman"
author: "Ilia Ross"
date: "2026-07-15"
weight: 2511100
edition: "pro"
---

Podman is a Virtualmin plugin for deploying and managing application
containers and pods per virtual server. It combines Podman's daemonless
container runtime with Virtualmin's domain ownership, permissions, reverse
proxy configuration, audit logging, and command-line API.

Use it to run a standalone application container, group related containers in
a pod, publish an application below a virtual server's URL, inspect runtime
state, or automate the same operations with the `virtualmin` command and
authenticated remote API.

{{< alert warning exclamation-triangle "Developer Preview" "Currently this plugin is available only to Virtualmin Pro users through the development download channel at [download.virtualmin.dev](https://download.virtualmin.dev), not the standard production repositories yet. For current availability and install details, see the [announcement thread](https://forum.virtualmin.com/t/welcome-the-new-virtualmin-podman-plugin/136878)." >}}

## What the plugin manages

The plugin adds domain-aware management for:

- **Containers** — create, edit, reinstall, start, stop, restart, delete,
  inspect, view logs, and open an interactive terminal
- **Pods** — create, clone, start, stop, delete, inspect, view logs, and add
  member containers
- **Images** — search registries, inspect image metadata, pull images, list
  downloaded images, and remove images from a selected runtime store
- **Networks** — list, create, and remove Podman networks in a selected runtime
  context
- **Reverse proxies** — publish a container or pod below a virtual server's
  website without configuring the web server manually
- **Automation** — use the `virtualmin` CLI locally or the authorized command
  subset through `remote.cgi`

Virtualmin stores the configuration of module-managed containers and pods.
Runtime discovery is used to enrich those records with current state, IDs,
health, uptime, networks, and resource usage.

## Installation

During the developer preview, download the plugin directly from Virtualmin's
development channel using the serial number and license key for your
Virtualmin Pro system.

### Debian and derivatives

```text
curl --fail --show-error --location \
  --user 'SERIAL:KEY' \
  https://download.virtualmin.dev/webmin-virtualmin-podman-latest.deb \
  --output /tmp/webmin-virtualmin-podman-latest.deb

apt install /tmp/webmin-virtualmin-podman-latest.deb podman skopeo
```

### Enterprise Linux systems

```text
curl --fail --show-error --location \
  --user 'SERIAL:KEY' \
  https://download.virtualmin.dev/webmin-virtualmin-podman-latest.rpm \
  --output /tmp/webmin-virtualmin-podman-latest.rpm

dnf install /tmp/webmin-virtualmin-podman-latest.rpm podman skopeo
```

`podman` is required. `skopeo` is strongly recommended because the plugin uses
it for remote image inspection, architecture checks, and image-derived
defaults.

{{< alert primary exclamation-triangle "" "The Virtualmin Podman plugin is only available to [Virtualmin Pro](https://www.virtualmin.com/shop/) subscribers." >}}

### Enable the plugin

Installing the package does not automatically enable containers for every
virtual server:

1. Open **System Settings ⇾ Features and Plugins**.
2. Enable the **Podman containers** plugin globally.
3. Edit each virtual server that should use containers.
4. Enable the **Podman containers** feature for that virtual server.

The feature can also be selected when creating a new virtual server after the
plugin has been enabled globally.

## Accessing the plugin

After installation and global enablement:

- **List Managed Containers** appears in the main Virtualmin navigation for
  cross-domain administration.
- **Manage Containers** appears inside each virtual server where the feature
  is enabled.
- The per-domain page contains separate **Containers** and **Pods** views when
  pod access is enabled.
- **Manage Downloaded Images** is available to the master administrator from
  the global area.

Domain owners and resellers see the plugin only when access is enabled in
module configuration and their Virtualmin ACL permits the target domain. Pod
access has a separate policy and can be master-only, available to permitted
users, or disabled.

## Runtime modes

Every managed container and pod belongs to one of two Podman runtime contexts.
The mode affects runtime ownership, image and network visibility, cgroup
capabilities, and which advanced options are available.

| Display name | CLI value | Host-side Podman process | Container user model |
|---|---|---|---|
| Image user | `rootless` | Runs as the virtual server's Unix owner | Keeps the image's configured user model |
| Domain user | `rootful` | Runs through the host-global rootful runtime | Runs as the virtual server UID and GID |

**Image user (`rootless`)** is the default and recommended mode for most
applications. It keeps Podman's storage and runtime operations in the virtual
server owner's Unix account.

**Domain user (`rootful`)** uses the host-global runtime but constrains the
container process to the virtual server UID and GID. It is useful when an
application must write files using the same host identity as the domain or
needs host features unavailable to the rootless runtime.

{{< alert primary note "Runtime stores" "Rootful images and networks are host-global. Rootless images and networks belong to a Unix user, not directly to a Virtualmin domain, so several subservers using the same Unix owner can share the same rootless store." >}}

The master administrator controls whether the runtime mode is:

- Selectable on create forms
- Shown as a fixed informational value
- Hidden while the configured default is applied

Existing objects keep their saved runtime mode even if the module default
later changes. A container cannot be moved into or out of a pod by editing it;
create a replacement in the required runtime context.

### Rootless preparation

Before running rootless Podman, the plugin prepares the virtual server owner by
ensuring:

- A persistent systemd user manager is enabled on systemd hosts
- The user's runtime directory exists with the correct ownership
- Subordinate UID and GID ranges exist in `/etc/subuid` and `/etc/subgid`
- `podman system migrate` runs when newly allocated subordinate IDs require it

If this setup fails, the operation stops and reports the preparation error. It
does not fall back to running the requested rootless operation as root.

## Getting started

For a first deployment:

1. Confirm that the virtual server has the **Podman containers** feature.
2. Open **Manage Containers** for that virtual server.
3. Choose **Add Container** for a standalone application, or create a pod
   first when several containers should share networking and lifecycle.
4. Search for an image or enter a full image reference.
5. Review the suggested ports, mounts, variables, health check, and proxy
   settings.
6. Select the runtime mode if the administrator exposes that setting.
7. Create the container or pod and verify its status and logs.
8. If the application should be available through the domain, enable the
   reverse proxy and test its URL.

### Container or pod?

- Use a **standalone container** when one image can operate independently with
  its own ports, mounts, restart policy, and proxy path.
- Use a **pod** when multiple containers should share a network namespace,
  published ports, bind mounts, or grouped lifecycle.

Published ports and proxy settings belong to the pod when a container is a pod
member. Member containers retain their own image, command, environment, and
container-specific mounts.

## Managing containers

### Creating a container

The create form begins with the required image and name, then exposes optional
panels selected by the administrator.

#### Image and identity

- Search the configured registry or enter a complete reference such as
  `docker.io/library/wordpress:latest`.
- Give the container a unique, stable name and optional description.
- Choose an existing pod only when the pod and new container use the same
  runtime mode.
- Decide whether the image should be pulled before each installation.

The module checks the host architecture and can display registry metadata such
as description, publisher, stars, pull count, update time, size, digest, and
supported platforms.

#### Ports and reverse proxy

Port mappings support TCP and UDP in `[host:]container[/protocol]` form. When
the host port is omitted, the plugin allocates an available port beginning at
the configured base port.

Reverse proxying requires:

- A website-enabled virtual server
- At least one published TCP port
- A proxy path that does not conflict with another module-managed or
  Virtualmin proxy path

When several TCP ports are published, select the container port or mapping
index that should receive proxied traffic. The module can preserve or replace
the original HTTP `Host` header according to its global configuration.

{{< alert primary note "Pod ports" "For a container created inside a pod, configure published ports and the reverse proxy on the pod. Pod member containers do not publish their own host ports." >}}

#### Volumes and environment

Bind mounts map a host source path to a container destination with `rw` or `ro`
mode. Environment variables use `KEY=VALUE` form.

For delegated users, host mount sources are restricted to the virtual server's
home directory. Sensitive system paths remain blocked unless the master
administrator explicitly enables the corresponding advanced override.

Environment values are saved so a container can be recreated. List and audit
output masks environment values by default; disclose them only when required
and authorized.

#### Lifecycle and health checks

Container lifecycle controls include:

- Restart policy and maximum retries for `on-failure`
- Stop timeout and stop signal
- Pull-before-install policy
- Command and entrypoint overrides for master administrators

Health checks can define:

- Command
- Interval
- Timeout
- Start period
- Retry count
- Action when the container becomes unhealthy

#### Resource limits

Where supported by the selected mode and host, containers can use:

- Memory limit, swap, and reservation
- CPU shares, CPU count, and CPU or NUMA node pinning
- PID and shared-memory limits
- Block I/O weight
- Per-device bandwidth and IOPS throttling
- Ulimits
- The virtual server owner's systemd user slice as the cgroup parent

The form reports the capabilities available for the selected runtime mode.
Rootless controls depend on cgroup controllers delegated to the domain owner's
user service. Unsupported limits are rejected rather than silently ignored.

Explicit standalone-container limits do not apply to a container created as a
pod member; configure shared limits on the pod instead.

#### Security and host access

Advanced controls include extra Linux capabilities, privileged mode,
`no-new-privileges`, read-only root filesystem, and host network, PID, or IPC
namespace access.

The master administrator can also allow mounts outside the domain home or
otherwise sensitive mount paths. Extra `podman run` flags are validated so
they cannot replace flags managed by the module.

These host-level and passthrough controls are not available to delegated
domain owners through the remote API.

### Editing and reinstalling

The edit page combines saved configuration with current runtime information.
Depending on the change, saving either updates metadata or recreates the
runtime container so its effective configuration remains synchronized with
Virtualmin.

Use **Reinstall** to force recreation from the saved settings. Reinstallation
can retain the saved image-pull policy or explicitly pull or skip pulling the
image.

The CLI `modify-container` command overlays only the supplied scalar settings.
Repeatable collections—including ports, volumes, environment variables,
capabilities, device limits, ulimits, and extra flags—are replaced as complete
collections when supplied. Re-specify every entry to retain, or use the
matching `--clear-*` option to remove the collection.

### Status, logs, console, and inspection

Container pages can show:

- Saved name, description, image, runtime mode, and proxy URL
- Runtime name and ID, status, health, creation time, and uptime
- Published ports, mounts, networks, and restart policy
- Optional CPU and memory usage
- Inspect summary, labels, command, environment, and raw inspect JSON

Logs can be read from the list or detail page. The configured default tail can
be overridden from the CLI up to 10,000 lines.

The browser terminal requires Webmin's `xterm` module and a running container.
CLI `exec-container` can execute one command for automation or open an
interactive `/bin/sh` session when attached to a terminal.

### Bulk operations

The web interface supports bulk start, stop, and delete operations. CLI
lifecycle commands accept repeated `--container` options or `--all` for the
selected domain. `reinstall-container` also supports repeated selectors and
`--all`.

Deletion removes the runtime container, saved module record, and associated
reverse proxy mapping.

## Managing pods

Pods group containers around shared networking and lifecycle. A pod can own
published ports, a reverse proxy path, common bind mounts, namespace sharing,
and pod-level limits.

### Creating a pod

The basic pod definition includes:

- Name and description
- Runtime mode
- Shared port mappings
- Optional reverse proxy path and target port
- Shared host bind mounts

Advanced options include:

- Infra container and user namespace mode
- Shared network, IPC, UTS, PID, and cgroup namespaces
- Restart policy, exit policy, stop timeout, and replace behavior
- CPU, memory, and shared-memory limits
- User-slice cgroup-parent policy
- SELinux relabel mode and ownership shifting for pod bind mounts
- Validated extra `podman pod create` flags for master administrators

### Pod networking

Supported network modes are:

- **Bridge/default** — use the runtime's default network
- **Custom** — attach to a named Podman network
- **Host** — share the host network namespace; master-only
- **None** — create the pod without network connectivity

Depending on the selected network and host support, a pod can also specify:

- Static IPv4 or IPv6 address
- MAC address
- Network aliases
- DNS servers, search domains, and resolver options
- Extra hostname-to-address entries
- `no-hosts` and `no-resolv` behavior

Networks can be created and removed from the pod form without leaving the
workflow. Built-in networks such as `podman`, `bridge`, `host`, and `none`
cannot be deleted.

### Adding member containers

Create a container normally and select the target pod. The runtime modes must
match. The member container uses the pod's networking, published ports, and
proxy configuration, while retaining container-specific image, environment,
command, and mounts.

The pod details page links each member container to its logs and terminal when
available.

### Lifecycle and cloning

Pods can be started, stopped, and deleted individually or in bulk. Deleting a
pod also removes its runtime member containers and reverse proxy mapping.

Podman does not update an existing pod definition in place, so the plugin does
not provide an edit-in-place workflow. **Clone Pod** creates a new pre-filled
definition. You can change its name, ports, proxy path, mounts, networking,
namespaces, or limits before creation.

CLI `clone-pod` also accepts create-pod options as overrides. It generates a
new name when one is not supplied and reallocates published host ports to
avoid collisions with the source pod.

## Images and registries

### Registry search and metadata

The create form searches the configured registry after enough characters have
been entered. Search results are bounded by the module-configured limit and
cached briefly to avoid repeated registry requests.

Defaults can be assembled from:

- Local `podman image inspect`
- Remote `skopeo inspect --config`
- Bundled `presets.json`
- Optional custom presets

These sources can suggest ports, bind-mount targets, environment variables,
health checks, proxy settings, and image-specific notes. Suggestions remain
editable and are validated like manually entered values.

Custom presets are stored in:

```text
/etc/webmin/virtualmin-podman/presets.json
```

When custom preset mode is enabled, custom rules override matching bundled
rules. An empty or invalid custom file falls back to bundled presets.

### Downloaded images and runtime stores

The global downloaded-images page displays repositories, tags, IDs, digests,
creation time, size, runtime context, and container usage.

Remember that rootful and rootless storage are separate:

- `rootful` selects the host-global image store.
- `rootless` requires a domain so the plugin can resolve its Unix owner.
- A master image listing with a domain and no explicit mode can combine the
  visible rootless and rootful stores.
- Pull and delete operations always target one resolved store.

Removing an image normally fails while containers in that store use it.
Forced image deletion removes dependent runtime containers first and cleans up
matching module-managed records, so use `--force` only when that outcome is
intended.

## Podman networks

Networks belong to a runtime context just like images:

- With a domain and no mode, network commands use the module's configured
  runtime mode.
- `--runtime-mode rootless` requires a domain.
- `--runtime-mode rootful` selects the host-global network store and is the
  only mode allowed without a domain.

Network creation supports an optional subnet, gateway, IPv6, internal-only
mode, and built-in DNS enable or disable setting. Network deletion refuses
built-in runtime networks and reports when a network is still in use.

Image-store and network-store commands are intentionally master-only through
the remote API because a store can be shared by multiple domains.

## Global views

**List Managed Containers** provides a cross-domain view for the master
administrator. It helps identify ownership, current state, runtime mode,
published ports, proxy paths, and the virtual server associated with each
object.

When pods are enabled, the global page also contains a pods view. Bulk actions
are available without opening each virtual server separately.

Container and pod list columns are configurable. CPU and memory columns add a
runtime statistics query, so enable them only when that extra detail is useful.

## Module configuration

The configuration page is divided into five groups.

### General settings

- Podman runtime command path
- Default runtime mode
- Runtime-mode selector display policy
- Original HTTP hostname forwarding for reverse proxies
- Domain-owner access
- Reseller access
- Default number of log lines

### User interface settings

- Container list columns
- Pod list columns
- Visible container create and edit panels
- Visible pod create panels

Hiding a panel removes it from normal forms but does not weaken backend
validation or grant delegated access to master-only options.

### Registry and discovery

- Default image registry or custom registry prefix
- Maximum search result count
- Bundled-only or merged custom preset mode

Docker Hub provides the richest search and metadata integration. Other
registries work best with explicit full image references when they do not
provide an equivalent search API.

### Container defaults

- Restart policy
- Base port for automatic host-port allocation
- User-slice cgroup-parent policy
- Extra capabilities
- Hardening options
- Host-access options
- Extra Podman run flags

### Pod defaults

- Pod access policy
- Infra container and user namespace mode
- Shared namespaces and network mode
- Restart, exit, and stop-timeout policy
- User-slice, CPU, memory, and shared-memory settings
- SELinux relabel and ownership-shift behavior
- Extra Podman create flags

Default settings apply to newly created objects. Existing saved objects are
not silently rewritten when a module default changes.

## Command-line API

The plugin exposes container, pod, image, and network operations through
commands discovered by Virtualmin's `virtualmin` wrapper. Local `virtualmin`
subcommands run as `root`; domain owners and resellers use the authenticated
remote API instead of local shell access.

Display a command's detailed help with:

```text
virtualmin create-container --help
```

Inspect its machine-readable command metadata with:

```text
virtualmin get-command --command create-container
```

### Output and exit behavior

Listing commands support:

- Default human-readable table output
- `--multiline` detailed records
- `--json` or `--xml` Virtualmin API envelopes
- `--name-only` stable object names

`list-containers` can disclose saved environment values only when explicitly
requested with `--show-env-values`; values are masked otherwise.

Log and exec commands return their natural text streams. JSON and XML wrappers
place unstructured text in an `output` field. Registry search also uses the
Virtualmin response envelope; consumers should accept its result text from the
`output` field rather than assuming a list-style `data` array.

Successful commands exit with status 0. Validation, authorization, runtime,
and required post-action failures return a non-zero status. Mutating commands
run deferred Virtualmin post-actions before reporting success, so a failed web
server or service reload also makes the command fail.

### Container commands

| Command | Purpose | Owner/reseller remote API |
|---|---|---|
| `create-container` | Create and deploy a container | Yes |
| `modify-container` | Apply selected changes and recreate when required | Yes |
| `delete-container` | Delete selected containers or all domain containers | Yes |
| `start-container` | Start selected containers or all domain containers | Yes |
| `stop-container` | Stop selected containers or all domain containers | Yes |
| `restart-container` | Restart selected containers or all domain containers | Yes |
| `reinstall-container` | Force recreation from saved settings | Yes |
| `list-containers` | List and inspect domain containers | Yes |
| `get-container-logs` | Print recent container logs | Yes |
| `exec-container` | Execute a command or open an interactive shell | Yes |

### Pod commands

| Command | Purpose | Owner/reseller remote API |
|---|---|---|
| `create-pod` | Create a pod | Yes, when pod access is enabled |
| `clone-pod` | Clone a pod with optional overrides | Yes, when pod access is enabled |
| `delete-pod` | Delete selected pods or all domain pods | Yes, when pod access is enabled |
| `start-pod` | Start selected pods or all domain pods | Yes, when pod access is enabled |
| `stop-pod` | Stop selected pods or all domain pods | Yes, when pod access is enabled |
| `list-pods` | List and inspect domain pods | Yes, when pod access is enabled |
| `get-pod-logs` | Print recent pod logs | Yes, when pod access is enabled |

### Image and network commands

| Command | Purpose | Owner/reseller remote API |
|---|---|---|
| `search-container-images` | Search the configured registry | Yes |
| `list-container-images` | List images in visible runtime stores | No; master-only |
| `pull-container-image` | Download an image without creating a container | No; master-only |
| `delete-container-image` | Delete images from one runtime store | No; master-only |
| `list-container-networks` | List networks in one runtime store | No; master-only |
| `create-container-network` | Create a Podman network | No; master-only |
| `delete-container-network` | Delete a Podman network | No; master-only |

Domain owners and resellers can download images as part of managing their
containers. `create-container` downloads its configured image by default, and
`reinstall-container --pull` downloads it again when recreating that managed
container. The master-only commands above inspect or change Podman images and
networks directly, without creating or reinstalling a managed container.

### WordPress application example

This example deploys WordPress and MariaDB as two containers in one pod for a
dedicated HTTPS-enabled `blog.example.com` virtual server. The pod publishes
WordPress and proxies the domain root to it; MariaDB remains reachable only
through the pod's shared network namespace.

Run these commands as `root` and replace both example passwords with strong,
independently generated values. The host paths assume the virtual server's
home is `/home/blog`; adjust them when the domain uses a different home
directory.

The commands explicitly select rootful mode because the MariaDB image changes
ownership of its persistent bind-mounted data directory during initialization.
On hosts where rootless containers cannot change ownership of bind mounts,
using rootless mode here causes MariaDB to enter a restart loop.

Create the pod and let Virtualmin allocate the host-side port automatically:

```text
virtualmin create-pod \
  --domain blog.example.com \
  --name wordpress \
  --runtime-mode rootful \
  --port :80/tcp \
  --proxy \
  --proxy-path /
```

Add MariaDB with persistent database storage:

```text
virtualmin create-container \
  --domain blog.example.com \
  --name wordpress-db \
  --pod wordpress \
  --runtime-mode rootful \
  --image docker.io/library/mariadb:11 \
  --volume /home/blog/containers/wordpress/database:/var/lib/mysql:rw \
  --env MARIADB_DATABASE=wordpress \
  --env MARIADB_USER=wordpress \
  --env MARIADB_PASSWORD=CHANGE_ME_DB_PASSWORD \
  --env MARIADB_ROOT_PASSWORD=CHANGE_ME_ROOT_PASSWORD
```

Add the WordPress frontend. Because both containers share the pod's network
namespace, WordPress reaches MariaDB on `127.0.0.1:3306`:

```text
virtualmin create-container \
  --domain blog.example.com \
  --name wordpress-web \
  --pod wordpress \
  --runtime-mode rootful \
  --image docker.io/library/wordpress:latest \
  --volume /home/blog/containers/wordpress/files:/var/www/html:rw \
  --env WORDPRESS_DB_HOST=127.0.0.1:3306 \
  --env WORDPRESS_DB_USER=wordpress \
  --env WORDPRESS_DB_PASSWORD=CHANGE_ME_DB_PASSWORD \
  --env WORDPRESS_DB_NAME=wordpress \
  --env 'WORDPRESS_CONFIG_EXTRA=$_SERVER["HTTPS"] = "on"; define("WP_HOME", "https://blog.example.com"); define("WP_SITEURL", "https://blog.example.com");'
```

Open `https://blog.example.com/` to complete the WordPress installer. The
`WORDPRESS_CONFIG_EXTRA` value keeps WordPress on HTTPS when the container is
behind Virtualmin's root reverse proxy and sets the canonical URL to the
domain root.

The database and WordPress files live below the virtual server home rather
than only in the containers' writable layers. Back up both directories as one
application and protect the database passwords like any other production
credential.

### Operating the WordPress example

Inspect the pod and its containers, read logs, and verify PHP inside the
frontend:

```text
virtualmin list-pods --domain blog.example.com --json
virtualmin list-containers --domain blog.example.com --json

virtualmin get-container-logs \
  --domain blog.example.com \
  --container wordpress-db \
  --tail 100

virtualmin get-container-logs \
  --domain blog.example.com \
  --container wordpress-web \
  --tail 100

virtualmin exec-container \
  --domain blog.example.com \
  --container wordpress-web \
  --command "php -v"
```

Stop and start the application as one unit, or pull an updated WordPress image
and recreate only the frontend from its saved configuration:

```text
virtualmin stop-pod --domain blog.example.com --pod wordpress
virtualmin start-pod --domain blog.example.com --pod wordpress

virtualmin reinstall-container \
  --domain blog.example.com \
  --container wordpress-web \
  --pull
```

### Image and network examples

Search for an image in a domain's configured registry:

```text
virtualmin search-container-images \
  --domain blog.example.com \
  --query wordpress \
  --limit 10
```

Work with the host-global rootful image store:

```text
virtualmin pull-container-image \
  --runtime-mode rootful \
  --image docker.io/library/wordpress:latest

virtualmin list-container-images --runtime-mode rootful --json
```

Create and remove a network in a domain owner's rootless store:

```text
virtualmin create-container-network \
  --domain example.com \
  --runtime-mode rootless \
  --name app-private \
  --internal

virtualmin delete-container-network \
  --domain example.com \
  --runtime-mode rootless \
  --name app-private
```

Explicit `--runtime-mode` selection is master-only. For rootful image and
network commands, the domain can be omitted because the target is the
host-global runtime store. Rootless mode always requires a domain.

## Remote API

Virtualmin's authenticated remote API exposes commands at:

```text
https://host.example:10000/virtual-server/remote.cgi
```

Pass the command as `program`, command options as request parameters, and
`json=1` or `xml=1` for the desired response format.

```text
curl --silent --show-error \
  --user 'domain-owner:password' \
  --get 'https://host.example:10000/virtual-server/remote.cgi' \
  --data-urlencode 'program=list-containers' \
  --data-urlencode 'domain=example.com' \
  --data-urlencode 'json=1'
```

Use HTTPS and provide credentials through the caller's secret-management
facility rather than embedding passwords in scripts. Repeat a request
parameter when the corresponding CLI option can be repeated.

### Remote authorization

The master administrator can call every plugin command through `remote.cgi`.
Authenticated domain owners and resellers can call only the commands marked
**Yes** in the tables above, and only when all of these checks pass:

- Owner or reseller module access is enabled
- Pod access is enabled when a pod command is requested
- The caller can edit the selected Virtualmin domain
- The domain is within the module's allowed-domain ACL
- The command's own object and runtime checks pass

Delegated calls cannot explicitly select `--runtime-mode` or request
master-only privilege, host namespace, host mount, command override, or raw
Podman flag settings. Pod host networking, host user namespaces, and replace
behavior are also master-only.

Cross-domain selectors are rejected even when an object with the requested
name exists elsewhere.

{{< alert primary note "HTTP and API status" "A remote API request can return HTTP 200 while the command itself reports <tt>status: failure</tt>. Treat curl's exit status as the transport result and always inspect the Virtualmin response status and error fields." >}}

### Audit logging

Mutating CLI and remote operations, plus `exec-container` attempts, are written
to Virtualmin's command audit log. Environment values and command-like
arguments—including exec commands, entrypoints, health commands, and extra
runtime flags—are redacted before logging.

Rootless exec and streaming operations switch to and verify the complete Unix
identity, including supplementary groups, before starting Podman. A failed
identity switch terminates the operation rather than continuing as root.

## Permissions and safety model

The plugin enforces permissions at the UI, CLI, remote authorization, saved
object, and runtime-context layers.

- A caller must be authorized for the selected virtual server before object
  lookup or runtime access.
- Rootless runtime commands execute as the resolved virtual server Unix owner.
- Runtime identity changes are checked before Podman is executed.
- Delegated users cannot select host-global runtime stores.
- Domain-owner mounts are confined to the domain home directory.
- Sensitive host paths are blocked unless explicitly allowed by the master.
- Privileged mode, host namespaces, extra capabilities, command overrides, and
  raw runtime flags are master-only controls.
- Reverse proxy paths are normalized and checked for collisions.
- Failed runtime queries are reported as errors rather than presented as empty
  lists.
- Required Virtualmin post-actions must complete before a mutation is reported
  as fully successful.

These controls reduce accidental cross-domain access, but container images and
applications still require normal security review. Do not treat an untrusted
image as safe merely because it runs inside a container.

## Troubleshooting

### The plugin does not appear for a domain

Check that:

1. The plugin package is installed.
2. **Podman containers** is enabled globally under **Features and Plugins**.
3. The feature is enabled on the target virtual server.
4. Owner or reseller access is enabled when using a delegated account.
5. The account's Virtualmin and module ACL includes the domain.

### Podman command not found

Confirm that Podman is installed and that **Podman runtime command** in module
configuration points to the executable. Run the configured command as root to
verify that the binary starts.

### Rootless initialization fails

Read the complete error shown by the plugin. Common causes include failure to
enable systemd linger, an unwritable `/run/user/UID` directory, subordinate ID
file permissions, or a failed `podman system migrate` operation.

The plugin reports the failed preparation step. Correct the host issue and
retry; do not work around it by making a delegated command run as root.

### A resource option is unavailable

Resource controls depend on the runtime mode, cgroup version, and controllers
delegated to the virtual server owner's user service. Select another supported
limit, configure user-slice delegation, or use the rootful domain-user mode
when appropriate.

### A proxy cannot be enabled

Confirm that the virtual server has website support, the container or pod has
a published TCP port, and the requested path does not conflict with another
proxy. For a pod member, configure proxying on the pod rather than the member
container.

### An image or network appears to be missing

Confirm the runtime context. Rootless and rootful Podman stores are separate,
and rootless stores are selected through the domain's Unix owner. Use an
explicit runtime mode as the master administrator when diagnosing store
visibility.

### A remote request has HTTP 200 but did not run

Inspect the JSON or XML `status`, `error`, and `full_error` fields. HTTP status
describes the CGI request; the response body describes command authorization,
validation, and runtime success.

## Requirements and operational notes

- Virtualmin Pro with the Podman plugin installed and enabled
- Podman installed and reachable through the configured command path
- `skopeo` recommended for remote metadata and architecture discovery
- Webmin's `xterm` module for browser terminal access
- Website support for virtual servers using reverse proxy paths
- Host support for the selected rootless, networking, namespace, and cgroup
  features

Runtime behavior can vary with Podman, kernel, systemd, cgroup, and network
backend versions. The plugin validates known capability boundaries and reports
runtime failures, but the host must still provide the feature requested by the
container or pod.
