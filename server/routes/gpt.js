const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;

  const prompt = `
以下の文章は、ある人が「今日やるべきこと」を自由に話した内容です。
文章を読み取り、実行可能なToDoリストに分解してください。
タスクごとに優先度（高・中・低）もつけてください。

出力形式は以下のようにJSONでお願いします：

[
  {"task": "○○をする", "priority": "高"},
  ...
]

文章:
${text}
`;

  try {
    const result = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const content = result.data.choices[0].message.content;
    console.log('GPT returned content:', result.data.choices[0].message.content);
    const parsed = JSON.parse(content);
    res.json(parsed);
  } catch (error) {
    console.error('GPT API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'GPT API error' });
  }
});

module.exports = router;
