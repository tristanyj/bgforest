# Board Game Forest

A D3.js experiment to visualize board games as generative trees. Data is sourced from the [BoardGameGeek Top 100](https://boardgamegeek.com/browse/boardgame) list.

Each tree's appearance is generated from its respective board game's data.

- The leaves' colors are based on the game's box art.
- The leaves' size is based on the game's average rating.
- The tree's height is based on the game's release year and average rating.
- The number of branches and ramifications is based on the game's complexity rating.
- The tree's spread is based on the game's owned count.

## Stack

### Front

- [Nuxt 3](https://v3.nuxtjs.org/)
- [D3.js](https://d3js.org/)
- [SCSS](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Back

([Source Code](https://github.com/tristanyj/flask-boardgame-api))

- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/)
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
