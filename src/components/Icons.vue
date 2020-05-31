<template lang="pug">
  .icons
    svg(v-if="name === 'checkbox'" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-298 390 14 14")
      path(d="M-298,390v14h14v-14H-298z M-292.5,400l-2.9-2.6l0.9-0.8l2,1.8l4.9-4.4l0.9,0.8L-292.5,400z")
</template>

<script>
    export default {
        name: 'Icons',
        props: {
          name: String
        },
        data () {
            return {
                message: 'Слава Одину, Icons работает!'
            }
        }
    }
</script>

<style scoped lang="sass"></style>
