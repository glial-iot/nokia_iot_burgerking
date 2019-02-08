<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout column>
      <v-flex d-flex md1 class="pt-2">
        <h2 class="text-md-center">{{$t('message.possible_economy_calculation')}}</h2>
      </v-flex>
      <v-flex d-flex md10>
        <v-layout row>
          <v-flex d-flex md6>
            <v-card class="pa-2">
            <v-layout column justify-space-around class="fill-height">
              <v-flex d-flex md1>
                <h4 class="text-md-center">{{$t('message.redistribution_raschet')}}</h4>
              </v-flex>
              <v-flex d-flex md2>
                <v-card :color="'green lighten-3'" class="pa-1">
                <v-layout column>
                  <v-flex md4 class="economy_heading">
                    {{$t('message.current_power_in_raschet_avg_30d')}}
                  </v-flex>
                  <v-flex md8 class="economy_value">
                    <span class="economy_digit">500</span> {{$t('message.kilowatt')}}
                  </v-flex>
                </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex md2>
                <v-card :color="'green lighten-3'" class="pa-1">
                <v-layout column>
                  <v-flex md4 class="economy_heading">
                    {{$t('message.non-switchable_power_raschet_avg_30d')}}
                  </v-flex>
                  <v-flex md8 class="economy_value">
                    <span class="economy_digit">230</span> {{$t('message.kilowatt')}}
                  </v-flex>
                </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex md2>
                <v-card :color="'green lighten-3'" class="pa-1">
                <v-layout column>
                  <v-flex md4 class="economy_heading">
                    {{$t('message.switchable_power_raschet_avg_30d')}}
                  </v-flex>
                  <v-flex md8 class="economy_value">
                    <span class="economy_digit">270</span> {{$t('message.kilowatt')}}
                  </v-flex>
                </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex md2>
                <v-card :color="'green lighten-3'" class="pa-1">
                <v-layout column>
                  <v-flex md4 class="economy_heading">
                    {{$t('message.possible_economy_30d')}}
                  </v-flex>
                  <v-flex md8 class="economy_value">
                    <span class="economy_digit">80 400</span> {{$t('message.roubles_short')}}
                  </v-flex>
                </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
            </v-card>
          </v-flex>
          <v-flex d-flex md6>
            <v-card class="pa-2">
            <v-layout column column justify-space-around class="fill-height">
              <v-flex d-flex md1>
                <h4 class="text-md-center">{{$t('message.switchoff_clients_non_working_hrs')}}</h4>
              </v-flex>
              <v-flex d-flex md2>
                <v-card :color="'green lighten-3'" class="pa-1">
                <v-layout column>
                  <v-flex md4 class="economy_heading">
                    {{$t('message.current_power_not_working_hrs_avg_30d')}}
                  </v-flex>
                  <v-flex  md8 class="economy_value">
                    <span class="economy_digit">200</span> {{$t('message.kilowatt')}}
                  </v-flex>
                </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex md2>
                <v-card :color="'green lighten-3'" class="pa-1">
                <v-layout column>
                  <v-flex md4 class="economy_heading">
                    {{$t('message.non-switchable_power_non_working_hrs')}}
                  </v-flex>
                  <v-flex  md8 class="economy_value">
                    <span class="economy_digit">100</span> {{$t('message.kilowatt')}}
                  </v-flex>
                </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex md2>
                <v-card :color="'green lighten-3'" class="pa-1">
                <v-layout column>
                  <v-flex md4 class="economy_heading">
                    {{$t('message.switchable_power_non_working_hrs_avg_30d')}}
                  </v-flex>
                  <v-flex md8 class="economy_value">
                    <span class="economy_digit">100</span> {{$t('message.kilowatt')}}
                  </v-flex>
                </v-layout>
                </v-card>
              </v-flex>
              <v-flex d-flex md2>
                <v-card :color="'green lighten-3'" class="pa-1">
                <v-layout column>
                  <v-flex md4 class="economy_heading">
                    {{$t('message.possible_economy_30d')}}
                  </v-flex>
                  <v-flex md8 class="economy_value">
                    <span class="economy_digit">30 800</span> {{$t('message.roubles_short')}}
                  </v-flex>
                </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md1 class="footer-internal">
        <div class="caption text-center align-self-center relative_block">
          2018-2019 © Nokia IoT Laboratory, Moscow.   Powered by Nokia Glial™ and IMPACT™.   Version: {{frontend_version}}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from "vue";
  import Axios from "axios";
  import VueAxios from "vue-axios";
  import Vue_i18n from "vue-i18n";

  Vue.use(VueAxios, Axios, Vue_i18n);


  export default {
    components: {
    },
    data: () => ({
      frontend_version: VERSION,
    }),
    methods: {},
    mounted: function () {
    },
    computed: {
    }
  };
</script>
