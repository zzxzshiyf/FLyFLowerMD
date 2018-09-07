<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title class="body-3">Add New Scan</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout column>
          <v-flex lg12 sm12>
            <v-text-field label="Task Name" name="name" v-model="name" required :rules="nameRules">
            </v-text-field>
          </v-flex>
          <v-flex sm8 lg8>
            <v-textarea outline name="target" label="Target" placeholder="Separate By Semicolon" v-model="target" :rules="targetRules" required>
            </v-textarea>
          </v-flex>
          <v-flex sm8 lg8>
            <v-select :items="types" label="Scan Type" :rules="[v => !!v || 'Scan Type is required']" required=""></v-select>
          </v-flex> 
          <v-flex sm8 lg8>
            <v-text-field label="Description" name="description" v-model="description">
            </v-text-field>
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
    name: null,
    valid: true,
    description: null,
    target: null,
    types: ['Full', 'Web', 'Port', 'Domain'],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    targetRules: [
      v => !!v || 'Target is required'
    ]
  }),
  methods: {
    reset () {
      this.$refs.form.reset();
    },
    submit () {
      if (this.$refs.form.validate()) {
        window.getApp.$emit('SCAN_TASK_ADD_SUCCESS');
      }
    }
  }
};
</script>
