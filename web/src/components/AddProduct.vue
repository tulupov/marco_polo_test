<template>
    <form>
        <div class="submit-form">
            <div class="form-group">
                <label for="title">Title</label>
                <input
                        type="text"
                        class="form-control"
                        id="title"
                        required
                        maxlength="100"
                        v-model="product.title"
                        name="title"
                />
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                        rows="3"
                        class="form-control"
                        id="description"
                        required
                        maxlength="200"
                        v-model="product.description"
                        name="description"
                ></textarea>
            </div>

            <div class="form-group">
                <label for="image">Description</label>
                <input
                        name="image"
                        id="image"
                        disabled
                        class="form-control"
                        v-model="product.imageUrl"
                >
            </div>

            <button type="submit" @click.prevent="saveProduct" class="btn btn-success">Submit</button>
        </div>
    </form>
</template>

<script>
  import ProductService from "../services/ProductService";

  export default {
    name: "add-product",
    props: ['existing'],
    mounted() {
      console.log(this.editProduct);
    },
    data() {
      return {
        product: this.existing ? this.existing : {
          id: null,
          title: "",
          description: "",
          imageUrl: "https://picsum.photos/200",
        },
      };
    },
    methods: {
      saveProduct() {
        let promise = null;
        if (this.product.id) {
          promise = ProductService.update(
            this.product.id,
            { title: this.product.title, description: this.product.description, imageUrl: this.product.imageUrl }
          );
        } else {
          promise = ProductService.create(this.product);
        }
        promise
          .then(() => {
            this.$router.push('products');
          })
          .catch(e => {
            console.log(e);
          });
      },
    }
  };
</script>

<style>
    .submit-form {
        max-width: 400px;
    }
</style>
