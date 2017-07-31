import * as React from 'react';
import './App.css';
import gql from "graphql-tag";
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
  graphql
} from 'react-apollo'


// TODO: create type for data passed into TodoList function

// export type Props = Response & QueryProps;
// export interface AllTodoListData {
//     data: {
//         networkStatus: number,
//         allTodoLists: {
//              edges: Array<{}>
//         }
//     }
// }

export interface Edge {
    node: {
        name: string
    }
}

const TodoList = ({ data: { networkStatus, allTodoLists } }: any) => {
  return (
    <div>
        <ul>
            {networkStatus == 7 && allTodoLists['edges'].map((edge: Edge, i: number) => <li key={i}>{edge.node.name}</li> ) }
        </ul>
    </div>
  )
}
const TodoLists = gql`
    {
        allTodoLists {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`

const TodoListWithData = graphql(TodoLists)(TodoList)

class App extends React.Component<{}, {}> {

    createClient() {
      return new ApolloClient({
          networkInterface: createNetworkInterface({
            uri: 'http://localhost:5000/graphql'
          })
      })
    }
    render() {
        return (
            <ApolloProvider client={this.createClient()}>
                <TodoListWithData />
            </ApolloProvider>
        );
  }
}

export default App;
