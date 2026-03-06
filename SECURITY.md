# Security Policy

## About This Project

This is a static website — there is no server-side code, no database, no
authentication, and no user data processing. The attack surface is minimal
by design.

## Supported Versions

Only the latest release on the `main` branch is supported.

| Version | Supported |
| ------- | --------- |
| Latest  | Yes       |
| Older   | No        |

## Reporting a Vulnerability

If you discover a security issue (for example, an XSS vector in the JavaScript,
a misconfiguration in the Docker/Nginx setup, or a dependency with a known CVE),
please report it responsibly:

1. **Do not** open a public GitHub issue.
2. Send an email to **hello@yush.dev** with:
   - A description of the vulnerability
   - Steps to reproduce (if applicable)
   - Any suggested fix

You can expect an initial response within 7 days. If the issue is confirmed, a
fix will be released as soon as practical and you will be credited (unless you
prefer to remain anonymous).

## Scope

The following are **in scope**:

- Cross-site scripting (XSS) in any shipped JavaScript
- Docker image or Nginx misconfigurations that could be exploited
- Dependency vulnerabilities in shipped assets (e.g., Font Awesome)

The following are **out of scope**:

- Issues that require physical access to the server
- Denial-of-service attacks
- Social engineering
- Vulnerabilities in third-party services linked from the site (LinkedIn, GitHub, etc.)
