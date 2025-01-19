# Challenge 3: Leveraging `strict-dynamic` for Modern Script Management

## Objective
Use the `strict-dynamic` directive in CSP to enable trusted dynamically loaded scripts while blocking untrusted ones. This challenge will highlight how `strict-dynamic` simplifies script management in modern applications and ensures security without requiring an exhaustive list of trusted domains.

---

## Scenario

Your Oslo Coffee Club application includes a trusted script that dynamically loads a third-party library (Bootstrap) from a CDN. An attacker, however, tries to inject their own script (`./useruploads/attack.js`). Your task is to:
1. Configure CSP with `strict-dynamic` to allow only trusted dynamically added scripts.
2. Ensure the application functionality is preserved (e.g., Bootstrap loading) while blocking the attack.

---

## Attack Scenario

### Trusted Script
The application dynamically loads Bootstrap using a script like this:
```html
<script nonce="unique123">
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(script);
</script>
```

### Malicious Injection
The attacker attempts to inject the following payload:
```html
<script>
    const script = document.createElement('script');
    script.src = './useruploads/attack.js';
    document.body.appendChild(script);
</script>
```

The malicious script (`attack.js`) tries to change the background colour of the page and steal sensitive information.

---

## Steps

### Step 1: Test Without `strict-dynamic`

#### Initial CSP
The current CSP does not use `strict-dynamic` and relies only on a static whitelist:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:;
```

1. Inject the malicious script into the **Name** field or any vulnerable input.
2. Submit the form or execute the script.
3. **Expected Outcome**:
   - The browser loads and executes both the trusted Bootstrap script and the malicious `attack.js` script.

---

### Step 2: Apply `strict-dynamic`

#### Updated CSP
Update the CSP to include `strict-dynamic`:
```http
Content-Security-Policy: default-src 'self'; script-src 'strict-dynamic' 'nonce-unique123' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:;
```

1. Inject the same malicious script payload into the application.
2. Retest the trusted script loading Bootstrap.

---

### Step 3: Expected Outcome
1. The trusted script (with the `nonce`) successfully loads Bootstrap because `strict-dynamic` allows it to propagate trust.
2. The malicious script (`attack.js`) is blocked because it does not originate from a trusted source or have a valid nonce.

---

## Lessons Learned

1. **Simplifying Script Management**:
   - `strict-dynamic` allows developers to focus on securing critical entry points (e.g., trusted scripts with nonces or hashes).

2. **Trust Propagation**:
   - Dynamically added scripts inherit the trust of the parent script only if the parent script is explicitly trusted via a nonce.

3. **Blocking Untrusted Scripts**:
   - Scripts without valid nonces or hashes are blocked, even if they originate from a whitelisted domain.

4. **Modern Web Security**:
   - `strict-dynamic` addresses the complexities of modern script management, where applications frequently use dynamic imports or third-party libraries.
