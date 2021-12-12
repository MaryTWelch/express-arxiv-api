const arxiv = require('arxiv-api');

exports.getArxivData = async function(){
    const papers = await arxiv.search({
        searchQueryParams: [
            {
              include: [{name: 'psychiatry',prefix: 'all'}]
            },
            {
              include: [{name: 'therapy',prefix: 'all'}]
            },
            {
              include: [{name: 'machine learning',prefix: 'all'}]
            },
            {
              include: [{name: 'data science',prefix: 'all'}]
            },
          ],
          start: 0,
          maxResults: 10,
    });

    return papers;
}


