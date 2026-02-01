import OpenAI from "openai";

const API_KEY = "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";

const openai = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

async function checkGroq() {
    console.log("Testing Groq Key...");
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Hello" }],
            model: "llama-3.3-70b-versatile",
        });
        console.log("✅ SUCCESS: Groq is working!");
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.log(`❌ FAILED: ${error.message}`);
    }
}

checkGroq();
