---
title: "Podman"
author: "Ilia Ross"
date: "2026-04-06"
weight: 2511100
edition: "pro"
---

Podman is a Virtualmin plugin for deploying and managing application
containers per virtual server. It gives you a domain-aware workflow for
containers and pods, with registry search, proxy paths, logs, browser terminal
access, image-aware defaults, and runtime controls that fit naturally into the
rest of Virtualmin.

It is designed to keep container management practical on shared hosting style
systems too, where the domain owner, home directory, website proxy paths, and
access permissions all matter.

{{< alert warning exclamation-triangle "Developer Preview" "Currently this plugin is available only to Virtualmin Pro users through the development download channel at [download.virtualmin.dev](https://download.virtualmin.dev), not the standard production repositories yet. For current availability and install details, see the [announcement thread](https://forum.virtualmin.com/t/welcome-the-new-virtualmin-podman-plugin/136878)." >}}

## Installation

This plugin is currently distributed only through the Virtualmin development
download channel for Virtualmin Pro users.

**For Debian and derivatives:**
```
curl -u 'SERIAL:KEY' https://download.virtualmin.dev/webmin-virtualmin-podman-latest.deb -o /tmp/webmin-virtualmin-podman-latest.deb
apt install /tmp/webmin-virtualmin-podman-latest.deb podman skopeo
```

**For EL systems:**
```
curl -u 'SERIAL:KEY' https://download.virtualmin.dev/webmin-virtualmin-podman-latest.rpm -o /tmp/webmin-virtualmin-podman-latest.rpm
dnf install /tmp/webmin-virtualmin-podman-latest.rpm podman skopeo
```

`podman` is required. `skopeo` is strongly recommended, because it is used for
remote image metadata lookups and better image defaults detection.

{{< alert primary exclamation-triangle "" "The Virtualmin Podman plugin is only available to [Virtualmin Pro](https://www.virtualmin.com/shop/) subscribers." >}}

## Accessing

After installation, **List Managed Containers** appears in the left navigation
menu for global management across all virtual servers.

For each virtual server that has the **Podman containers** feature enabled,
**Manage Containers** appears in that domain's navigation. This is where you
create and manage that virtual server's containers and pods.

{{< alert primary exclamation "" "Domain owners and resellers can use this plugin only if the master administrator enables access in module configuration. Pod access can also be allowed only for master administrators, enabled for everyone, or disabled completely." >}}

## Getting started

1. Make sure the target virtual server has the **Podman containers** feature enabled.
2. Open **Manage Containers** for that virtual server.
3. Decide whether you need a single standalone container or a pod with multiple grouped containers.
4. Search for an image, review the suggested defaults, and adjust ports, mounts, environment variables, and lifecycle options.
5. If the app should be reachable through the domain, enable proxying and pick the published TCP port to use.
6. After deployment, use logs, status, inspect metadata, and the browser terminal for day-to-day management.

### When to use a container vs a pod

- Use a **standalone container** when one app image can run by itself with its own ports, mounts, and restart policy.
- Use a **pod** when several containers should share networking, published ports, and a closer grouped lifecycle.

## Working with containers

The per-domain containers page gives you a quick operational view of everything
managed for that virtual server. Depending on your configured columns, you can
see ports, proxy paths, volumes, environment summaries, status, health,
runtime mode, uptime, logs, console access, restart policy, runtime IDs, and
optional CPU and memory usage.

Bulk actions are available for **Start Selected**, **Stop Selected**, and
**Delete Selected** containers.

### Installing a container

The container install form starts with the essentials and can expand into more
advanced panels when needed.

**Core fields include:**

- **Image search**: Start typing an image name to search the configured registry. The module checks architecture compatibility and can show metadata such as stars, pull counts, last update time, size, platforms, and overview text.
- **Suggested defaults**: The form can pre-fill ports, mounts, environment variables, health checks, and proxy hints using local image inspection, remote metadata, bundled presets, and optional custom presets.
- **Name and description**: Use a clear container name and optional description.
- **Pod selection**: A container can be created inside an existing pod that matches the selected runtime mode.
- **Ports and proxying**: Add one or more host-to-container port mappings. Leaving the host port blank lets the plugin allocate one automatically from the configured base port. If the virtual server supports website proxying, you can also proxy the app to a URL path under the domain.
- **Volumes**: Add one or more host path to container path mappings with read-write or read-only mode.
- **Environment variables**: Add variables in `KEY=VALUE` format.

If a container is added to a pod, published ports and proxy settings belong to
the pod instead of the container, while volumes remain container-specific.

### Advanced container options

The module can expose the following extra panels on create and edit pages:

- **Lifecycle**: Pull-before-install, restart policy, max retries for `on-failure`, stop timeout, and stop signal.
- **Health check**: Health command, interval, timeout, start period, retries, and what to do when the container becomes unhealthy.
- **Resource limits**: Memory, swap, reservation, CPU shares, CPU limits, PID limits, shared memory, CPU pinning, NUMA memory nodes, block I/O weight, device throttling, ulimits, and optional user-slice cgroup-parent mode.
- **Command behavior**: Override the image's default command or entrypoint when an application needs a different startup process.
- **Extra run flags**: Add advanced per-container `podman run` flags when needed. Module-managed flags are still protected and cannot be overridden here.
- **Privileged and host access**: Extra capabilities, `no-new-privileges`, read-only root filesystem, privileged mode, host PID/IPC access, and overrides for outside-home or sensitive mounts.

{{< alert primary note "" "Some resource limits, cgroup settings, and networking options depend on the selected runtime mode and host support. The most advanced resource controls are primarily intended for domain user (<tt>rootful</tt>) mode." >}}

### Editing and operating containers

The edit page is meant for both routine operations and troubleshooting.

- **Actions**: Save, start, stop, restart, and delete.
- **Quick tools**: View logs and open a browser terminal.
- **Runtime details**: Current status, runtime ID, proxy URL, image, ports, mounts, and other container settings.
- **Inspect metadata**: Runtime inspect summary, create command, networks, mounts, environment variables, labels, image defaults, digests, and raw runtime or image inspect JSON.

When you save container settings, the module reapplies them by reinstalling the
container so the runtime configuration and the saved metadata stay in sync.

The browser terminal uses Webmin's `xterm` module and is available only when
the container is running.

## Working with pods

Pods are useful when an application stack should behave like a group instead of
as isolated standalone containers. In this module, a pod can own the shared
published ports, reverse proxy path, networking behavior, and common host bind
mounts, while member containers stay easy to inspect and manage.

Pods can be managed per virtual server and, when enabled, through the global
Pods view as well.

### Pod list and lifecycle

The Pods tab shows a configurable table with columns such as shared ports,
proxy path, volumes, networks, network mode, status, runtime mode, member
container count, restart policy, exit policy, uptime, creation time, and pod
ID.

Bulk actions are available for **Start Selected**, **Stop Selected**, and
**Delete Selected** pods.

### Creating a pod

The main pod form covers the shared pieces first:

- **Name and description**
- **Port mappings**
- **Optional reverse proxy path under the virtual server's domain**
- **Host bind mounts**

The advanced pod panels add deeper control:

- **Runtime**: Runtime mode, user namespace mode, infra container, hostname, and shared namespaces.
- **Network**: Default network, a specific Podman network, host networking, or no networking.
- **Advanced networking**: Static IPv4 or IPv6, MAC address, network aliases, DNS servers, DNS search domains, DNS options, extra host entries, and `no-hosts` or `no-resolv` behavior where supported.
- **Lifecycle**: Restart policy, exit policy, stop timeout, and replace-existing-pod behavior.
- **Resources**: Apply user-slice defaults or set pod-level CPU, memory, and shared memory limits.
- **Mounts**: SELinux relabeling and ownership shift behavior for pod bind mounts.

You can also create and delete Podman networks directly from the pod form, in
the selected runtime context, without leaving the page.

### Viewing and cloning pods

Each pod has a details page that shows:

- Current status, uptime, creation time, and runtime ID
- Shared ports, proxy settings, and mounted paths
- Runtime configuration and networking details
- Resource and mount settings
- Member containers with direct links to their logs and, when available, their console

From the pod details page you can:

- Open pod logs
- Clone the pod into a new pre-filled create form

Pods are not edited in place because Podman does not support updating an
existing pod definition in place. Instead, **Clone Pod** opens a new form
pre-filled from the current pod, so you can adjust ports, paths, networking,
mounts, or other settings and then create a new pod from that definition. If
you want the new definition to take over the old one, use the pod lifecycle
option to replace an existing pod with the same name.

Cloning is especially helpful when you want to duplicate a stack layout, tweak
settings safely, or rebuild a pod definition without starting from scratch.

## Global views and downloaded images

The global **List Managed Containers** page gives you a cross-domain view of
all managed containers. If pod support is enabled for your account, the same
page also includes a **Pods** tab for all module-managed pods across domains.

This makes it easier to:

- Spot which domain owns a given container or pod
- Review status and proxy paths across multiple sites
- Jump into the right virtual server quickly
- Use bulk lifecycle actions without opening each domain one by one

The global area also includes **Manage Downloaded Images**, which shows the
images currently present on the server, including tags, image IDs, digests,
creation time, size, and how many containers use each image. You can remove
unused images from there when cleaning up the host.

## Runtime modes

This plugin supports two runtime modes:

- **Image user (rootless)**: Podman runs as the virtual server owner and the container keeps the image's user model.
- **Domain user (rootful)**: Podman runs through the rootful runtime and the container process runs as the virtual server UID and GID.

{{< alert primary note "Recommended" "Image user (<tt>rootless</tt>) is the default and recommended mode for most deployments." >}}

The master administrator can expose runtime mode as:

- A user-selectable toggle
- A fixed informational note
- A hidden setting that still applies the configured default

This matters because discovery of containers, pods, and Podman networks is
runtime-aware, and some features are available only in certain runtime or
network combinations.

## Permissions and safety behavior

The module tries to keep container management safe by default while still
giving administrators deeper controls when they need them.

- Domain owners can be limited to mounts inside their own virtual server home directory.
- Sensitive host paths are blocked by default unless an administrator explicitly allows them.
- Host namespace access and privileged mode are treated as advanced options.
- Reverse proxying requires a website-enabled virtual server and at least one published TCP port.
- Pod and container access can be granted separately through module configuration.

## Module configuration

The configuration page is organized into a few practical sections.

### General settings

- Podman command path
- Default runtime mode
- Runtime mode selector display policy
- Whether to forward the original HTTP hostname when proxying
- Access for domain owners and resellers
- Default number of log lines shown in viewers

### User interface settings

- Visible columns for container lists
- Visible columns for pod lists
- Visible panels on container create and edit pages
- Visible panels on the pod create page

### Registry and discovery

- Default registry used for image search
- Maximum number of registry search results per query
- Preset source mode

The preset system can use bundled presets only, or merge them with your own
custom JSON. Custom presets are stored at:

`/etc/webmin/virtualmin-podman/presets.json`

When custom mode is enabled, bundled and custom presets are merged, and your
custom rules take precedence.

### Container defaults

- Default restart policy
- Base port for auto-assigned host ports
- Whether to apply limits from the user slice by default
- Default extra capabilities
- Default hardening options
- Default host access options
- Default extra Podman run flags

### Pod defaults

- Whether pods are available to master administrators only, to everyone, or disabled
- Default infra container behavior
- Default user namespace mode
- Default shared namespaces
- Default network mode
- Default restart, exit, and stop-timeout behavior
- Default user-slice, CPU, memory, and shared memory settings
- Default SELinux relabeling and ownership shift behavior for pod mounts
- Default extra Podman create flags

## Requirements and notes

- This plugin requires Virtualmin Pro.
- `podman` must be installed and reachable by the configured command path.
- `skopeo` is recommended for richer remote image metadata and defaults detection.
- Webmin's `xterm` module is required for browser console access.
- Proxy paths work only for virtual servers with website support enabled.
- There is no `virtualmin` command integration available for this plugin yet.
- Enabling CPU and memory usage columns adds one extra runtime stats query to the list page.

For single-container apps, the module keeps deployment quick. For more complex
stacks, pods add the extra structure you need without losing the per-domain
Virtualmin workflow.
