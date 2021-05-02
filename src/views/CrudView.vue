<template>
  <crud-componenet v-if="this.form" :form="this.form"></crud-componenet>
</template>

<script>
import CrudComponent from "@/components/CrudComponenet";
import form from '../assets/crud.json';

export default {
  name: "CrudView",
  components: {CrudComponenet: CrudComponent},
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