<template>
  <v-data-table
      :fixed-header="true"
      :headers="this.form.headers"
      :items="model[this.form.Name]['data']"
      class="elevation-2"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ form.Name }}</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              New {{ form.Name }}
            </v-btn>
          </template>
          <v-card :loading="isLoading">
            <v-card-title class="error--text" v-if="isErrored">{{ massage }}</v-card-title>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      v-for="(item,key) in form['newForm']" v-bind:key="key">
                    <v-select
                        v-if="item.hasOwnProperty('type') && item['type'] === 'select' && item.hasOwnProperty('defaultValues')"
                        :items="form['newForm'][key]['defaultValues']"
                        v-model="editedItem[key]">
                    </v-select>
                    <v-select
                        v-else-if="item.hasOwnProperty('type') && item['type'] === 'select' && item.hasOwnProperty('getDefaultValuesPreName')"
                        :items="getDefaultValues(form['newForm'][key]['getDefaultValuesPreName'])"
                        :item-text="form['newForm'][key]['preNestedName']"
                        item-value="_id"
                        v-model="editedItem[key]"
                        :disabled="item.hasOwnProperty('disabledOnUpdate') && item['disabledOnUpdate'] && (editedIndex > -1)"
                    >

                    </v-select>
                    <v-text-field
                        v-else-if="item.hasOwnProperty('type') && item['type'] === 'text' || item['type'] === 'email'"
                        v-model="editedItem[key]"
                        :label="key.toString().toLocaleUpperCase()"
                        :type="item['type']"
                        :disabled="item.hasOwnProperty('disabledOnUpdate') && item['disabledOnUpdate'] && (editedIndex > -1)"
                    ></v-text-field>
                    <v-text-field
                        v-else
                        v-model="editedItem[key]"
                        :label="key.toString().toLocaleUpperCase()"
                        :type="item"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card :loading="isLoading">
            <v-card-title v-if="isErrored">{{ massage }}</v-card-title>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import {mapState} from "vuex";

export default {
  props: ["form"],
  data: () => ({
    massage: "",
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    isLoading: false,
    isErrored: false
  }),

  computed: {
    ...mapState([
      "model"
    ]),
    formTitle() {
      return this.editedIndex === -1 ? 'New ' + this.form.Name : 'Edit ' + this.form.Name
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    console.log("Mounted")
    this.editedItem = this.form.editedItem
    this.defaultItem = this.form.editedIndex
    this.$store.dispatch("getData", {"api": this.form.getApi, "key": this.form.Name})
    console.log(this.form['prerequisites'])
    if (this.form['prerequisites']['required'] === true) {
      for (let key in this.form['prerequisites']) {
        if (key !== "required") {
          this.$axios.post(this.$host + this.form['prerequisites'][key]).then(data => {
            this.$store.commit("setPrerequisites", {Name: this.form['Name'], key, data: data['data']})
          })
        }
      }
    }
  },
  methods: {
    getDefaultValues(host) {
      if (this.model && this.model[this.form.Name]['data']) {
        return this.model[this.form.Name]['prerequisites'][host]
      } else {
        return ['test']
      }
    },
    editItem(item) {
      console.log("Edit Item")
      console.log(item)
      this.editedIndex = this.model[this.form.Name]['data'].indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.model[this.form.Name]['data'].indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      console.log(this.model[this.form.Name]['data'][this.editedIndex])
      let response = (await this.$axios.post(this.$host + this.form['deleteApi'], this.model[this.form.Name]['data'][this.editedIndex])).data
      console.log(response)
      if (response['code'] === 200) {
        this.isErrored = false
        this.isLoading = false
        this.closeDelete()
        this.model[this.form.Name]['data'].splice(this.editedIndex, 1)
      }
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
    ,

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
    ,
    async save() {
      let response = {}
      if (this.editedIndex > -1) {
        this.isLoading = true
        response = (await this.$axios.post(this.$host + this.form['updateApi'], this.editedItem)).data
      } else {
        this.isLoading = true
        response = (await this.$axios.post(this.$host + this.form['createApi'], this.editedItem)).data
      }
      console.log(response)
      if (response['code'] === 200) {
        this.isErrored = false
        this.isLoading = false
        if (response['data'] && '_id' in response['data']) {
          this.editedItem['_id'] = response['data']['_id']
        }
        if ('password' in this.editedItem) {
          delete this.editedItem['password']
        }
        if (!(this.editedIndex > -1)) {
          this.model[this.form.Name]['data'].push(this.editedItem)
        } else if (this.editedIndex > -1) {
          Object.assign(this.model[this.form.Name]['data'][this.editedIndex], this.editedItem)
        }
        this.$store.commit('setModel', {data: this.model[this.form.Name]['data'], key: this.form.Name})
        this.close()
      } else {
        this.isErrored = true
        this.isLoading = false
        this.massage = response['Status']
      }
    }
    ,
  }
  ,
}
</script>

<style scoped>

</style>