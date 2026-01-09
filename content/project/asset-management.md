---
title: Personal Asset Management System
year: 2025
skills: ["Vue", "Supabase", "OAuth", "TypeScript", "PostgreSQL"]
summary: Asset tracking platform with Google authentication. Features dashboard for visualizing portfolio performance across Taiwan and US stock markets.
images: ["/images/asset-management/1.png"]
github: ""
demo: ""
---

## Overview

A personal finance application for tracking stock investments across Taiwan and US markets with real-time portfolio visualization.

## Features

- **Authentication**: Google OAuth integration via Supabase Auth
- **Multi-Market Support**: Track both Taiwan and US stocks
- **Dashboard**: Visual representation of current assets
- **Historical Trends**: View portfolio performance over time
- **Real-time Data**: Live stock price updates

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Chart.js
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Auth**: Google OAuth 2.0
- **APIs**: Stock market data APIs

## Development Period

November 2025 - Present

## Architecture

- Serverless architecture using Supabase
- Row Level Security (RLS) for data protection
- Real-time subscriptions for live updates

## Challenges & Solutions

- **Challenge**: Managing different market time zones
- **Solution**: Implemented timezone-aware date handling

- **Challenge**: Efficient data fetching for multiple stocks
- **Solution**: Batch API requests and caching strategies
