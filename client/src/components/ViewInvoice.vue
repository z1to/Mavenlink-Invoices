<template>
  <div class="container-fluid">
    <br />
    <h5 class="col 5">Date: {{ invoices[invoiceIndex].invoiceDate }}</h5>
    <br />
    <h5 class="col 5">Number: INV{{ invoices[invoiceIndex].number }}</h5>
    <br />
    <h5 class="col 5">Project: {{ invoices[invoiceIndex].projectId }}</h5>
    <br />
    <button
      type="button"
      class="btn btn-secondary btn-lg"
      @click="$emit('go-back')">
      Back
    </button>
      <p/>
    <button
      v-if="isEditMode"
      type="button"
      class="btn btn-success btn-lg"
      @click="updateInvoice"
    >
      Save
    </button>
    <button v-else type="button" class="btn btn-primary btn-lg" @click="toggle">
      Edit
    </button>
    <p />
    <button type="button" class="btn btn-danger btn-lg " @click="$emit('delete-invoice')">Delete</button>
    <br />
    <br />
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
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white" />
      <div class="col-1 font-weight-bold p-3 mb-2 bg-secondary text-white">
        Total
      </div>
    </div>
    <br />
    <div :key="index" v-for="(invoiceLine, index) in invoiceLines">
      <div class="row">
        <div class="col-3 border-bottom">
          <p class="text-left">{{ formatDate(invoiceLine.datePerformed) }}</p>
        </div>
        <div class="col-5 text-left border-bottom">
          <p>Notes: {{ invoiceLine.notes }}</p>
          <p>Approved: {{ invoiceLine.approved ? "Yes" : "No" }}</p>
          <p>Task title: {{ invoiceLine.title }}</p>
          <p>Task description: {{ invoiceLine.description }}</p>
        </div>
        <div class="col-1 border-bottom">
          {{ invoiceLine.timeInMinutes / 60 }}
        </div>
        <div class="col-1 border-bottom" v-if="isEditMode">
          <input type="text" class="form-control" v-model="invoiceLine.rate" />
        </div>
        <div class="col-1 border-bottom" v-else>
          {{ invoiceLine.rate }}
        </div>
        <div class="col-1 border-bottom">
          <p>USD</p>
        </div>
        <div class="col-1 border-bottom">
          {{ lineTotal(invoiceLine.rate, invoiceLine.timeInMinutes) }} USD
        </div>
      </div>
      <br />
    </div>
    <div class="row d-flex justify-content-center">
      <h5>Total: {{ total }} USD</h5>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import axios from "axios";

export default {
  name: "ViewInvoice",
  data() {
    return {
      invoiceLines: [],
      isEditMode: false
    };
  },
  props: {
    invoiceId: String,
    invoiceIndex: Number,
    invoices: Array
  },
  computed: {
    total: function () {
      var totalPerTimeEntry = this.invoiceLines.map((result) => {
        return this.lineTotal(result.rate, result.timeInMinutes);
      });
      if (totalPerTimeEntry.length > 0) {
        return numeral(
          totalPerTimeEntry.reduce(
            (prev, current) => parseFloat(prev) + parseFloat(current)
          )
        ).format("0,0");
      }
      return 0;
    },
  },
  methods: {
    lineTotal: function (rate, time_in_minutes) {
      console.log(rate);
      return numeral(rate * (time_in_minutes / 60)).format("0,0");
    },
    formatDate: function (date) {
      return date.split("T")[0];
    },
    updateInvoice: function () {
      this.invoiceLines.map((invoiceLine) => {
        axios({
          method: "put",
          url: "http://localhost:5000/invoices/invoiceLines/update",
          headers: {
            Authorization: `Bearer ${this.$store.state.serviceToken}`,
          },
          data: {
            id: invoiceLine._id,
            newValues: invoiceLine,
          },
        }).catch((error) => alert("Something went wrong!"));
      });
      alert("The invoice has been successfully updated!");
      this.isEditMode = !this.isEditMode;
    },
    toggle: function () {
      this.isEditMode = !this.isEditMode;
    },
  },
  mounted() {
    console.log(this.invoiceId);
    axios({
      method: "get",
      url: "http://localhost:5000/invoices/invoiceLines",
      headers: { Authorization: `Bearer ${this.$store.state.serviceToken}` },
      params: {
        invoiceId: this.invoiceId,
      },
    })
      .then((response) => {
        console.log(response);
        this.invoiceLines = response.data;
      })
      .catch((error) => alert("Something went wrong!"));
  },
  emits: ["delete-invoice", "go-back"],
};
</script>
