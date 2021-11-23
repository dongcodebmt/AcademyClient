import Vue from "vue"

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    methods: {
      secToMin(seconds) {
        let format = val => `0${Math.floor(val)}`.slice(-2);
        let hours = seconds / 3600;
        let minutes = (seconds % 3600) / 60;
      
        return [hours, minutes, seconds % 60].map(format).join(':');
      },
    }
  })
}