# EQS.PORT — Investor Website

Modern, dark-themed investor landing page for EQS.PORT built with Next.js, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Deploy to AWS (Amplify + Hostinger)

Step-by-step guide to host the site on AWS Amplify and connect a domain from Hostinger: [docs/DEPLOY-AWS-HOSTINGER.md](docs/DEPLOY-AWS-HOSTINGER.md). The repo includes an `amplify.yml` build spec for Amplify Hosting.

## Deploy with Docker

```bash
docker-compose up -d --build
```

The site will be available on port 3000.

## Deploy with PM2

```bash
npm run build
pm2 start ecosystem.config.js
```

## Nginx Reverse Proxy (optional)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
