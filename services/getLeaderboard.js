require('dotenv').config({ path: '../.env' });

async function getLeaderboard() {

    const response = await fetch("https://api-v1.zealy.io/communities/kestcommunity/leaderboard?page=0&limit=10", {
        method: "GET",
        headers: {
            "X-Api-Key": process.env.ZEALY_API_KEY,
            "contentType": "application/json",
        }
    })

    const data = await response.json();
    return data;
}

module.exports = { getLeaderboard};