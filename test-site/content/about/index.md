+++
title = "About"
date = "2025-05-30"
+++

I'm a technical entrepreneur, based in London, with over 15 years of experience in AI, using it to solve problems in traditional industries (logistics, returnable packaging, waste management, urban planning). It has been an interesting journey, with unexpected turns, pleasantly unexpected turns, to list a few:

- a PhD, in optimization algorithms for waste logistics, of all applications; 
- being a senior lecturer, and having to teach to over 1400 students;
- research fellowships, more than one, ok twice to be exact; and
- starting a venture backed AI company, and closing a venture backed AI company. 

All of this, while moving from South Africa, to Singapore and now London.

A guarenteed-to-be-outdated version of my CV can be found [here](https://drive.google.com/file/d/1MD6y9CAls64zxCIzWVkpJzImzfY4o2Bg/view). I'm also on [LinkedIn](https://www.linkedin.com/in/eliasjw/); guarenteed to be less outdateded, except for the profile picture, which is guarenteed-to-be-outdated (GTBO?). My work portfolio can be found [here](https://elias-jw.github.io/projects/), also GTBO.

## Journey

- South Africa → Singapore → London
- Research → Industry → Academic → Entrepreneurship
- 15+ years in AI and Data

## Features

- Clean and minimal design
- Terminal-inspired interface
- Responsive layout
- Fast loading times

A minimal and responsive Hugo theme inspired by the system console, crafted for optimal performance with an average page load time of under one second.

Theme is based on a modern and minimal [Terminal CSS](https://terminalcss.xyz/) framework. 

![Console](https://github.com/mrmierzejewski/hugo-theme-console/blob/master/images/preview.png?raw=true)

## Live demo

* [https://mrmierzejewski.com/hugo-theme-console/](https://mrmierzejewski.com/hugo-theme-console/)

## Installation

From the root of your Hugo site, clone the theme into ```themes/hugo-theme-console``` by running :

```
$ git submodule add https://github.com/mrmierzejewski/hugo-theme-console.git hugo-theme-console
```
    
See the [Hugo documentation](https://gohugo.io/hugo-modules/theme-components/) for more information.

## Configuration

Set theme parameter in your config file:

```
theme = "hugo-theme-console"
```

## Quick start

After installation, take a look in the `exampleSite` folder at. This directory contains an example config file and the content for the demo.

```
  exampleSite
  ├── config.toml
  ├── content
  │   ├── about
  │   │   └── index.md
  │   └── photos
  │   │   └── arizona-us
  │   │       ├── arizona-us.jpg
  │   │       └── index.md
  │   └── posts
  │       └── introduction
  │           └── index.md
  ├── layouts
  │
  └── static
```

Copy at least the `config.toml` in the root directory of your website. Overwrite the existing config file if necessary.

Hugo includes a development server, so you can view your changes as you go -
very handy. Spin it up with the following command:

```
hugo serve
```

Now you can go to [http://localhost:1313](http://localhost:1313) and the theme should be visible.

## Example Site

To run the example site, please type the following command.

```
make hugo-server
```

## License

Copyright © 2024 [Marcin Mierzejewski](https://mrmierzejewski.com/)

The theme is released under the MIT License. Check the [original theme license](https://github.com/panr/hugo-theme-terminal/blob/master/LICENSE.md) for additional licensing information.
