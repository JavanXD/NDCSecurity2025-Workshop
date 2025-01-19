
# Oslo Coffee Club - Workshop

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.

## Setup

1. Clone this repository:
```bash
git clone https://github.com/JavanXD/NDCSecurity2025-Workshop.git
cd NDCSecurity2025-Workshop/oslo-coffee-club
```

2.	Install dependencies:
```bash
npm install
```

3.	Start the server:
```bash
npm start
```

4.	Open the app in your browser: `http://localhost:3000`

### Shared Demo instance

- [Oslo Coffee Club](https://oslo-coffee-club.javan.de/), if you are unable to run it locally using NodeJs you can use this instance, but note that you can only test the attacks on this instance and not apply the defenses to it.

## Files and Folders

- [`CHALLENGES.md`](./CHALLENGES.md): Contains the activities for the workshop.
- `oslo-coffee-club/`: Contains the code for the Oslo Coffee Club application.
- `oslo-coffee-club/public/`: Contains the static front-end assets for the Oslo Coffee Club application.
- `oslo-coffee-club/app.js`: Contains the back-end code for the Oslo Coffee Club application.
- `attacks/`: Contains the attack scripts for the workshop.
- `detect-insecure-practices-helper/`: Contains the helper script to detect insecure practices using `grep` and a custom **Semgrep** rule. (used for [Challenge 4](./CHALLENGE_4.md))

