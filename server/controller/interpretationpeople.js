const PeopleAnalyze = require('../models/peopleanalyze').PeopleAnalyze;
const PeopleDraw = require('../models/peopledraw').PeopleDraw;

PeopleDraw.findOne({ order: [['createdAt', 'DESC']] })
    .then(people => {
        if (!people) {
            console.error('People not found!');
            return;
        }

        let result1 = 0, result2 = 0, result3 = 0, result4 = 0,
            result5 = 0, result6 = 0, result7 = 0, result8 = 0;

        if (people.sex == 'M') {
            result1 += 3;
        }
        if (people.sex == 'F') {
            result2 += 3;
        }
        if (people.people_size == 1) {
            result4 += 3;
        }
        if (people.people_size == 2) {
            result2 += 3;
        }
        if (people.people_size == 3) {
            result1 += 3;
        }
        if (people.people_head == 0) {
            result4 += 1;
        }
        if (people.people_face == 0) {
            result5 += 1;
            result6 += 1;
        }
        if (people.people_eye == 0) {
            result5 += 1;
            result6 += 1;
        }
        if (people.people_nose == 0) {
            result6 += 1;
        }
        if (people.people_mouse == 0) {
            result5 += 1;
            result7 += 1;
            result8 += 1;
        }
        if (people.people_ear == 0) {
            result6 += 1;
        }
        if (people.people_hair == 0) {
            result6 += 1;
        }
        if (people.people_neck == 0) {
            result8 += 1;
        }
        if (people.people_body == 0) {
            result6 += 1;
        }
        if (people.people_arm == 0) {
            result3 += 1;
            result5 += 1;
            result6 += 1;
            result8 += 1;
        }
        if (people.people_hand == 0) {
            result5 += 1;
            result6 += 1;
        }
        if (people.people_leg == 0) {
            result8 += 1;
        }
        if (people.people_foot == 0) {
            result6 += 1;
            result7 += 1;
        }
        if (people.people_button == 1) {
            result4 += 1;
            result7 += 1;
        }
        if (people.people_pocket == 1) {
            result7 += 1;
        }
        if (people.people_runshoes == 1) {
            result3 += 1;
        }
        if (people.people_shoes == 1) {
            result1 += 1;
            result3 += 1;
        }
        
        const topResults = [result1, result2, result3, result4,
                            result5, result6, result7, result8]
            .map((value, index) => ({value, index}))
            .sort((a, b) => b.value - a.value)
            .slice(0, 3);

            return Promise.all(topResults.map(result =>
                PeopleAnalyze.findOne({
                    where: {analysis_people_id: result.index + 1}
                })
            ));
    })


