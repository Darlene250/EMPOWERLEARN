const express = require('express');
const router = express.Router();
const axios = require('axios');

const YT_KEY = process.env.YOUTUBE_API_KEY;
const YT_BASE = 'https://www.googleapis.com/youtube/v3';

// Search videos by keyword
router.get('/search', async (req, res) => {
  const { q = 'education for women', max = 12 } = req.query;
  try {
    const { data } = await axios.get(`${YT_BASE}/search`, {
      params: {
        key: YT_KEY,
        q,
        part: 'snippet',
        type: 'video',
        maxResults: max,
        relevanceLanguage: 'en',
        safeSearch: 'strict',
      }
    });

    const videoIds = data.items.map(i => i.id.videoId).join(',');

    // Get duration and view count
    const { data: details } = await axios.get(`${YT_BASE}/videos`, {
      params: { key: YT_KEY, id: videoIds, part: 'contentDetails,statistics' }
    });

    const detailMap = {};
    details.items.forEach(v => { detailMap[v.id] = v; });

    const results = data.items.map(item => {
      const id = item.id.videoId;
      const detail = detailMap[id] || {};
      return {
        id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium?.url,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        duration: detail.contentDetails?.duration || '',
        viewCount: detail.statistics?.viewCount || '0',
      };
    });

    res.json({ results });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'YouTube API error' });
  }
});

// Get related videos for course viewer sidebar
router.get('/related', async (req, res) => {
  const { videoId } = req.query;
  try {
    const { data } = await axios.get(`${YT_BASE}/search`, {
      params: {
        key: YT_KEY,
        relatedToVideoId: videoId,
        part: 'snippet',
        type: 'video',
        maxResults: 8,
      }
    });
    const results = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.default?.url,
    }));
    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: 'YouTube API error' });
  }
});

module.exports = router;
