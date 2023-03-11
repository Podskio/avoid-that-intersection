# Avoid That Intersection

Visually map the location of PulsePoint traffic collision data in a particular region. Over time, this heatmap can be used to identify dangerous intersections and other accident-prone areas.

Created with React, Vite, Leaflet, Leaflet.heat, Fastify, tRPC, and Kysely.

## How it works

Every 12 hours, the backend server will query the PulsePoint API and store any variations of traffic collisions (expanded, involving structure, etc) in the database. Incidents are identified by their PulsePoint-issued id to prevent duplicates. This data is served to the frontend, which is plotted onto a map. Incidents receive a different intensity on the heatmap based on the severity of the call.

## Deployment

### /frontend

Add environment variables:

```sh
VITE_AGENCY_LABEL= # Text displayed at the top of the page, should reflect the agency or region the data is from
VITE_BACKEND_URL=
```

### /backend

Add environment variables:

```sh
PORT= # Optional, this might be set automatically by your hosting provider
DATABASE_URL= # PostgreSQL connection string
AGENCIES= # String of comma-separated PulsePoint agency IDs
```

Run `pnpm init-db` after setting `DATABASE_URL` to create the required database schema.
