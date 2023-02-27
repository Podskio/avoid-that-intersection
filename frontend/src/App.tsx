import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import Map from "./components/Map"
import Overlay from "./components/Overlay"
import { trpc } from "./utils/trpc"

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }),
  )
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_BACKEND_URL,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Map />
        <Overlay />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
