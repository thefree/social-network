## React Hooks: JWT Authentication


### Set port
.env
```
PORT=8081
```

### Project setup

In the project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development
```
(Dans tailwind.config.js)
    module.exports = {  mode: "jit",  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],  darkMode: false, // or 'media' or 'class'  theme: {    extend: {},  },  variants: {    extend: {},  },  plugins: [],};


npx tailwindcss -o "./src/tailwind.css" --watch --jit
npm start
```

### Compiles for deployement
```
npm run build
```

### Test build Local
```
serve -s build
```

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.

