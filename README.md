# stevenblack

This is a tiny package that checks if a domain is blacklisted in StevenBlack hosts file

This package will always pull the latest hosts file from the main repo https://github.com/StevenBlack/hosts during installation.

I created this package for my needs which is to block NSFW links from my projects.

## Installation

```bash
npm install stevenblack
```

## Usage

The default export of this package is a function that returns a Promise with a boolean value.

It reads the downloaded hosts file line by line and compare it against the given string.

It throws an error if for some reason the hosts file does not exists.

```javascript
const isBlacklisted = require('stevenblack')

async function main() {
  if (await isBlacklisted('nsfw-domain.com')) {
    throw new Error('Domain is blacklisted')
  }

  console.log('All good!')
}

main()
```
