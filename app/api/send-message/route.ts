export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response("Invalid message", { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN!;
    const chatId = process.env.TELEGRAM_CHAT_ID!;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      throw new Error("Telegram error");
    }

    return Response.json({ success: true });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
