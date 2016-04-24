#!/bin/sh
mysql -uroot -p -e "create database node_db; use node_db; create user 'node_user'@'localhost'; grant all on node_db.* to 'node_user'@'localhost' identified by 'password';"
