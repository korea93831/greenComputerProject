const TreeAnalyze = require('../models/treeanalyze').TreeAnalyze;
const TreeDraw = require('../models/treedraw').TreeDraw;

const getTreeAnalysis = (req, res) => {
    TreeDraw.findOne({ order: [['createdAt', 'DESC']] })
        .then(tree => {
            if (!tree) {
                console.error('Tree not found!');
                return;
            }

            let result1 = 0, result2 = 0, result3 = 0, result4 = 0, result5 = 0,
                result6 = 0, result7 = 0, result8 = 0, result9 = 0, result10 = 0;

            if (tree.tree_pillar == 1) {
                result1 += 1;
                result2 += 1;
            }
            if (tree.tree_pillar == 0) {
                result3 += 1;
                result6 += 1;
            }
            if (tree.tree_crown == 1) {
                result1 += 1;
                result2 += 1;
                result5 += 1;
            }
            if (tree.tree_crown == 0) {
                result3 += 1;
                result6 += 1;
                result10 += 1;
            }
            if (tree.tree_branch == 1) {
                result1 += 1;
                result5 += 1;
            }
            if (tree.tree_branch == 0) {
                result6 += 1;
                result10 += 1;
            }
            if (tree.tree_root == 1) {
                result2 += 1;
                result5 += 1;
            }
            if (tree.tree_root == 0) {
                result3 += 1;
                result6 += 1;
                result10 += 1;
            }
            if (tree.tree_leaf == 1) {
                result1 += 1;
                result5 += 1;
                result7 += 1;
                result8 += 1;
            }
            if (tree.tree_leaf == 0) {
                result9 += 1;
                result10 += 1;
            }
            if (tree.tree_flower == 1) {
                result1 += 1;
                result4 += 1;
                result5 += 1;
            }
            if (tree.tree_flower == 0) {
                result6 += 1;
                result9 += 1;
                result10 += 1;
            }
            if (tree.tree_fruit == 1) {
                result1 += 1;
                result4 += 1;
            }
            if (tree.tree_fruit == 0) {
                result3 += 1;
                result6 += 1;
                result9 += 1;
            }
            if (tree.tree_swing == 1) {
                result1 += 1;
                result5 += 1;
                result8 += 1;
            }
            if (tree.tree_bird == 1) {
                result1 += 1;
                result4 += 1;
                result7 += 1;
                result8 += 1;
            }
            if (tree.tree_squirrel == 1) {
                result5 += 1;
                result8 += 1;
            }
            if (tree.tree_cloud == 1) {
                result1 += 1;
                result3 += 1;
                result7 += 1;
            }
            if (tree.tree_moon == 1) {
                result1 += 1;
                result4 += 1;
            }
            if (tree.tree_star == 1) {
                result1 += 1;
                result4 += 1;
            }
            if (tree.tree_size == 1) {
                result3 += 3;
                result6 += 3;
            }
            if (tree.tree_size == 2) {
                result4 += 3;
            }
            if (tree.tree_size == 3) {
                result1 += 3;
                result5 += 3;
            }
            if (tree.tree_loc == 1) {
                result3 += 3;
            }
            if (tree.tree_loc == 2) {
                result4 += 3;
            }
            if (tree.tree_loc == 3) {
                result2 += 3;
            }
            if (tree.tree_loc == 4) {
                result3 += 3;
            }
            if (tree.tree_loc == 5) {
                result9 += 3;
            }

            const topResults = [result1, result2, result3, result4, result5, 
                                result6, result7, result8, result9, result10]
                .map((value, index) => ({value, index}))
                .sort((a, b) => b.value - a.value)
                .slice(0, 3);
            
                return Promise.all(topResults.map(result =>
                    TreeAnalyze.findOne({
                        where: {analysis_tree_id: result.index + 1}
                    })
                ));
        })
        .then(topInterpretations => {
            if (!topInterpretations || topInterpretations.length === 0) {
                console.error('No top interpretations found');
                return res.status(404).json({error: 'No interpretations found'});
            }

            const response = topInterpretations.map(interpretation => ({
                keyword: interpretation.keyword,
                analysis: interpretation.analysis_tree
            }));

            res.json(response);
        })
        .catch(err => {
            console.error('Error fetching tree interpretations:', err);
            res.status(500).json({error: 'Internal server error'});
        });
};

module.exports = { getTreeAnalysis };