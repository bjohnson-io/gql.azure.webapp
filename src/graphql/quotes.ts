import Vue from 'vue';
import gql from 'graphql-tag';

const MUTATION_CREATE_QUOTE = gql`
  mutation createQuote($input: CreateQuoteInput!) {
    createQuote(input: $input) {
      RowKey
      source
      quote
    }
  }
`;

const MUTATION_DELETE_QUOTE = gql`
  mutation deleteQuote($RowKey: ID!) {
    deleteQuote(RowKey: $RowKey) {
      RowKey
      source
      quote
    }
  }
`;

const QUERY_LIST_QUOTES = gql`
  query {
    listQuotes {
      RowKey
      source
      quote
    }
  }
`;

const SUBSCRIPTION_QUOTE_CREATED = gql`
  subscription {
    quoteCreated {
      RowKey
      source
      quote
    }
  }
`;

const SUBSCRIPTION_QUOTE_UPDATED = gql`
  subscription {
    quoteUpdated {
      RowKey
      source
      quote
    }
  }
`;

const SUBSCRIPTION_QUOTE_DELETED = gql`
  subscription {
    quoteDeleted {
      RowKey
      source
      quote
    }
  }
`;

const QUOTE_CREATED = {
  document: SUBSCRIPTION_QUOTE_CREATED,
  updateQuery(current, { subscriptionData }) {
    let quotes = current.listQuotes;
    const newQuote = subscriptionData.data.quoteCreated;
    return { listQuotes: [...quotes, newQuote] };
  },
};

const QUOTE_UPDATED = {
  document: SUBSCRIPTION_QUOTE_UPDATED,
  updateQuery(current, { subscriptionData }) {
    let quotes = current.listQuotes;
    const updatedQuote = subscriptionData.data.quoteUpdated;
    const index = quotes.findIndex(q => q.RowKey === updatedQuote.RowKey);
    if (index >= 0) {
      Vue.set(quotes, index, updatedQuote);
    }
    return { listQuotes: quotes };
  }
}

const QUOTE_DELETED = {
  document: SUBSCRIPTION_QUOTE_DELETED,
  updateQuery(current, { subscriptionData }) {
    let quotes = current.listQuotes;
    const deletedQuote = subscriptionData.data.quoteDeleted;
    return { listQuotes: quotes.filter(q => q.RowKey !== deletedQuote.RowKey) };
  },
}

export const GQL = {
  QUERY: {
    LIST_QUOTES: QUERY_LIST_QUOTES
  },
  MUTATION: {
    CREATE_QUOTE: MUTATION_CREATE_QUOTE,
    DELETE_QUOTE: MUTATION_DELETE_QUOTE
  },
  SUBSCRIPTION: {
    QUOTE_CREATED,
    QUOTE_UPDATED,
    QUOTE_DELETED
  }
}

export default { GQL };