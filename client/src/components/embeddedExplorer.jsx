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
        variables: {
          "comicNumber": 1078,
          "roverName": "curiosity",
          "earthDate": "2012-07-06"
        },
        headers: {},
        displayOptions: {
          showHeadersAndEnvVars: true, 
          docsPanelState: 'closed', 
          theme: 'dark',
        },
      }}
    />
  );
}
