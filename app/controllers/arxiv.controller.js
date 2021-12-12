var ArxivService = require('../services/arxiv.service');
var ArticleService = require('../services/article.service');

exports.syncAllData = async function (req, res) {
    
    try {
        const arxivArticles = await ArxivService.getArxivData();

        const createArticle = async (article) => {
            const createResult = await ArticleService.create(article).catch(err => {console.err('Article create error: ' + err)});
            return createResult;
        };

        const createArticles = async () => {
            return Promise.all(arxivArticles.map(article => createArticle(article)));
        };

        createArticles().then(data => {
            return res.status(200).json({ status: 200, message: "Succesfully Synced Arxiv data", data: data.sort((a, b) => (a.id > b.id) ? 1 : -1) });
        })
    } catch (e) {
        console.err('Sync arxiv data error: ' + e);
        return res.status(400).json({ status: 400, message: e.message });
    }
};