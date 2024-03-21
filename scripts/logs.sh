#!/bin/bash
SERVICE_NAME=$1
SERVICE_LOGS=""
LIMIT=$2

case "$SERVICE_NAME" in
	fail2ban)
    SERVICE_LOGS="/var/log/mail/fail2ban.log"
		;;
	clamav)
		SERVICE_LOGS="/var/log/mail/clamav.log"
		;;
  rspamd)
		SERVICE_LOGS="/var/log/mail/rspamd.log"
		;;
  mail)
		SERVICE_LOGS="/var/log/mail/mail.log"
		;;
	*)
		echo "Invalid service name `${SERVICE_NAME}`"
		exit 1
		;;
esac

tail -"$LIMIT" "$SERVICE_LOGS"