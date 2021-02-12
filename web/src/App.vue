<template>
    <div id="app">
        <nav class="navbar navbar-expand">
            <div class="navbar-nav mr-auto">
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link to="/login_oauth" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link to="/products" class="nav-link">Products</router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link to="/add" class="nav-link">Add New Product</router-link>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <a href="#" @click="logout()" class="nav-link">Logout</a>
                </li>
            </div>
        </nav>

        <div class="container mt-3">
            <router-view/>
        </div>
    </div>
</template>

<script>
  export default {
    name: "application",
    computed: {
      isLoggedIn() {
        return this.$root.isAuthenticated()
      }
    },
    methods: {
      logout() {
        return this.$root.logout();
      }
    }
  };
</script>
