---
title: "Dollar API"
description: "REST API for Venezuelan dollar exchange rates with real-time scraping and analytics"
image: "https://placehold.co/600x400/FF6B6B/FF6B6B"
tags: ["NestJS", "PostgreSQL", "Redis", "Prisma"]
codeUrl: "https://github.com/radriann21/dollar-api-nest"
liveUrl: "https://dollar-api-nest.vercel.app/api"
featured: true
publishDate: 2024-02-20
---

## Overview

A robust REST API built with NestJS that provides up-to-date Venezuelan dollar exchange rates. The application scrapes data from multiple sources (BCV and Binance P2P) and offers endpoints for current prices, historical data, and statistical analysis with automatic updates and intelligent caching.

## Key Features

- **Automated Updates**: Scheduled tasks scrape exchange rates every 4-6 hours
- **Redis Caching**: Optimized performance with 1-hour TTL cache strategy
- **Statistical Analysis**: Gap analysis, weighted averages, and trend detection
- **Rate Limiting**: API protection with 60 requests per minute limit
- **Interactive Documentation**: Swagger and Scalar UI for API exploration
- **Docker Support**: Containerized deployment ready

## Technical Highlights

### Backend Architecture
Built with **NestJS 11** following modular architecture principles. Uses **Prisma ORM** for type-safe database operations with PostgreSQL, and **Redis** for high-performance caching with cache-aside pattern.

### Web Scraping System
Implements intelligent scraping with **Cheerio** and **Axios**:
- **BCV**: Extracts official rates from the Central Bank website
- **Binance P2P**: Queries Binance API for USDT/VES offers with volume-weighted calculations
- Automatic trend detection (UP/DOWN/STABLE) and variation tracking

### Data Management
**Prisma** schema with two main models:
- **ExchangeRate**: Historical price records with trend analysis
- **Sources**: Data source configuration with weights for averaging
- Decimal precision (18,4) for accurate financial calculations

## Challenges & Solutions

### Challenge 1: Data Consistency
Ensuring reliable data from external sources required implementing retry logic, error handling, and validation. Created a robust scraping service with fallback mechanisms and duplicate detection.

### Challenge 2: Performance Optimization
With frequent queries and updates, performance was critical. Implemented Redis caching with smart invalidation strategies and database indexing to maintain sub-100ms response times.

## Results

- Sub-100ms average response time with caching
- 99.9% uptime with automated health checks
- Comprehensive analytics endpoints (gap, averages, trends)
- Protected with rate limiting and security headers
- Full API documentation with Scalar UI

## What I Learned

This project deepened my expertise in:
- Advanced NestJS patterns (modules, guards, interceptors)
- Web scraping techniques and data extraction
- Redis caching strategies and invalidation patterns
- Scheduled tasks with cron expressions
- API security best practices (CORS, Helmet, rate limiting)
