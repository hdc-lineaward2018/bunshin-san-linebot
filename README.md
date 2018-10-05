# bunshin-san-linebot

This is LINE bot server which is a part of Bunshin-san.

## Getting Started

### Installation

```sh
# use https
$ git clone https://github.com/hdc-lineaward2018/bunshin-san-linebot.git
# use ssh
$ git clone git@github.com:hdc-lineaward2018/bunshin-san-linebot.git

$ cd bunshin-san-linebot

$ npm install
```

### Run

```sh
$ cd bunshin-san-linebot

# for production
$ LINE_ACCESS_TOKEN=<YOUR ACCESS TOKEN> LINE_CHANNEL_SECRET=<YOUR SECRET KEY> DATABASE_ENDPOINT=<Server address of bunshin-san-database> NODE_ENV=production npm start

# for development
$ LINE_ACCESS_TOKEN=<YOUR ACCESS TOKEN> LINE_CHANNEL_SECRET=<YOUR SECRET KEY> DATABASE_ENDPOINT=<Server address of bunshin-san-database> NGROK_AUTHTOKEN=<YOUR NGROK AUTH TOKEN> NODE_ENV=development npm run start:dev
```

## API Overview

### `/` GET

Show index page.

### `/` POST

Webhook URL of LINE bot.
