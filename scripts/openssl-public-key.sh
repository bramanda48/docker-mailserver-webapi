#!/bin/bash
## awk '/-END PUBLIC KEY-/ { p = 0 }; p; /-BEGIN PUBLIC KEY-/ { p = 1 }'
openssl rsa -in <(echo "$1") -pubout 2>/dev/null
