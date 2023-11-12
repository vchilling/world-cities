<template>
    <div>
        <h1>Add New City</h1>
    
        <form @submit.prevent="addCity">
            <CustomInput v-for="field in fields" :key="field.id" :id="field.id" :type="field.type" :label="field.label" :model="newCity[field.id]" @update:model="updateInputField" />
            <div>
                <CustomButton type="submit">Save City</CustomButton>
            </div>
        </form>
    
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
    </div>
</template>

<script>
import CustomButton from './FormElements/CustomButton.vue';
import CustomInput from './FormElements/CustomInput.vue';

export default {
    data() {
        return {
            newCity: {
                name: '',
                area: null,
                population: null,
            },
            fields: [
                { id: 'name', label: 'Name:', type: 'text' },
                { id: 'area', label: 'Area:', type: 'decimal' },
                { id: 'population', label: 'Population:', type: 'number' },
            ],
            error: null,
        };
    },
    components: {
        CustomButton,
        CustomInput,
    },
    methods: {
        updateInputField({ id, value, type }) {
            if (type === 'number' || type === 'decimal') {
                value = Number(value);
            }
            this.newCity = { ...this.newCity, [id]: value };
        },
        async addCity() {
            try {
                await this.$axios.post('http://localhost:3000/api/addCity', JSON.stringify(this.newCity), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                this.error = null;
                this.$router.push('/');
            } catch (error) {
                if (typeof error.response === "undefined") {
                    this.error = error.message;
                } else {
                    this.error = error.response.data.error;
                }
            }
        },
    },
};
</script>

<style scoped>
.error-message {
    color: #ff0000;
    margin: 25px auto;
}
form {
    width: 75%;
    margin: 0 auto;
}
form>div {
    margin: 20px;
}
</style>