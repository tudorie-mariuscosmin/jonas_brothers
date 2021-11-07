const express = require("express");
const axios = require("axios");
const connectDb = require("./db");
const cors = require('cors');
const app = express()
app.use(express.json())
app.use(cors());
connectDb()
const Subreddit = require('./Subreddit')
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const _ = require('lodash');

app.get('/api/recommendations', async (req, res) => {

    let results = [];

    try {
        const subsribed = await Subreddit.find()
        for (let element of subsribed) {
            try {
                const { data } = await axios.get(`http://localhost:5000/recommendations/${element.name}`)

                const { Subreddit, Distance } = data
                let result = Object.keys(Subreddit).map(key => {
                    return {
                        subreddit: Subreddit[key],
                        distance: Distance[key],
                        subPhoto: element.photo
                    }
                })

                result = result.sort((x, y) => x.distance - y.distance).slice(0, 2)
                results.push(...result)
            } catch (err) {
                console.log(err)
            }

        }
        let posts = []
        for (result of results) {
            try {
                const { data: { data: { children } } } = await axios.get(`https://www.reddit.com/r/${result.subreddit}/top.json?limit=3`)
                const subredditSubscribersNo = children[0].data.subreddit_subscribers;
                let post = children.map(child => {
                    const { data } = child

                    // average sentiment score ( ranges between -5 and 5) -> the bigger, the better
                    const sentimentScore = sentiment.analyze(data.title).score;
                    // for different opinions upvote ratio should be as close as possible to 0.5
                    const polarizationScore = data.upvote_ratio;
                    // polarization distance -- should be as small as possible
                    const polarizationDistance = Math.abs(0.5 - polarizationScore);
                    // engagement rate -> comments per post over number of subscribers -> the bigger, the better
                    const engagementRate = data.num_comments/subredditSubscribersNo;
                    
                    return {
                        subreddit: data.subreddit,
                        title: data.title,
                        photo: data.url_overridden_by_dest,
                        isRecommended: true,
                        subPhoto: result.subPhoto,
                        sentimentScore: sentimentScore,
                        polarizationDistance: polarizationDistance,
                        engagementRate: engagementRate,
                        author_fullname: data.author_fullname
                    }
                })
                posts.push(...post)

            } catch (err) {
                console.warn(err)
            }

        }

        const sortedData = _.orderBy(posts, ['sentimentScore', 'polarizationDistance', 'engagementRate'],
         ['desc', 'asc', 'desc']);
        res.json(sortedData)

    } catch (err) {
        console.log(err)
        res.status(404).json("not_found")
    }
})

app.get('/api/posts', async (req, res) => {
    try {
        const subsribed = await Subreddit.find()
        let posts = []
        for (sub of subsribed) {
            try {
                const { data: { data: { children } } } = await axios.get(`https://www.reddit.com/r/${sub.name}/top.json?limit=3`)
                let post = children.map(child => {
                    const { data } = child
                    return {
                        subreddit: data.subreddit,
                        title: data.title,
                        photo: data.url_overridden_by_dest || null,
                        isRecommended: false,
                        subPhoto: sub.photo,
                        author_fullname: data.author_fullname
                    }
                })
                posts.push(...post)

            } catch (err) {
                console.warn(err)
            }

        }
        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(404).json("not_found")
    }
})




app.get('/api/subreddits/all', async (req, res) => {
    try {

        const { data: { data: { children } } } = await axios.get("https://www.reddit.com/subreddits/popular.json?limit=10")
        const dbSubs = await Subreddit.find()
        console.log("db", dbSubs)
        const result = children.map(subred => {
            const { data } = subred
            return {
                name: data.display_name,
                photo: data.header_img,
                color: data.primary_color,
                isFollowed: dbSubs.some(sub => sub.name === data.display_name)
            }
        })
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

app.get('/api/subreddits/mine', async (req, res) => {
    try {
        const dbSubs = await Subreddit.find()
        res.send(dbSubs)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})

app.post('/api/subreddits', async (req, res) => {
    try {
        const { name, photo } = req.body
        const sub = new Subreddit({ name, photo })
        await sub.save()
        res.status(201).json({ message: "created" })

    } catch (error) {
        console.log(error)
        res.status(500).json(err)
    }
})

app.delete("/api/subreddits/:name", async (req, res) => {
    try {
        const { name } = req.params
        await Subreddit.deleteOne({ name })

        res.status(200).json({ message: "deleted" })

    } catch (error) {
        console.log(error)
        res.status(500).json(err)
    }
})



const PORT = 8080
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))

