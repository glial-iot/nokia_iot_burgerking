<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout column>
      <v-flex class="logo-container" d-flex md5 justify-center align-center>
        <img class="logo_main logo_bk_main" src="../assets/logo_burgerking.svg" alt="BurgerKing Logo">
        <img class="logo_main logo_nokia_main" src="../assets/nokia_blue.svg" alt="Nokia Logo">
      </v-flex>
      <v-flex class="buttons-container" d-flex md7 justify-center align-top>
        <div class="text-xs-center main-page-button">
          <v-btn @click="$router.push('/sites-management')" large round color="primary" dark>
            {{$t("message.network_manager_interface")}}
          </v-btn>
        </div>
        <div class="text-xs-center main-page-button">
          <v-btn @click="$router.push('/restaurant-management/bk_anino_mkad')" large round color="primary" dark>
            {{$t("message.restaurant_manager_interface")}}
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "index"
  }
</script>