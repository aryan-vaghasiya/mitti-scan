function buildRecommendation(nutrient:string, deficiency:number, options: { name: string; type: string; price_per_bag: number }[]) {
    let bags = Math.ceil(deficiency / 10);

    return {
        nutrient,
        deficiency: deficiency + "%",
        suggestions: options.map((opt: { name: string; type: string; price_per_bag: number }) => ({
            name: opt.name,
            type: opt.type,
            estimated_bags: bags,
            estimated_cost: bags * opt.price_per_bag
        }))
    };
}

export { buildRecommendation }