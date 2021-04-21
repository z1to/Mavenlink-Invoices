<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-3 font-weight-bold p-3 mb-2 bg-secondary text-white text-left"
      >
        Date Performed
      </div>
      <div class="col-5 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Description
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Hours
      </div>
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Rate
      </div>
      <div class="col-2 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Total
      </div>
    </div>
    <br />
    <div :key="index" v-for="(invoiceLine, index) in invoiceLines">
      <div class="row">
        <div class="col-2 border-bottom">
          <p class="text-left">{{ invoiceLine.date_performed }}</p>
        </div>
        <div class="col-5 text-left border-bottom">
          <p>Notes: {{ invoiceLine.notes }}</p>
          <p>Approved: {{ invoiceLine.approved ? "Yes" : "No" }}</p>
          <p>Task title: {{ invoiceLine.title }}</p>
          <p>Task description: {{ invoiceLine.description }}</p>
        </div>
        <div class="col-1 border-bottom">
          {{ invoiceLine.time_in_minutes / 60 }}
        </div>
        <div class="col-1 border-bottom">{{ rate }} USD</div>
        <div class="col-2 border-bottom">
          {{ lineTotal(rate, time_in_minutes) }} USD
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import axios from 'axios';

export default {
  name: "ViewInvoice",
  data() {
    return {
      invoiceLines: [],
    };
  },
  props: {
    invoiceId: String,
  },
  computed: {
    lineTotal: function (rate, time_in_minutes) {
      return numeral(rate * (time_in_minutes / 60)).format("0,0");
    },
  },
  mounted() {
      console.log(this.invoiceId);
    axios({
      method: "get",
      url: "http://localhost:5000//invoices/invoiceLines",
      headers: { Authorization: `Bearer ${this.$store.state.serviceToken}` },
      params: {
        invoiceId: this.invoiceId,
      },
    })
      .then((response) => {
        console.log(response);
        this.invoiceLines = response;
      })
      .catch((error) => alert("Something went wrong!"));
  },
};
</script>
