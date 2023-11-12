<template>
    <div>
        <h1>World cities</h1>

        <div class="userActions">
            <div class="leftDiv">
                <CustomInput :id="'filterInput'" :type="'text'" :label="'Filter by Name'" :model="filterByName" 
                    @update:model="updateInputField" @input="this.fetchCities" />
            </div>
            <div class="rightDiv">
                <CustomButton @click="goToAddCity">Add new city</CustomButton>
            </div>
        </div>

        <div v-if="error" class="error-message">
            {{ error }}
        </div>

        <table>
            <thead>
                <tr>
                    <th @click="sort('name')" class="sortBy">Name</th>
                    <th @click="sort('area')" class="sortBy">Area</th>
                    <th @click="sort('population')" class="sortBy">Population</th>
                    <th>Density</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="city, index in cities" :key="index" :class="{ 'highlighted': city.population > 1000000 }">
                    <td>{{ city.name }}</td>
                    <td>{{ city.area }}</td>
                    <td>{{ city.population }}</td>
                    <td>{{ city.density }}</td>
                </tr>
            </tbody>
        </table>
    
    </div>
</template>
  
<script>
import CustomButton from './FormElements/CustomButton.vue';
import CustomInput from './FormElements/CustomInput.vue';

export default {
    data() {
        return {
            cities: [],
            sortKey: null,
            sortDirection: 'asc',
            filterByName: '',
            error: null,
        };
    },
    mounted() {
        this.fetchCities();
    },
    components: {
        CustomButton,
        CustomInput
    },
    methods: {
        async fetchCities() {
            try {
                const response  = await this.$axios.get('http://localhost:3000/api/cities',{
                    params: {
                        sortBy: this.sortKey,
                        sortOrder: this.sortDirection,
                        nameFilter: this.filterByName,
                    },
                });
                this.cities = response.data;
            } catch (error) {
                this.error = error.message; 
            }
        },
        sort(key) {
            if (this.sortKey === key) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortDirection = 'asc'; 
            }

            this.fetchCities();
        },
        goToAddCity() {
            this.$router.push('/add-city'); 
        },
        updateInputField({ value }) {
            this.filterByName = value;
        },
    },
};
</script>
  
<style scoped>
.userActions {
    display: flex;
    justify-content: space-between;
    width: 75%;
    margin: 25px auto;
}
.leftDiv, .rightDiv {
    width: 48%; 
    padding: 10px;
    margin: auto;
}
table {
    border-collapse: collapse;
    width: 75%;
    max-width: 100%;
    margin: 0 auto;
}
th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
th {
    background-color: #c5dde3;
}
th {
  user-select: none;
}
.highlighted {
  background-color: #d8efda; 
}
.sortBy {
    cursor: pointer;
}
.sortBy:hover {
  text-decoration: underline;
}
.sortBy::after{
    content: "";
    display: block;
    background: url("../assets/sort.png") no-repeat;
    background-size: 100%;
    width: 13px;
    height: 13px;
    float: right;
    opacity: 0.75;
    margin: 2px 0 0;
}

@media only screen and (max-width: 768px) {
    .userActions {
        width: 100%;
        display: block;
    }
    .leftDiv, .rightDiv {
        width: 100%; 
    }
}
</style>