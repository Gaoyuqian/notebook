<!--button components-->
<!--大中小吧,-->

<template>
  <button :disabled='disabled' :class="[cls]" @click='clickHandle'><slot></slot></button>
</template>
<script>
export default {
  methods: {
    clickHandle: function(evt) {
        this.$emit('click',evt);
    }
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: { type: String, default: "full" },
    disabled: Boolean,
    radius: { type: String, default: "none" }
  },
  computed: {
    cls() {
      var cls = ["v-btn"];
      cls.push(`v-btn-${this.size}`);
      if (this.disabled) {
        cls.push(`v-btn-disabled`);
      }
      !this.radius
        ? cls.push(`v-btn-border-none`)
        : cls.push(`v-btn-border-${this.radius}`);

      return cls;
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log(
      this.radius,
      this.disabled,
      this.type,
      this.cls,
      this.$slots.default
    );
  }
};
</script>
<style lang="scss" scoped>
.v-btn {
  height: 2rem;
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
  background: rgba(232, 122, 144, 1);
  color: #fff;
  justify-content: center;
  box-sizing: border-box;
}
.v-btn[disabled] {
  background: #888;
}

.v-btn-full {
  width: 100%;
}
.v-btn-half {
  width: 50%;
}
.v-btn-border-small {
  border-radius: 0.25rem;
}
.v-btn-border-full {
  border-radius: 50%;
}
</style>


