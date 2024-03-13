<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/bramanda48/docker-mailserver-webapi">
    <img src="./screenshoot/image-1.png" alt="Screenshoot" width="500px">
  </a>
  <h2 align="center">Docker Mailserver - Web API</h2>
  <div align="center">
    <h4 align="center">a REST API that helps you efficiently manage your docker-mailserver configuration. It uses docker-mailserver setup.sh as a bridge for managing configurations.</h4>
    <div>
        <a href="#license"><img src="https://img.shields.io/badge/License-MIT-blue" alt="License"></a>
    </div>
  </div>
</div>

---

| Branch  | Status            |
|---------|-------------------|
| master  | Under development |
| develop | Under development |

## Installation & Usage

1. Create new file user-patches.sh in config folder
2. Add this script inside user-patches.sh
   ```bash
    curl -fsSL https://raw.githubusercontent.com/bramanda48/docker-mailserver-webapi/master/scripts/user-patches.sh | bash
   ```
3. Redeploy the container

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/bramanda48/docker-mailserver-webapi/blob/master/LICENSE.md) file for details

## Acknowledgments

Inspiration, code snippets, icon, etc.
* [Docker Mailserver](https://github.com/docker-mailserver/docker-mailserver) by The Docker Mailserver Organization & Contributors