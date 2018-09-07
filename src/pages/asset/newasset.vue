<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title class="body-3">Add New Asset</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout column>
          <v-flex lg12 sm12>
            <v-text-field label="Asset Name" name="name" v-model="name" required :rules="nameRules">
            </v-text-field>
          </v-flex>
          <v-flex sm8 lg8>
            <v-textarea outline name="host" label="Host" placeholder="Examples:<br/>192.168.1.1<br/>www.shiyf.cn" v-model="host" :rules="hostRules" required>
            </v-textarea>
          </v-flex>
          <v-flex sm8 lg8>
            <v-select :items="dept" label="Dept Name" :rules="[v => !!v || 'Dept Name is required']" required=""></v-select>
          </v-flex> 
          <v-flex sm8 lg8>
            <v-text-field label="Admin Name" name="adminName" v-model="adminName">
            </v-text-field>
          </v-flex>       
          <v-flex sm8 lg8>
            <v-switch sm8 lg8
                label="Discover Option"
                v-model="discover"
            ></v-switch>
          </v-flex>                       
          <v-spacer></v-spacer>
        </v-layout>        
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-3">
      <v-spacer></v-spacer>
      <v-btn color="grey" @click="reset">Reset</v-btn>
      <v-btn color="primary" @click="submit">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    discover: true,
    name: null,
    valid: true,
    adminName: null,
    host: null,
    dept: ['Sec Center', 'Ops Center', 'IT Center', 'Administration department'],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    hostRules: [
      v => !!v || 'Host is required'
    ]
  }),
  methods: {
    reset () {
      this.$refs.form.reset();
    },
    submit () {
      if (this.$refs.form.validate()) {
        window.getApp.$emit('NEW_ASSET_ADD_SUCCESS');
      }
    }
  }
};
</script>
