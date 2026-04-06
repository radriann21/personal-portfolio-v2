---
title: "Price Controller"
description: "Full-stack application for dynamic product pricing with automatic exchange rate updates and real-time synchronization"
image: "/project-2.webp"
tags: ["NestJS", "React", "PostgreSQL", "Prisma", "TanStack Query", "Chakra UI"]
codeUrl: "https://github.com/radriann21/price-controller-backend"
liveUrl: ""
featured: true
publishDate: 2024-01-15
---

## Overview

A comprehensive full-stack application for managing dynamic product pricing in volatile currency environments. The system automatically calculates prices in Venezuelan Bolívares (VES) based on USD costs, real-time exchange rates, and configurable profit margins. Built with NestJS backend and React frontend, featuring real-time updates via Server-Sent Events (SSE).

## Key Features

- **Automated Price Updates**: Scheduled tasks fetch exchange rates and recalculate all product prices
- **Real-time Synchronization**: SSE connection for instant exchange rate notifications to frontend
- **Dual Profit Margins**: Global margin with per-product override capability
- **Price History Tracking**: Complete audit trail of all price changes
- **Excel Integration**: Bulk import/export of product catalogs
- **Category Management**: Hierarchical product organization with visual interface
- **Secure Authentication**: JWT-based auth with HTTP-only cookies and protected routes

## Technical Highlights

### Backend Architecture
Built with **NestJS 11** following modular architecture with feature-based modules. Uses **Prisma ORM** for type-safe database operations with PostgreSQL 16, implementing repository pattern for data access and scheduled tasks with cron expressions.

**Price Calculation Engine**:
- Formula: `priceVes = costUsd × exchangeRate × (1 + profitMargin/100)`
- Automatic updates via cron jobs fetching BCV rates
- Transaction-based batch operations for mass updates
- History tracking with old/new values for every change

**Security Implementation**:
- Passport JWT strategy with HTTP-only cookies
- Bcrypt password hashing with salt rounds
- Route guards protecting sensitive endpoints
- CORS configured for specific frontend origin
- DTO validation with class-validator

### Frontend Architecture
Built with **React 19** and **TypeScript** following feature-based architecture. Uses **Zustand** for lightweight global state management and **TanStack Query** for server state with intelligent caching and automatic refetching.

**Real-time Updates**:
- Custom `useSSE` hook for Server-Sent Events connection management
- Automatic reconnection with exponential backoff
- Toast notifications for rate changes
- Optimistic UI updates with query invalidation

**Form Management**:
- React Hook Form with Zod schema validation
- Type-safe validation with real-time error feedback
- Optimistic updates with rollback on failure
- File upload handling for bulk imports

**UI/UX Design**:
- Chakra UI 3 component system with responsive design
- Modal dialogs for create/edit operations
- Tab-based navigation between products and categories
- Loading states and skeleton screens

## Challenges & Solutions

### Challenge 1: Real-time Price Synchronization
Keeping frontend prices synchronized with backend updates required robust real-time communication. Implemented Server-Sent Events (SSE) with automatic reconnection logic and TanStack Query cache invalidation to ensure data consistency across all clients.

### Challenge 2: Mass Price Updates Performance
Updating hundreds of products when exchange rates change needed efficient batch operations. Implemented Prisma transaction-based updates with optimistic locking to prevent race conditions while maintaining sub-200ms response times.

### Challenge 3: SSE Connection Management
Maintaining stable SSE connections across page navigation and network issues required robust error handling. Created a custom hook with automatic reconnection, cleanup on unmount, and connection state tracking with exponential backoff.

## Results

- Automatic price updates every 6 hours via cron
- Real-time exchange rate updates with SSE
- Complete price history with timestamp tracking
- Excel import/export for bulk operations
- Sub-200ms response times for product queries
- Optimistic UI updates for instant feedback
- Comprehensive API documentation with Swagger
- Responsive design across all device sizes

## What I Learned

This project deepened my expertise in:
- Full-stack architecture with NestJS and React
- Server-Sent Events (SSE) implementation and management
- Advanced TanStack Query patterns (optimistic updates, cache invalidation)
- NestJS advanced patterns (guards, interceptors, pipes, scheduled tasks)
- Prisma ORM with complex relationships and transactions
- JWT authentication strategies with Passport
- React Hook Form with Zod schema validation
- Zustand state management with persistence
- Excel file processing with XLSX library
- Chakra UI theming and component customization
