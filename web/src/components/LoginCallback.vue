<template>
    <div>
        <p>Redirecting...</p>
    </div>
</template>

<script>
  export default {
    name: "LoginCallback",
    mounted() {
      this.$root.handleAuthentication(this.$route.query.code, this.$route.query.state).then(({ state: state }) => {
        this.$router.push({ name: 'products' })
      })
    }
  }
</script>

<style scoped>

</style>
