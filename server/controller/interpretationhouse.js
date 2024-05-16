const InterpretationHouse = require('../models/interpretation').InterpretationHouse;

.findOne({ order: [['createdAt', 'DESC']] })
    .then(house => {
        if (!house) {
            console.error('House not found!');
            return;
        }

        let result1 = 0, result2 = 0, result3 = 0, result4 = 0, result5 = 0,
            result6 = 0, result7 = 0, result8 = 0, result9 = 0, result10 = 0;

        if (house.house_roof == 1) {
            result1 += 1;
        }
        if (house.house_roof == 0) {
            result5 += 1;
            result10 += 1;
        }
        if (house.house_wall == 1) {
            result1 += 1;
            result8 += 1;
        }
        if (house.house_wall == 0) {
            result3 += 1;
            result4 += 1;
            result9 += 1;
        }
        if (house.house_door == 1) {
            result2 += 1;
            result3 += 1;
            result4 += 1;
            result5 += 1;
            result9 += 1;
        }
        if (house.house_door == 0) {
            result1 += 1;
            result4 += 1;
            result10 += 1;
        }
        if (house.house_window == 1) {
            result2 += 1;
            result3 += 1;
            result6 += 1;
            result9 += 1;
        }
        if (house.house_window == 0) {
            result5 += 1;
            result10 += 1;
        }
        if (house.house_chimney == 1) {
            result1 += 1;
        }
        if (house.house_chimney == 0) {
            result4 += 1;
        }
        if (house.house_smoke == 1) {
            result5 += 1;
            result7 += 1;
            result9 += 1;
        }
        if (house.house_smoke == 0) {
            result8 += 1;
        }
        if (house.house_fence == 1) {
            result1 += 1;
            result5 += 1;
            result8 += 1;
            result10 += 1;
        }
        if (house.house_fence == 0) {
            result3 += 1;
            result4 += 1;
            result9 += 1;
        }
        if (house.house_road == 1) {
            result2 += 1;
            result3 += 1;
            result4 += 1;
            result9 += 1;
        }
        if (house.house_road == 0) {
            result10 += 1;
        }
        if (house.house_pond == 1) {
            result2 += 1;
            result8 += 1;
        }
        if (house.house_pond == 0) {
            result5 += 1;
        }
        if (house.house_mountain == 1) {
            result2 += 1;
            result4 += 1;
            result6 += 1;
        }
        if (house.house_mountain == 0) {
            result1 += 1;
        }
        if (house.house_tree == 1) {
            result1 += 1;
            result3 += 1;
            result4 += 1;
        }
        if (house.house_tree == 0) {
            result5 += 1;
            result10 += 1;
        }
        if (house.house_flower == 1) {
            result4 += 1;
            result6 += 1;
        }
        if (house.house_flower == 0) {
            result5 += 1;
            result7 += 1;
            result10 += 1;
        }
        if (house.house_grass == 1) {
            result1 += 1;
            result4 += 1;
            result6 += 1;
        }
        if (house.house_grass == 0) {
            result5 += 1;
            result7 += 1;
        }
        if (house.house_sun == 1) {
            result4 += 1;
            result6 += 1;
            result8 += 1;
        }
        if (house.house_sun == 0) {
            result7 += 1;
            result10 += 1;
        }
        if (house.house_size == 3) {
            result1 += 3;
        }
        if (house.house_loc == 1) {
            result6 += 3;
        }
        if (house.house_loc == 2) {
            result6 += 3;
        }
        if (house.house_loc == 3) {
            result1 += 3;
        }
        if (house.house_loc == 4) {
            result5 += 3;
        }
        if (house.house_loc == 5) {
            result5 += 3;
        }
        
        const topResults = [result1, result2, result3, result4, result5,
                            result6, result7, result8, result9, result10]
            .map((value, index) => ({value, index}))
            .sort((a, b) => b.value - a.value)
            .slice(0, 3);

            return Promise.all(topResults.map(result =>
                InterpretationHouse.findOne({
                    where: {analysis_house_id: result.index + 1}
                })
            ));
    })


