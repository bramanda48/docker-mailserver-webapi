#!/bin/bash
DIRECTION=$1

if [[ ${DIRECTION} == 'send' ]]; then
  CHECK='check_sender_access'
  POSTFIX_OPTION='smtpd_sender_restrictions'
else
  CHECK='check_recipient_access'
  POSTFIX_OPTION='smtpd_recipient_restrictions'
fi

# only adjust Postfix's `main.cf` if we haven't adjusted it before
STRING_TO_BE_ADDED="${CHECK} texthash:/tmp/docker-mailserver/postfix-${DIRECTION}-access.cf"
if ! grep -q "${STRING_TO_BE_ADDED}" /etc/postfix/main.cf; then
  sed -i -E "s|^(${POSTFIX_OPTION} =)(.*)|\1 ${STRING_TO_BE_ADDED},\2|" /etc/postfix/main.cf
  supervisorctl reload postfix
fi
echo "SUCCESS"