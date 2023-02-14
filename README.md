This is a slackbot I made for my company, KiteString Technical Services, in order to track a private company leaderboard for the Advent of Code calendar. It's written in node, and requires a slack webhook, an upstream Redis host, port, and url, an AOC cookie taken from inspecting the website, and your AOC user ID. 

A sample .env will have the following fields:
WEBHOOK_URL
REDIS_HOST
REDIS_PORT
REDIS_URL
AOC_COOKIE
AOC_BOARD_USER_ID
PORT

This project was a ton of fun to make and it facilitated a lot of group cohesion and team building with all of us solving challenges together! I really recommend it. 