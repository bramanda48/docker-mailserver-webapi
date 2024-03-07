#!/bin/bash
echo $(doveadm quota get -u "$1" | tail +2 | awk '{ if ($3 == "STORAGE") { print $4" "$5" "$6 } }');