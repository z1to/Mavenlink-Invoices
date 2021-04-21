<template>
  <div class="view-invoices">
    <div class="pb-2 mt-4 mb-2 border-bottom">
      <h1>View Invoices</h1>
    </div>
    <div v-if="isSingleInvoice">
      <ViewInvoice
        :invoiceId="invoiceId"
        :invoices="invoices"
        :invoiceIndex="invoiceIndex"
        @delete-invoice="onDeleteInvoice"
        @go-back="onGoBack"
      />
    </div>
    <div v-else class="container-fluid">
        <br>
      <div class="col-5">
        <input
          type="text"
          class="form-control"
          placeholder="Filter By Project"
          v-model="filter"
        />
        <br />
      </div>
      <div class="row">
        <div class="col-3 font-weight-bold p-3 mb-2 bg-secondary text-white">
          Date
        </div>
        <div class="col-3 font-weight-bold p-3 mb-2 bg-secondary text-white">
          Number
        </div>
        <div class="col-3 font-weight-bold p-3 mb-2 bg-secondary text-white">
          Project
        </div>
        <div
          class="col-3 font-weight-bold p-3 mb-2 bg-secondary text-white"
        ></div>
      </div>
      <div :key="index" v-for="(invoice, index) in filteredRows">
        <div class="row">
          <div class="col-3 border-bottom">
            {{ invoice.invoiceDate }}
          </div>
          <div class="col-3 border-bottom">INV{{ invoice.number }}</div>
          <div class="col-3 border-bottom">
            {{ invoice.projectId }}
          </div>
          <div
            class="col-3 border-bottom btn-group btn-group-toggle"
            data-toggle="buttons"
          >
            <label class="btn btn-outline-primary">
              <input
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                @click="viewInvoice(invoice._id, index)"
                checked
              />
              View
            </label>
            <label class="btn btn-outline-danger">
              <input
                type="radio"
                name="options"
                id="option3"
                autocomplete="off"
                @click="deleteInvoice(invoice._id)"
              />
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import numeral from "numeral";
import ViewInvoice from "@/components/ViewInvoice.vue";

export default {
  name: "ViewInvoices",
  components: {
    ViewInvoice,
  },
  data() {
    return {
      invoices: [],
      isSingleInvoice: false,
      invoiceId: "",
      invoiceIndex: 0,
      filter: "",
    };
  },
  computed: {
    filteredRows() {
      return this.invoices.filter((invoice) => {
        const name = invoice.projectId.toString();
        const searchTerm = this.filter.toString();
        return name.includes(searchTerm);
      });
    },
  },
  methods: {
    deleteInvoice: function (invoiceId) {
      axios({
        method: "delete",
        url: "http://localhost:5000/invoices/delete/" + invoiceId,
        headers: { Authorization: `Bearer ${this.$store.state.serviceToken}` },
      })
        .then((response) => {
          alert("Invoice successfully deleted!");
          this.invoices = this.invoices.filter(
            (invoice) => invoice._id != invoiceId
          );
        })
        .catch((error) => alert("Something went wrong!"));
    },
    viewInvoice: function (invoiceId, index) {
      this.isSingleInvoice = true;
      this.invoiceId = invoiceId;
      this.invoiceIndex = index;
      this.isEditMode = false;
    },
    onDeleteInvoice: function () {
      this.deleteInvoice(this.invoiceId);
      this.isSingleInvoice = false;
      this.invoiceId = "";
      this.invoiceIndex = 0;
    },
    onGoBack: function () {
      this.isSingleInvoice = false;
      this.invoiceId = "";
      this.invoiceIndex = 0;
    },
  },
  created() {
    this.isSingleInvoice = false;
    this.invoiceId = "";
    axios({
      method: "get",
      url: "http://localhost:5000/invoices",
      headers: { Authorization: `Bearer ${this.$store.state.serviceToken}` },
    })
      .then((response) => {
        this.invoices = response.data;
      })
      .catch((error) => alert("Something went wrong!"));
  },
};
</script>
