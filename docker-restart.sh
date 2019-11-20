#!/bin/bash

docker-compose down -v

docker-compose up -d --build

docker system prune -f --volumes

docker-compose ps