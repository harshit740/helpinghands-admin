<template>
  <crud-component v-if="this.form" :form="this.form"></crud-component>
</template>

<script>
import CrudComponent from "@/components/CrudComponenet";
import form from '../assets/crud.json';

export default {
  name: "CrudView",
  components: {CrudComponent: CrudComponent},
  props: [
    "FormName"
  ],
  created() {
    this.form = form[this.FormName]
  }
}
</script>

<style scoped>

</style>
