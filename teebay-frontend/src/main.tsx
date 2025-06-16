import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'  
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql",
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
