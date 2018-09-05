<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>           
        <v-flex lg6>
          <event-form></event-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import EventForm from '@/components/widgets/form/EventForm';
import ContactForm from '@/components/widgets/form/ContactForm';
import PaymentForm from '@/components/widgets/form/PaymentForm';
import ShipmentForm from '@/components/widgets/form/ShipmentForm';
export default {
  components: {
    VWidget,
    ContactForm,
    PaymentForm,
    ShipmentForm,
    EventForm
  },
  data () {
    return {
    };
  },
  computed: {
  },  
  methods: {
  }
};
</script>