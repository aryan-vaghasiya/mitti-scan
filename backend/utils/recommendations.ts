export function buildRecommendation(
    nutrient: string, 
    deficiency: number, 
    farmSize: number, 
    options: { name: string; type: string; price_per_bag: number }[]
) {
    const baseBagsPerHectare = deficiency / 10;
    let totalBags = Math.ceil(baseBagsPerHectare * farmSize);

    if (deficiency > 0 && totalBags === 0) {
        totalBags = 1;
    }

    return {
        nutrient,
        deficiency: deficiency + "%",
        suggestions: options.map((opt) => ({
            name: opt.name,
            type: opt.type,
            estimated_bags: totalBags,
            estimated_cost: totalBags * opt.price_per_bag
        }))
    };
}