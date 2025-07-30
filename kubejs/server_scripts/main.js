// Visit the wiki for more info - https://kubejs.com/
console.info('Hello, World! (Loaded server example script)')

ServerEvents.recipes(event => {
  // You can replace `event` with any name you like, as
  // long as you change it inside the callback too!

  // This part, inside the curly braces, is the callback.
  // You can modify as many recipes as you like in here,
  // without needing to use ServerEvents.recipes() again.

  let ps = (id) => `pastel:${id}`
  let cr = (id) => `create:${id}`
  let mc = (id) => `minecraft:${id}`
  let sp = (id) => `supplementaries:${id}`

 // -- CUSTOM RECIPE UTILITY FUNCTION -- //
    let mixing = (id, heat_requirement, item_inputs, item_outputs) => {
        let newRecipe = {
            type: cr('mixing'),
            heat_requirement: heat_requirement,
        }

        if (item_inputs)
            newRecipe['ingredients'] = item_inputs;
        if (item_outputs)
            newRecipe['results'] = item_outputs;

        event.custom(newRecipe).id(id);
    }

event.shapeless(
  Item.of('bellsandwhistles:metro_window', 6), // arg 1: output
  [
    '#c:glass_panes',
    'bellsandwhistles:metro_casing', 	       // arg 2: the array of inputs
  ]
).id("bellsandwhistles:metro_window")

mixing(
  sp("ash_from_pulp"),
  'heated',
  [{item: cr('pulp')}],
  [{id: sp('ash')}]
)
  
})