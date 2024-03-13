#!/bin/bash
setup config dkim selector "$1" domain "$2" keytype "$3" keysize "$4"  --force
