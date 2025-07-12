# 💰 Crypto Deposit Tracking Service

A simplified backend service built with **NestJS** that allows clients to create a USDC deposit wallet on the **Polygon Amoy testnet**, monitors on-chain activity, and sends webhook notifications once a deposit with **2 confirmations** is received.

---

## 🚀 Features

- Generate a unique deposit wallet for each user (using `ethers.js`)
- Monitor Polygon Amoy testnet for incoming **USDC** transfers
- Trigger a **webhook** with deposit details when 2 confirmations are reached
- Implements:
  - **Retryable** webhook delivery
  - **Idempotent** processing
  - **Logging** for observability
- On-chain monitoring powered by `Alchemy` and `ethers.js`
- Simply webhook-retry mechanism

---

## Bonus:
- Added simple get balance method (only on wallted created by the service) - GET /wallets/balance/:walletId


## 🛠 Tech Stack

- [NestJS]
- [ethers.js]
- [Polygon Amoy Testnet](https://wiki.polygon.technology/docs/develop/network-details/network/)
- [USDC Token Address (Amoy)](https://polygonscan.com/token/0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582)

---