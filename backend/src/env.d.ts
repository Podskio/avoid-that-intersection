/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
  interface ProcessEnv {
    PORT?: number
    DATABASE_URL: string
    AGENCIES: string
    MIN_INCIDENT_DURATION: string
  }
}
