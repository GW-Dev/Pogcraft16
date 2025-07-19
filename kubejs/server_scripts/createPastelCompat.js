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
    let kj = (id) => `kubejs:${id}`

  // -- CUSTOM RECIPE UTILITY FUNCTION -- //
    let crushing = (id, duration, item_inputs, item_outputs) => {
        let newRecipe = {
            type: cr('crushing'),
            processingTime: duration
        }

        if (item_inputs)
            newRecipe['ingredients'] = item_inputs;
        if (item_outputs)
            newRecipe['results'] = item_outputs;

        event.custom(newRecipe).id(id);
    }


    // -- FLAX TO STRING -- //
    crushing(
        kj('flax_to_string'),
        200,
        [ { count: 1, item: 'supplementaries:flax' } ],
        [
            { count: 2, id: 'minecraft:string' },
            { count: 1, id: 'minecraft:string', chance: 0.25 }
        ]
    );

    
})