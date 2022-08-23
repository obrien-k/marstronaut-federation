import { ApolloExplorer } from '@apollo/explorer/react';
  
export function EmbeddedExplorer() {
  return (
    <ApolloExplorer 
      graphRef='Marstronaut@current'
      persistExplorerState={false}
      initialState={{
        document: `query ExampleQuery {
  accounts {
    id
  }
  Apod {
    url
  }
  totally {
    id
  }
}
`,
        variables: {},
        headers: {},
        displayOptions: {
          showHeadersAndEnvVars: true, 
          docsPanelState: 'open', 
          theme: 'dark',
        },
      }}
    />
  );
}
