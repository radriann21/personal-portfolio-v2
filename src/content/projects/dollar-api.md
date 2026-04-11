---
title: "Dollar API"
description: "REST API for Venezuelan dollar exchange rates with real-time scraping, analytics, and Docker deployment"
image: "/project-3.webp"
tags: ["NestJS", "PostgreSQL", "Redis", "Prisma", "Docker"]
codeUrl: "https://github.com/radriann21/nest-api-dollar"
liveUrl: ""
featured: true
publishDate: 2026-04-06
---

## Overview

A production-ready REST API built with NestJS that provides real-time Venezuelan dollar exchange rates. The application scrapes data from official (BCV) and market (Binance P2P) sources, offering comprehensive endpoints for current prices, historical data, advanced analytics, and statistical analysis with automatic updates, intelligent caching, and containerized deployment.

## Key Features

- **Automated Data Collection**: Scheduled tasks scrape exchange rates from BCV (every 4h) and Binance P2P (every 2h)
- **Redis Caching**: Optimized performance with service-level cache and automatic invalidation on data updates
- **Advanced Analytics Suite**:
  - **Gap Analysis**: Real-time brecha cambiaria calculation with trend detection (INCREASING/DECREASING/STABLE)
  - **Gap Trend**: Historical comparison across periods (yesterday/week/month) with visual indicators
  - **Referential Dollar**: Weighted average (60% BCV + 40% Binance) as market reference
  - **Volatility Metrics**: Standard deviation and range analysis per source with interpretation labels
- **Rate Limiting**: Multi-tier throttling protection (short/medium/long windows)
- **Interactive Documentation**: Scalar UI with comprehensive examples and response schemas
- **Health Monitoring**: Database and Redis connectivity checks
- **Docker Support**: Multi-stage Dockerfile with Corepack and security best practices
- **CORS Configured**: Public API access with secure defaults

## API Endpoints

### Rates
- `GET /rates/last` - Latest BCV and Binance rates
- `GET /rates/bcv` - BCV rate only
- `GET /rates/binance` - Binance rate only

### Analytics
- `GET /analitics/gap` - Current brecha cambiaria with formatted output
- `GET /analitics/gap-trend?period=week` - Trend analysis with change metrics
- `GET /analitics/referential` - Weighted reference dollar calculation
- `GET /analitics/volatility?source=Binance&period=month` - Volatility analysis per source

### System
- `GET /` - Health check (DB + Redis status)
- `GET /api/reference` - Scalar API documentation

## Technical Highlights

### Backend Architecture
Built with **NestJS 11** following modular architecture with clear separation of concerns:
- **RatesModule**: Price retrieval with caching
- **AnalyticsModule**: Statistical calculations and trend analysis
- **ScrapperModule**: Data extraction from external sources
- **TasksModule**: Scheduled job orchestration
- **PrismaService**: Database abstraction layer

### Web Scraping System
Implements robust scraping with **Cheerio** (BCV web scraping) and **Undici** (Binance API):
- **BCV**: Extracts official rates from Banco Central de Venezuela website
- **Binance P2P**: Queries P2P API for USDT/VES offers with volume-weighted calculations
- **Trend Detection**: Automatic UP/DOWN/STABLE classification with variation tracking
- **Data Validation**: Duplicate detection and price change validation

### Caching Strategy
- **Service-level cache**: Manual get/set with standardized `{ price: number }` format
- **Cache Push**: New data immediately updates cache on scheduled fetch
- **TTL**: Configurable time-to-live with environment variables
- **Invalidation**: Automatic on data updates via scheduled tasks

### Analytics Engine
- **Gap Calculation**: `(Binance - BCV) / BCV * 100` with percentage formatting
- **Trend Analysis**: Historical comparison with emoji indicators and textual analysis
- **Volatility**: Standard deviation and range percentage with level classification (VERY_LOW to VERY_HIGH)
- **Referential Rate**: Configurable weighted average with calculation transparency

### Data Management
**Prisma ORM** with PostgreSQL:
- **ExchangeRate**: Historical records with price, trend, variation, timestamps
- **Sources**: BCV and Binance configuration with metadata
- **Decimal Precision**: 18,4 for accurate financial calculations
- **Indexing**: Optimized queries for latest rates and date ranges

### DevOps & Deployment
- **Multi-stage Dockerfile**: 3-stage build (deps → builder → runner) using Corepack
- **Security**: Non-root user (nestjs), minimal attack surface
- **Environment**: Full environment variable configuration support
- **Podman Compatible**: Uses `host.containers.internal` for local development

## Challenges & Solutions

### Challenge 1: Data Consistency Across Sources
**Problem**: BCV and Binance have different update frequencies and reliability.
**Solution**: Implemented independent scheduling (BCV every 4h, Binance every 2h), separate error handling per source, and cache isolation with source-specific keys.

### Challenge 2: Analytics Performance with Historical Data
**Problem**: Calculating trends and volatility requires querying date ranges that could be slow.
**Solution**: Used Prisma `findFirst` with `gte` date filters for efficient queries, added `dataPoints` metadata to responses, and implemented caching for computed analytics.

### Challenge 3: Type Safety with Decimal Values
**Problem**: Prisma Decimal types caused TypeScript issues with calculations.
**Solution**: Standardized `Number(price)` conversions in all calculations, consistent `toFixed(2)` formatting for display values.

### Challenge 4: Docker Image Optimization
**Problem**: Initial Docker builds were large and slow.
**Solution**: Implemented 3-stage build with Corepack for efficient pnpm handling, separated prod dependencies, and minimized final image size with Alpine Linux.

## Results

- **Performance**: Sub-100ms response time with Redis caching
- **Uptime**: Automated health checks for DB and Redis connectivity
- **Analytics**: 4 comprehensive endpoints with formatted, human-readable output
- **Documentation**: Full Scalar UI with request/response examples
- **Security**: Rate limiting, CORS, non-root Docker user, input validation
- **Developer Experience**: Podman support, environment-based configuration, clear logging

## What I Learned

This project deepened my expertise in:
- **Advanced NestJS**: Modular architecture, custom decorators, service injection patterns
- **Prisma ORM**: Type-safe queries, relation handling, Decimal precision management
- **Redis Caching**: Cache-aside pattern, manual invalidation, TTL configuration
- **Analytics Calculation**: Statistical metrics (std dev, weighted averages), trend detection
- **Docker Best Practices**: Multi-stage builds, Corepack usage, security hardening
- **API Design**: Consistent response formats, query parameter validation, error handling
- **Financial Data**: Handling currency precision, exchange rate calculations, market analysis
