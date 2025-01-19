# Challenges

## Prerequesites

- Oslo Coffee Club application running on `http://localhost:3000` (see [Setup](README.md#Setup)). 

## Challenges

- [Challenge 1](./CHALLENGE_1.md)): Attack **CSRF** and Protect Against It
- [Challenge 2](./CHALLENGE_2.md): Starting with an Insecure **CSP** and Migrating to a Secure One
- [Challenge 3](./CHALLENGE_3.md): Leveraging `strict-dynamic` for Modern Script Management
- [Challenge 4](./CHALLENGE_4.md): Retrofitting **Trusted Types** for DOM-Based XSS
- [Challenge 5](./CHALLENGE_5.md): Clickjacking Prevention with `X-Frame-Options` and CSP
- [Challenge 6](./CHALLENGE_6.md): Preventing Cross-Origin Communication with **COOP/COEP**



## Payloads

- XSS Payload 1:
    ```html
    Name<img src="#" onerror="console.log('XSS triggered via onerror'); document.body.style.backgroundColor = 'orange';" alt="XSS1">
    ```
- XSS Payload 2:
    ```html
    Name<img src="#" onerror="const script = document.createElement('script'); script.src = './useruploads/attack.js'; document.body.appendChild(script);" alt="XSS2">
    ```
- Attack files can be found in the `attacks` directory.