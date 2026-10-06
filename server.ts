import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// API endpoint for ECO AI Chemistry Tutor
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!apiKey) {
      return res.json({
        reply: "Xin chào! Mình là ECO AI, gia sư Hóa học của bạn. Hiện tại khóa API Key chưa được cấu hình, nhưng mình luôn sẵn sàng giải đáp các câu hỏi về pH, chất chỉ thị, và thí nghiệm STEM cho học sinh THCS! Hãy thử hỏi về quỳ tím, phenolphthalein hoặc thang pH nhé."
      });
    }

    const systemInstruction = `Bạn là ECO AI - một trợ lý gia sư Hóa học thân thiện, thông thái và tận tâm dành cho học sinh THCS, giáo viên và hoạt động STEM.
Nhiệm vụ của bạn là giải thích các khái niệm về acid, base, chất chỉ thị, thang pH từ 0-14, cách sử dụng giấy quỳ tím, phenolphthalein, methyl orange, và các chất chỉ thị tự nhiên (bắp cải tím, hoa đậu biếc...).
Quy tắc phản hồi:
- Sử dụng tiếng Việt chuẩn mực, rõ ràng, dễ hiểu đối với học sinh từ lớp 6 đến lớp 9.
- Sử dụng danh pháp IUPAC kết hợp tên thông dụng trong ngoặc khi cần (ví dụ: ethanoic acid (axit axetic), hydrochloric acid...).
- Luôn giữ thái độ khích lệ, trực quan, có ví dụ thực tế trong đời sống (nước chanh, nước xà phòng, giấm, baking soda...).
- Không trả lời quá dài dòng trừ khi học sinh yêu cầu giải thích chi tiết thí nghiệm.`;

    // Format chat history if any
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Xin lỗi, mình chưa thể đưa ra câu trả lời lúc này. Bạn hãy thử hỏi lại nhé!";
    res.json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate AI response', 
      details: error.message || String(error),
      reply: "ECO AI đang bận một chút. Bạn có thể kiểm tra lại câu hỏi hoặc thử lại sau nhé!"
    });
  }
});

// Vite integration in development
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`ECO pH server running on port ${PORT}`);
});
