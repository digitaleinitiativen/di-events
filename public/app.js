var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

function parseEvents(response) {
  const groupedByDay = response.events.reduce(function (r, a) {
    r[a.local_date] = r[a.local_date] || [];
    r[a.local_date].push(a);
    return r;
  }, Object.create(null));

  data = {days: groupedByDay}
  console.log(data)
  var app = new Vue({
    el: '#app',
    data: data
  })
  console.log(response);
}

getJSON("/events", parseEvents)


Vue.component('currency-input', {
  template: '\
      <span>\
        $\
        <input\
          ref="input"\
          v-bind:value="value"\
          v-on:input="updateValue($event.target.value)">\
      </span>\
    ',
  props: ['value'],
  methods: {
    // Instead of updating the value directly, this
    // method is used to format and place constraints
    // on the input's value
    updateValue: function (value) {
      var formattedValue = value
        // Remove whitespace on either side
        .trim()
        // Shorten to 2 decimal places
        .slice(
          0,
          value.indexOf('.') === -1 ?
          value.length :
          value.indexOf('.') + 3
        )
      // If the value was not already normalized,
      // manually override it to conform
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // Emit the number value through the input event
      this.$emit('input', Number(formattedValue))
    }
  }
})