<template>
    <div class="container">
        <div>
            <h1>Products</h1>
            <div v-if="products.length === 0">Nothing here.</div>
            <div class="row">
                <div class="col-md-3" v-for="(p, index) in products" :key="index">
                    <div class="card">
                        <img width="200" height="200" class="card-img-top" :src="p.imageUrl + '?random=' + index">
                        <div class="card-body">
                            <h5 class="card-title">{{ p.title }}</h5>
                            <p class="card-text">{{ p.description }}</p>
                            <a href="#" @click.prevent="deleteProduct(p)" class="btn btn-primary">Delete</a>
                            <a href="#" @click.prevent="editProduct(p)" class="btn btn-secondary">Edit</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ProductService from "../services/ProductService";

  export default {
    name: "product-list",
    data() {
      return {
        products: [],
      };
    },
    methods: {
      loadProducts() {
        ProductService.getAll()
          .then(response => {
            this.products = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },

      deleteProduct(product) {
        ProductService.delete(product.id)
          .then(() => this.loadProducts())
          .catch(e => console.log(e));
      },

      editProduct(product) {
        this.$router.push({ name: 'edit', params: { existing: product } });
      },
    },
    mounted() {
      this.loadProducts();
    }
  };
</script>

<style>
    .card {
        margin-bottom: 15px;
    }

    .btn {
        margin-right: 15px;
    }
</style>
