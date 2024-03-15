<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/bramanda48/docker-mailserver-webapi">
    <img src="./screenshoot/image-1.png" alt="Screenshoot" width="500px">
  </a>
  <h2 align="center">Docker Mailserver - Web API</h2>
  <div align="center">
    <p align="center">a REST API that helps you efficiently manage your <a href="https://github.com/docker-mailserver/docker-mailserver" title="Docker Mailserver">docker-mailserver</a> configuration.</p>
    <div>
        <a href="https://github.com/bramanda48/docker-mailserver-webapi/releases/"><img src="https://img.shields.io/github/release/bramanda48/docker-mailserver-webapi?include_prereleases=&sort=semver&color=blue" alt="GitHub release"></a>
        <a href="https://github.com/bramanda48/docker-mailserver-webapi#license"><img src="https://img.shields.io/badge/License-MIT-blue" alt="License"></a>
    </div>
  </div>
</div>

---

| Branch  | Status            |
|---------|-------------------|
| master  | <img src="https://img.shields.io/static/v1?label=&message=Under+Development&color=8B8000&logo=deno" alt="Under Development"> |
| develop | <img src="https://img.shields.io/static/v1?label=&message=Under+Development&color=8B8000&logo=deno" alt="Under Development"> |

## Installation & Usage

1. Create new file `user-patches.sh` in config folder.
2. Add this script inside `user-patches.sh`.
   ```bash
    #!/bin/bash

    curl -fsSL https://raw.githubusercontent.com/bramanda48/docker-mailserver-webapi/master/scripts/user-patches.sh | bash
   ```
3. By default, this application will run on port 3000. You need add the port to `docker-compose.yml`.
4. Redeploy the container.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/bramanda48/docker-mailserver-webapi/blob/master/LICENSE.md) file for details.

## Acknowledgments

Inspiration, code snippets, icon, etc.
* [Docker Mailserver](https://github.com/docker-mailserver/docker-mailserver) by The Docker Mailserver Organization & Contributors.