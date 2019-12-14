<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="body">
                <h3>Thank you!</h3>
                <p>Row: {{+data[0].split(' ')[0] + 1}}</p>
                <p>Place: {{+data[0].split(' ')[1] + 1}} </p>
                <p>Reservation code: {{data[1]}}</p>
              
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="butt butt_ticket" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        props: ['data'],
    }
</script>
