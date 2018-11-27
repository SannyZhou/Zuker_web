Zuker_web
---

## Dependencies Install (Ubuntu 16)

### nodejs
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt-get install -y nodejs

### yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

### node dependencies
yarn

## Develop and Build

### dev
> npm run dev

- Use axios for XMLHttpRequests
- Change the devServer:host option of webpack.config.js to change the listening address of devServer, the devServer:proxy options to solve the problem of Cross-Origin while developing
- The VSCode editor is recommended (Vetur plugin)

### build
> npm run build
