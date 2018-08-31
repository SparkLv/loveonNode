const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');


function timer() {
    schedule.scheduleJob('24 24 */4 * * *', function () {
        const items = [];
        let count = 0;

        function addObj(obj) {
            items.push(obj);
            count++;
            if (count == 10) {
                items.sort(function (s1, s2) {
                    return s1.index - s2.index
                })
                fs.writeFile(path.join(__dirname, '../data/movie.json'), JSON.stringify(items), function () {

                })
            }
        }

        axios.get('https://movie.douban.com/').then((data) => {
            const $ = cheerio.load(data.data);
            $('#screening .screening-bd .ui-slide-content .ui-slide-item').each((index, item) => {
                if (index == 10) {
                    return false
                }
                const obj = {
                    index,
                    title: $(item).attr('data-title'),
                    rate: $(item).attr('data-rate'),
                    duration: $(item).attr('data-duration'),
                    actors: $(item).attr('data-actors'),
                    ticket: $(item).attr('data-ticket'),
                    trailer: $(item).attr('data-trailer'),
                    region: $(item).attr('data-region'),
                    imgUrl: $(item).find('img').eq(0).attr('src'),
                    douLink: $(item).find('a').eq(0).attr('href')
                }
                setTimeout(() => {
                    axios.get(obj.trailer).then((data) => {
                        const $2 = cheerio.load(data.data);
                        const prVideo = $2('.pr-video').eq(0).attr('href');
                        setTimeout(() => {
                            axios.get(prVideo).then((data) => {
                                const $3 = cheerio.load(data.data);
                                const videoUrl = $3('.video-js.vjs-douban').eq(0).find('source').eq(0).attr('src');
                                obj.video = videoUrl;
                                setTimeout(() => {
                                    axios.get(obj.douLink).then((data) => {
                                        const $4 = cheerio.load(data.data);
                                        obj.detail = $4('#link-report').find('span').eq(0).text();
                                        addObj(obj)
                                    })
                                }, index * 10000)
                            })
                        }, index * 10000)
                    })
                }, index * 10000)
            });
        })
    })
}

module.exports = timer;