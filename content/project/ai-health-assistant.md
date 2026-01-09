---
title: AI Health Assistant Line Bot
year: 2025
skills: ["ASP.NET Core", "Vue 3", "OpenAI", "Google Gemini", "Hangfire", "SQL Server", "LINE API"]
summary: LINE Bot integrating AI for food image recognition and nutrition analysis. Features admin dashboard, scheduled tasks, and personalized health recommendations.
images: ["/images/ai-health-assistant/1.png"]
github: ""
demo: ""
---

## Overview

A comprehensive health management platform integrating LINE Bot, AI image recognition, and personalized health coaching to help users track their diet and receive tailored health advice.

## Project Duration

March 2025 - June 2025

## My Role & Contributions

### AI Integration

- Integrated OpenAI GPT-4o/GPT-4o-mini for conversational AI
- Implemented Google Gemini for food image recognition
- Developed nutrition analysis pipeline

### LINE Bot Development

- Built LINE Messaging API integration
- Implemented AI-powered health conversations
- Created message push notification system

### Backend Architecture

- Designed and implemented RESTful APIs
- Built Hangfire scheduled task system
- Developed admin dashboard backend services
- Refactored image processing pipeline using SkiaSharp

### Admin Dashboard

- User management interface
- Diet record tracking
- Questionnaire management
- Reward system administration

## Tech Stack

### Backend

- **Framework**: ASP.NET Core 6
- **ORM**: Entity Framework Core
- **Database**: SQL Server
- **Job Scheduler**: Hangfire
- **Image Processing**: SkiaSharp

### Frontend

- **Framework**: Vue 3
- **UI Library**: Vuetify 3
- **Language**: TypeScript

### AI Services

- **Conversation**: OpenAI GPT-4o / GPT-4o-mini
- **Image Recognition**: Google Gemini
- **Analysis**: Custom nutrition algorithms

### Integration

- **Messaging**: LINE Messaging API
- **Push Notifications**: LINE Push API

## Key Features

### For Users

- Food photo analysis with AI
- Nutritional breakdown and recommendations
- Daily diet tracking
- Personalized health advice
- Scheduled reminders and tips

### For Administrators

- User management dashboard
- Diet record monitoring
- Questionnaire creation and analysis
- Reward system management
- System analytics and reports

## Technical Highlights

### Image Processing Refactoring

Refactored the entire image processing workflow using SkiaSharp to improve:

- Cross-platform compatibility
- Performance optimization
- Memory management
- Image quality

### Scheduled Tasks

Implemented robust scheduling system with Hangfire:

- Daily health reminders
- Nutrition report generation
- Automated message dispatch
- Data cleanup tasks

### AI Integration Strategy

- Fallback mechanisms between AI providers
- Cost optimization through model selection
- Response caching for common queries
- Rate limiting and quota management

## Challenges & Solutions

**Challenge**: AI response consistency
**Solution**: Implemented prompt engineering techniques and response validation

**Challenge**: High volume image processing
**Solution**: Asynchronous processing queue with SkiaSharp optimization

**Challenge**: Real-time LINE webhook handling
**Solution**: Event-driven architecture with message queuing

## Results

- Successfully deployed to production
- Handled 10,000+ food image analyses
- 95%+ user satisfaction rate
- Reduced manual nutritionist workload by 60%
