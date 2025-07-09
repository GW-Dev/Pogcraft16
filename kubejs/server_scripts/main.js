// Visit the wiki for more info - https://kubejs.com/
console.info('Hello, World! (Loaded server example script)')

ServerEvents.recipes(event => {
  // You can replace `event` with any name you like, as
  // long as you change it inside the callback too!

  // This part, inside the curly braces, is the callback.
  // You can modify as many recipes as you like in here,
  // without needing to use ServerEvents.recipes() again.

event.shapeless(
  Item.of('bellsandwhistles:metro_window', 6), // arg 1: output
  [
    '#c:glass_panes',
    'bellsandwhistles:metro_casing', 	       // arg 2: the array of inputs
  ]
).id("bellsandwhistles:metro_window")

event.custom({
  "type": "create:mixing",
  "heat_requirement": "heated",
  "ingredients": [{
      "item": "create:pulp"
    }],
  "results": [{
      "id": "supplementaries:ash"
    }]
})
  
})