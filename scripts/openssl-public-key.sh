#!/bin/bash
## awk '/-END PUBLIC KEY-/ { p = 0 }; p; /-BEGIN PUBLIC KEY-/ { p = 1 }'
KEY_TYPE=$2
if [$KEY_TYPE -eq "ed25519"]; then
  openssl pkey -in <(echo "$1") -pubout 2>/dev/null
else 
  openssl rsa -in <(echo "$1") -pubout 2>/dev/null
fi
