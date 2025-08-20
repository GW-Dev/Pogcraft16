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
    let fd = (id) => `farmersdelight:${id}`

  // -- CRUSHING RECIPE UTILITY FUNCTION -- //
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

   // -- CUTTING RECIPE UTILITY FUNCTION -- //
    let cutting = (id, item_inputs, item_outputs, tool) => {
        let newRecipe = {
            type: fd('cutting'),
        }

        if (item_inputs)
            newRecipe['ingredients'] = item_inputs;
        if (item_outputs)
            newRecipe['result'] = item_outputs;
        if (tool)
            newRecipe['tool'] = tool;

        event.custom(newRecipe).id(id);
    }

    event.remove({ id: cr('crushing/amethyst_block') })
    
    event.remove({ id: cr('crushing/amethyst_cluster') })

    // -- FLAX TO STRING -- //
    crushing(
        kj('flax_to_string'),
        200,
        [ { count: 1, item: sp('flax') } ],
        [
            { count: 2, id: mc('string') },
            { count: 1, id: mc('string'), chance: 0.25 }
        ]
    );

        // -- PASTEL POWDERS -- //
    let gemRecipes = (gemName) => {
        const DATA = [
            { inputName: `${gemName}_shard`, outputAmount: 2 },
            { inputName: `${gemName}_block`, outputAmount: 4 },
            { inputName: `small_${gemName}_bud`, outputAmount: 4 },
            { inputName: `medium_${gemName}_bud`, outputAmount: 6 },
            { inputName: `large_${gemName}_bud`, outputAmount: 8 },
            { inputName: `${gemName}_cluster`, outputAmount: 16 }
        ];

        DATA.forEach(data => {
            let gemID = data.inputName.includes('amethyst') ? mc(data.inputName) : ps(data.inputName);
            crushing(
                kj(`${gemName}_powder_from_${data.inputName}`),
                200,
                [ { count: 1, item: gemID } ],
                [ { count: data.outputAmount, id: ps(`${gemName}_powder`) } ]
            );
        });
    }


         // -- PASTEL SHARD BLOCK CUTTING -- //
    let blockRecipes = (gemName) => {
        let gemID =  (`${gemName}`).includes('amethyst') ? mc(gemName) : ps(gemName).concat('_block');
        cutting(
            kj(`${gemName}_shard_cut`),
            [ {item: gemID } ],
            [ { item: {count: 4, id: ps(`${gemName}_shard`) } } ],
            [ { type: fd('item_ability'), action: 'pickaxe_dig' } ]
        );
    }

    const GEM_NAMES = [
        'amethyst',
        'citrine',
        'topaz',
        'moonstone',
        'onyx',
    ];

    GEM_NAMES.forEach(name => {
        gemRecipes(name);
        blockRecipes(name);
    });
    

// -- QUITOXIC POWDER -- //
    crushing(
        kj('quitoxic_powder'),
        200,
        [ { count: 1, item: ps('quitoxic_reeds') } ],
        [ { count: 2, id: ps('quitoxic_powder') } ]
    );

    // -- FIERY POWDER -- //
    crushing(
        kj('fiery_powder'),
        200,
        [ { count: 1, item: ps('blazing_crystal') } ],
        [ { count: 16, id: ps('fiery_powder') } ]
    );

    // -- BLIZZARD POWDER -- //
    crushing(
        kj('blizzard_powder'),
        200,
        [ { count: 1, item: ps('frostbite_crystal') } ],
        [ { count: 16, id: ps('blizzard_powder') } ]
    );

    // -- AMARANTH GRAINS -- //
    crushing(
        kj('amaranth_grains'),
        200,
        [ { count: 1, item: ps('amaranth_bushel') } ],
        [ { count: 2, id: ps('amaranth_grains') } ]
    );

// -- SPECTRUM RESOURCE BUDS AND CLUSTERS
    const PASTELS_ONE = [
        { in: "coal", out: mc("coal") },
        { in: "iron", out: cr("crushed_raw_iron") },
        { in: "gold", out: cr("crushed_raw_gold") },
        { in: "zinc", out: cr("crushed_raw_zinc") },
        { in: "diamond", out: mc("diamond") },
        { in: "emerald", out: mc("emerald") },
        { in: "redstone", out: mc("redstone") },
        { in: "lapis", out: mc("lapis_lazuli") },
        { in: "copper", out: cr("crushed_raw_copper") },
        { in: "quartz", out: mc("quartz") },
        { in: "netherite_scrap", out: mc("netherite_scrap") },
        { in: "echo", out: mc("echo_shard") },
        { in: "prismarine", out: mc("prismarine_crystals") }
    ];

    let recipeForPsBudsAndClusters = (inputOutputNames, numberOfOutput) => {
        inputOutputNames.forEach(data => {
            let outName = data.out.slice(data.out.indexOf(':') + 1, data.out.length);
            crushing(
                kj(`${outName}_from_small_${data.in}_bud`),
                200,
                [ { count: 1, item: ps(`small_${data.in}_bud`) } ],
                [ { count: numberOfOutput[0], id: data.out } ],
            );
            crushing(
                kj(`${outName}_from_large_${data.in}_bud`),
                200,
                [ { count: 1, item: ps(`large_${data.in}_bud`) } ],
                [ { count: numberOfOutput[1], id: data.out } ],
            );
            crushing(
                kj(`${outName}_from_${data.in}_cluster`),
                200,
                [ { count: 1, item: ps(`${data.in}_cluster`) } ],
                [ { count: numberOfOutput[2], id: data.out } ],
            );
        });
    };
    
    //output for [small bud, large bud, cluster]
    recipeForPsBudsAndClusters(PASTELS_ONE, [1,1,6]);
    recipeForPsBudsAndClusters([ {in: "bismuth", out: ps("bismuth_crystal") } ], [2,2,5]);
    recipeForPsBudsAndClusters([ {in: "glowstone", out: mc("glowstone_dust") } ], [1,1,12]);

})