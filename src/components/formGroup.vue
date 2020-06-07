<template>
  <div class="form-group">
    <label v-if="this.label" class="form-label" :for="id">{{label}}:</label>

    <form-control
      :id="id"
      :model="model"
      :type="type"
      :invalid="invalid"
      :classes="classes"
      :props="props"
      :data="data"
      :events="events"
      :css="css"
      @update="$emit('update:model', $event)"
    >
      <slot></slot>
    </form-control>
    <div v-if="validFeedback" class="valid-feedback">{{validFeedback || 'Looks good!'}}</div>
    <div v-if="invalidFeedback" class="invalid-feedback">{{invalidFeedback || 'Please fill this field!'}}</div>
  </div>
</template>

<script>
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";

Vue.component("form-control", {
  render: function(createElement) {
    return createElement(
      this.form,
      {
        class: [
          "form-control",
          this.invalid ? "is-invalid" : "is-valid",
          ...this.clasNames
        ],
        style: {
          ...this.css
        },
        attrs: {
          id: this.id,
          type: this.type,
          ...this.props,
          ...this.dataset
        },
        on: {
          keyup: $event => this.$emit("update", $event.target.value),
          keydown: $event => this.$emit("keydown", $event.target.value),
          change: $event => this.$emit("change", $event.target.value),
          ...this.events
        }
      },
      this.$slots.default // array of children
    );
  },
  props: {
    label: { type: String },
    type: { type: String, default: "text" },
    invalid: { type: Boolean },
    invalidFeedback: { type: String },
    validFeedback: { type: String },
    css: { type: Object },
    classes: { type: String },
    props: Object,
    data: Object,
    events: Object
  },
  computed: {
    form: function() {
      switch (this.type) {
        case "textarea":
        case "select":
          return this.type;
        default:
          return "input";
      }
    },
    clasNames: function() {
      return this.classes
        ? this.classes
            .split(" ")
            .toString()
            .split(",")
        : [];
    },
    dataset: function() {
      const result = {};

      if (this.data) {
        for (let entry of Object.entries(this.data)) {
          const [key, value] = entry;
          result[`data-${key}`] = value;
        }
        return result;
      } else {
        return {};
      }
    }
  }
});

export default {
  props: {
    model: { type: String, required: true },
    label: { type: String },
    type: { type: String, default: "text" },
    invalid: { type: Boolean },
    validFeedback: { type: String },
    invalidFeedback: { type: String },
    css: { type: Object },
    classes: { type: String },
    props: Object,
    data: Object,
    events: Object
  },
  computed: {
    id: () => uuidv4()
  }
};
</script>

<style scoped >

  @import "../assets/bootstrap.css";
.form-group {
  text-align: left;
}
</style>
