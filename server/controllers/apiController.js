// server/controllers/apiControllers.js
export const getAIResponse = async (req, res) => {
  try {
    const { userInput } = req.body;

    const prompt = buildPrompt(userInput);
    const aiResponse = await genAIClient.generate(prompt);

    res.json({ ok: true, result: aiResponse }); // ✅ match frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
};
