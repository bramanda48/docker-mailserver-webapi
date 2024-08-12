#!/bin/bash

# ===============================================================
# Usage
# ===============================================================
# To install the latest docker-mailserver-webapi, you can follow 
# these instructions :
#
# 1. Create new file user-patches.sh in config folder.
# 2. Add this script inside user-patches.sh.
#   $ curl -fsSL https://raw.githubusercontent.com/bramanda48/docker-mailserver-webapi/master/scripts/user-patches.sh | bash
# 3. By default, this application will run on port 3000. You need to add the port to docker-compose.yml.
# 4. Redeploy the container.
#
# For more information, see
# https://docker-mailserver.github.io/docker-mailserver/edge/config/advanced/override-defaults/user-patches/
#

CHANNEL="stable"
DMS_CONFIG="/tmp/docker-mailserver"
SUPERVISOR_FILENAME="/etc/supervisor/conf.d/supervisor-webapi.conf"

function _log() {
  if [[ -z ${1+set} ]]; then
    _log 'error' "Call to '_log' is missing a valid log level"
    return 1
  fi

  if [[ -z ${2+set} ]]; then
    _log 'error' "Call to '_log' is missing a message to log"
    return 1
  fi

  local LEVEL_AS_INT
  local MESSAGE="${RESET}["

  case "$(_get_log_level_or_default)" in
    ( 'trace' ) LEVEL_AS_INT=5 ;;
    ( 'debug' ) LEVEL_AS_INT=4 ;;
    ( 'warn'  ) LEVEL_AS_INT=2 ;;
    ( 'error' ) LEVEL_AS_INT=1 ;;
    ( *       ) LEVEL_AS_INT=3 ;;
  esac

  case "${1}" in
    ( 'trace' )
      [[ ${LEVEL_AS_INT} -ge 5 ]] || return 0
      MESSAGE+="  ${CYAN}TRACE  "
      ;;

    ( 'debug' )
      [[ ${LEVEL_AS_INT} -ge 4 ]] || return 0
      MESSAGE+="  ${PURPLE}DEBUG  "
      ;;

    ( 'info' )
      [[ ${LEVEL_AS_INT} -ge 3 ]] || return 0
      MESSAGE+="   ${BLUE}INF   "
      ;;

    ( 'warn' )
      [[ ${LEVEL_AS_INT} -ge 2 ]] || return 0
      MESSAGE+=" ${LYELLOW}WARNING "
      ;;

    ( 'error' )
      [[ ${LEVEL_AS_INT} -ge 1 ]] || return 0
      MESSAGE+="  ${LRED}ERROR  " ;;

    ( * )
      _log 'error' "Call to '_log' with invalid log level argument '${1}'"
      return 1
      ;;
  esac

  MESSAGE+="${RESET}]  ${2}"

  if [[ ${1} =~ ^(warn|error)$ ]]; then
    echo -e "${MESSAGE}" >&2
  else
    echo -e "${MESSAGE}"
  fi
}

# Get the value of the environment variable LOG_LEVEL if
# it is set. Otherwise, try to query the common environment
# variables file. If this does not yield a value either,
# use the default log level.
function _get_log_level_or_default() {
  if [[ -n ${LOG_LEVEL+set} ]]; then
    echo "${LOG_LEVEL}"
  elif [[ -e /etc/dms-settings ]] && grep -q -E "^LOG_LEVEL='[a-z]+'" /etc/dms-settings; then
    grep '^LOG_LEVEL=' /etc/dms-settings | cut -d "'" -f 2
  else
    echo 'info'
  fi
}

function get_distribution() {
	DIST=""
	# Every system that we officially support has /etc/os-release
	if [ -r /etc/os-release ]; then
		DIST="$(. /etc/os-release && echo "$PRETTY_NAME")"
	fi
	# Returning an empty string here should be alright since the
	# case statements don"t act unless you provide an actual value
	echo "$DIST"
}

command_exists() {
	# Check if the command exists
	command -v "$@"
}

function patch_supervisord() {
cat <<EOL > $SUPERVISOR_FILENAME
[program:webapi]
startsecs=0
stopwaitsecs=55
autostart=false
autorestart=true
stdout_logfile=/var/log/supervisor/%(program_name)s.log
stderr_logfile=/var/log/supervisor/%(program_name)s.log
directory=${DMS_CONFIG}/webapi
command=/bin/bash -c "deno run --allow-all --unstable-ffi main.esm.js"
EOL
}

function detect_env() {
  ENV_FILE="${DMS_CONFIG}/webapi/.env"
  API_KEY=""

  if [[ -f "$ENV_FILE" ]]; then
    # Read .env file into an associative array
    declare -A env_vars
    while IFS='=' read -r key value; do
      value=$(echo $value | tr -d "'\"")
      env_vars["$key"]="$value"
    done < "$ENV_FILE"

    if [[ -z "${env_vars["WEB_API_KEY"]}" ]]; then
      _log "info" "Generating api key ..."
      API_KEY="$(openssl rand -base64 25)"
      env_vars["WEB_API_KEY"]="$API_KEY"
    else
      API_KEY="${env_vars["WEB_API_KEY"]}"
    fi

    # Save all variable
    for key in "${!env_vars[@]}"; do
      echo "$key=\"${env_vars[$key]}\""
    done > "$ENV_FILE"

    _log "info" "Load .env file: ${ENV_FILE}"
    echo "=========================================="
    cat $ENV_FILE | grep WEB_API_KEY
    echo "=========================================="
  else
    _log "info" "New environment detected"
    cp "${ENV_FILE}.example" "${ENV_FILE}"
    detect_env
  fi
}

function start_daemon() {
	_log "info" "Starting webapi"
	supervisorctl update
	supervisorctl start webapi
}

function do_patch() {
	_log "info" "Executing user-patches.sh ..."

  if [ -z "$(command_exists unzip)" ]; then
		_log "info" "Installing unzip ..."
		apt install unzip
	fi

  # Download webapi
  STATUS_CODE=$(curl -fsSL -o docker-mailserver-webapi.zip --write-out "%{http_code}" ${DOWNLOAD_URL})
  if test $STATUS_CODE -ne 200; then
    _log "error" "Failed to download. Please check the command options (code: ${STATUS_CODE})"
    exit 1;
  fi

  # Remove old scripts
  if [ -d "${DMS_CONFIG}/webapi" ]; then
    find "${DMS_CONFIG}/webapi" -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} +
    find "${DMS_CONFIG}/webapi" -mindepth 1 -maxdepth 1 -type f ! -name ".env" -delete
  fi

  # Unzip the file
  unzip docker-mailserver-webapi.zip -d "${DMS_CONFIG}/webapi" && rm -rf docker-mailserver-webapi.zip
  chmod -R +x "${DMS_CONFIG}/webapi/scripts"

  # Check .env file
  detect_env

	if [ -z "$(command_exists deno)" ]; then
		_log "info" "Installing deno ..."
		curl -fsSL https://deno.land/install.sh | sh

		_log "info" "Copy /root/.deno/bin/deno to /usr/bin/deno"
		cp /root/.deno/bin/deno /usr/bin/deno
	fi

	_log "info" "Already installed - $(deno -V) on platform $(get_distribution)"

	# Add configuration and run the service
	if [ ! -e "$SUPERVISOR_FILENAME" ]; then
		_log "info" "Patching supervisord"
		# Create the file
		touch $SUPERVISOR_FILENAME
		patch_supervisord
	fi
	start_daemon
}

# List available channel:
#  * stable
#  * nightly
while [ $# -gt 0 ]; do
  case "$1" in
    --channel)
      CHANNEL="$2"
      shift
      ;;
    --*)
      echo "Illegal option $1"
      ;;
  esac
  shift $(( $# > 0 ? 1 : 0 ))
done

DOWNLOAD_URL=""
case "$CHANNEL" in
	stable)
    DOWNLOAD_URL="https://github.com/bramanda48/docker-mailserver-webapi/releases/latest/download/docker-mailserver-webapi.zip"
		;;
	nightly)
		DOWNLOAD_URL="https://nightly.link/bramanda48/docker-mailserver-webapi/workflows/build-deno/master/docker-mailserver-webapi.zip"
		;;
	*)
		_log 'error' "unknown CHANNEL '$CHANNEL': use either stable or nightly."
		exit 1
		;;
esac

# Run patch
do_patch
