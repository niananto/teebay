import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'  
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './contexts/AuthContext.tsx'
import '@mantine/core/styles.css';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MantineProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MantineProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
