<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Task List</h3>
        </v-flex>        
        <v-flex lg12>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout column>
                    <v-flex sm8 lg8>
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-flex>
                    <v-textarea
                      label="Target"
                      v-model="editedItem.target"
                    ></v-textarea>
                    <v-flex sm8 lg8>
                      <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
                    </v-flex>
                    <v-flex sm8 lg8>
                      <v-text-field v-model="editedItem.date" label="Date"></v-text-field>
                    </v-flex>
                    <v-flex sm8 lg8>
                      <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Type something to search"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>     
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>         
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                v-model="complex.selected"
                >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.target }}</td>
                  <td>{{ props.item.type }}</td>
                  <td>{{ props.item.date }}</td>
                  <td>{{ props.item.status }}</td>
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="editItem(props.item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small @click="deleteItem(props.item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>            
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { Items as Users } from '@/api/user';
export default {
  data () {
    return {
      search: '',
      dialog: false,
      editedIndex: -1,
      formTitle: 'Edit Scan Item',
      editedItem: {
        name: '',
        target: '',
        type: '',
        date: '',
        status: ''
      },
      defaultItem: {
        name: '',
        target: '',
        type: '',
        date: '',
        status: ''
      },
      complex: {
        selected: [],
        headers: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Target',
            value: 'target'
          },
          {
            text: 'Type',
            value: 'type'
          },
          {
            text: 'Date',
            value: 'date'
          },
          {
            text: 'Status',
            value: 'status'
          },
          {
            text: 'Manage',
            value: ''
          },
        ],
        items: Users
      }
    };
  },
  watch: {
    dialog (val) {
      val || this.close();
    }
  },
  methods: {
    editItem (item) {
      console.log(item);
      this.editedIndex = this.complex.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem (item) {
      const index = this.complex.items.indexOf(item);
      confirm('Are you sure you want to delete this task?') && this.complex.items.splice(index, 1);
    },

    close () {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
  }
};
</script>
