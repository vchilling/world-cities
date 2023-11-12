<template>
    <div>
        <label class="customLabel" :for="id">
          {{ label }}
        </label>

        <input class="customInput" :type="type" :placeholder="placeholder" :id="id" :label="label" :value="model" @input="updateModel" />
          <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        for: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: {
            type: String,
            default: "",
        },
        id: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        model: {
            type: [String, Number],
            default: "",
        },
    },
    methods: {
        updateModel(event) {
            this.$emit("update:model", {
                id: this.id,
                value: event.target.value,
                type: this.type,
            });
        },
    },
};
</script>

<style scoped>
.customLabel {
    display: inline-block;
    width: 140px;
    text-align: left;
    font-weight: bold;
}
.customInput {
    margin: 5px 25px;
    height: 22px;
}
</style>
