<template>
  <div class="home">
    <Navbar></Navbar>
      <Hero/>
      <Products/>
      <!-- <products-list></products-list> -->

      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/product.svg" alt="" width="100%" style="padding-bottom:5%">
          </div>
          <div class="col-md-6">
            <h3>Learn More About us</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
            </p>
             <button class="btn custom-btn btn-outline-primary">Browse Products</button>
          </div>
        </div>
      </div>
      <Login></Login>

      <!-- <mini-cart></mini-cart> -->

  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Products from "@/sections/Products.vue";
import Login from "@/components/Login.vue";
export default {
  name: "home",
  components: {
    Hero,
    Products,
    Login
  }
};
</script>

<style lang="scss">
.container {
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>