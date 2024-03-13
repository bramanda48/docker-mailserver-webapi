#!/bin/bash
setup config dkim keysize "$1" selector "$2" domain "$3" --force
