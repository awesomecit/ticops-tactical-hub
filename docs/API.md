# TicOps API Documentation

## Overview

This document describes the API structure for TicOps. The API is designed to be compatible with Supabase Edge Functions.

## Base Configuration

```typescript
// src/api/config.ts
API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
```

## Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| POST | `/auth/logout` | User logout |
| GET | `/auth/me` | Get current user |

### Games
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/games` | List all games |
| GET | `/games/:id` | Get game by ID |
| POST | `/games` | Create game |
| POST | `/games/:id/join` | Join game |
| POST | `/games/:id/leave` | Leave game |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List users |
| GET | `/users/:id` | Get user profile |
| GET | `/users/:id/stats` | Get user statistics |

### Teams
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/teams` | List teams |
| GET | `/teams/:id` | Get team |
| POST | `/teams/:id/join` | Join team |

### Leaderboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/leaderboard/global` | Global rankings |
| GET | `/leaderboard/distribution` | Tier distribution |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications` | List notifications |
| POST | `/notifications/:id/read` | Mark as read |

## Usage

```typescript
import { gamesService } from '@/api/services';

// Get all games
const { data, error } = await gamesService.getAll();
```

## Mock Mode

Set `USE_MOCK = false` in `src/api/mock.ts` to use real API.
