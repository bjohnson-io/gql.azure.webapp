<template>
  <div class="hello">
    <v-dialog />
    <h1>Quotes</h1>
    <hr />
    <div v-for="q of listQuotes" :key="q.RowKey" @click="confirmDelete(q)">
      <p>{{ q.quote }}</p>
      <p>
        - <em>{{ q.source }}</em>
      </p>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GQL } from '../graphql/quotes';

export default Vue.extend({
  name: 'Quotes',
  apollo: {
    listQuotes: {
      query: GQL.QUERY.LIST_QUOTES,
      subscribeToMore: [
        GQL.SUBSCRIPTION.QUOTE_CREATED,
        GQL.SUBSCRIPTION.QUOTE_UPDATED,
        GQL.SUBSCRIPTION.QUOTE_DELETED
      ]
    }
  },
  methods: {
    confirmDelete(quote) {
      this.$modal.show('dialog', {
        title: 'Delete this quote?',
        text: 'Please confirm or cancel deletion of this quote.',
        buttons: [
          {
            title: 'Cancel',
            handler: () => this.$modal.hide('dialog')
          },
          {
            title: 'Delete',
            handler: async () => {
              this.$modal.hide('dialog');
              await this.deleteQuote(quote);
            }
          }
        ]
      });
    },
    async deleteQuote(quote) {
      console.log('deleteQuote()');
      console.log(quote.RowKey);
      const res = await this.$apollo.mutate({
        mutation: GQL.MUTATION.DELETE_QUOTE,
        variables: {
          RowKey: quote.RowKey
        }
      })
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
