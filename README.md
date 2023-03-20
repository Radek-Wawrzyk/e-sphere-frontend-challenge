# E-Sphere Frontend Challenge

This repository contains the codebase for the e-sphere-frontend-challenge, a recruitment task for a senior front-end developer position at E-Sphere.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine

```bash
git clone https://github.com/Radek-Wawrzyk/e-sphere-frontend-challenge.git
```

2. Install dependencies

```bash
cd e-sphere-frontend-challenge
yarn
```

3. Start the development server:

```bash
yarn dev
```

## Project structure

The project is structured as follows:

```php

├── index.html               # Main entry point of the application
├── .env                     # Local ENV file
├── .env.example             # Example of target ENV file
├── .eslintrc.cjs            # Main Eslint config
├── .prettierrc              # Main Prettier config
├── tsconfig.json            # Main TypeScript config file
├── vite.config.ts           # Main Vire config file
├── public/                  # Public assets
│   ├── vite.svg             # Favicon 
└── src/                     # Source code
    ├── assets/              # Static assets (images, fonts, etc.)
    ├── components/          # Reusable components
    │   ├── App/             # Main app related components
    │   └── Product/         # Product related components
    ├── views/               # Page components
    ├── router/              # Vue Router configuration
    ├── composables/         # Vue3 reused logic files
    ├── styles/              # Global SCSS styles
    ├── helpers/             # Application utils functions
    ├── plugins/             # 3rd parties plugins
    ├── types/               # Typescript types directory
    │   ├── constants/       # JavaScript application related constants
    │   ├── enums/           # TypeScript enums
    │   ├── models/          # TypeScript interfaces (for bigger objects)
    │   ├── types/           # TypeScript native types
    ├── api/                 # Api directory
    │   └── services/        # All axios services
    ├── main.ts              # The main entry point
    ├── App.vue              # The root Vue component
```

## Technologies & libraries I used

The project uses the following technologies/libraries:

- Vue3
  
- Vue-Router
  
- Vite
  
- Sass (SCSS)
  
- TypeScript
  
- Axios
  
- FontAwesome
  
- Lodash.debounce
  
- Eslint + Prettier
  
- FontSource (Google fonts as NPM packages)
  

## Architecture with a quick summary of made decisions

The project follows a component based architecture, where each component is a self-contained unit that can be easily reused across the application. Moreover, I decided to create `useProducts()` composable, which is responsible for all product-related views and "actions". By this solution I keep all logic in one file (without additional store libraries like `Pinia` or `Vuex`).

Moreover, I decided to keep all `enums/constants/interfaces/types` in one main directory called `types`. By this solution application keeps all typed-related logic in one place and it's easy to find and maitain in the future.

What is more, I decided to split components into 2 main categories:

- `App/*` - Application base related components, such as `AppInput` or `AppSelect.vue` . All components contain `App` prefix for easier navigation through the project.
  
- `Product/*` - Product related components, defined by its own scope of the product or products with `Product` prefix. Moreover, same as above - all componets contain `Product` or `Products` prefixes.
  

In the terms of API, I decided to create `api` directory, which contains main `axios instance`, which is being used in all services. Right now there is only one service, however, it would be very easy to expand or maintain more services in the future.

Last thing worth to mention is the `plugins` directory. I decided to use `font-awesome` for all icons as I cound't import them from the provided `Adobe XD page`. Therefore, I created one plugin called `font-awesome.ts` and I imported only 3 neccessary icons + `vue` component.