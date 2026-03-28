export type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

// Typed context so userId is available in all blog routes
export type AuthVariables = {
  userId: string
}