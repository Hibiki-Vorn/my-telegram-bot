// src/index.js
var index_default = {
	async fetch(request, env) {
		const BOT_TOKEN = env.BOT_TOKEN;
		if (request.method !== "POST") return new Response("OK");
		let body;
		try {
			body = await request.json();
		} catch (err) {
			console.error("body is not a json.", err);
			return new Response("Bad Request", { status: 400 });
		}
		const chatId = body.message?.chat?.id;
		const text = body.message?.text;
		console.log("body:", body);
		if (chatId && text) {
			try {
				if (text === `/show_apps`) {
					await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							chat_id: chatId,
							text: `Press a button to open an applet.`,
							reply_markup: {
								inline_keyboard: [
									[
										{ text: "Tool Box", web_app: { url: "https://hieronymus-toolbox.pages.dev/" } },
										{ text: "3D Avatar", web_app: { url: "https://animation-hieronymus-3js.pages.dev/" } },
										{ text: "Secret Post", web_app: { url: "https://secret-post-frontend-reconstructed.pages.dev/" } }
									]
								]
							}
						})
					});
				} else if (text === `/help`) {
					await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							chat_id: chatId,
							text: `Enter /show_apps to open the applet.`
						})
					});
				} else if (text === `/start`) {
					await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							chat_id: chatId,
							text: `You are all set and you can now use the applet.`
						})
					});
				}  else if (text === `/get_chat_id`) {
					await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							chat_id: chatId,
							text: `Your chatID is ${chatId}.`
						})
					});
				} else {
					let replymessage = ""
					if (text[0] === "/") {
						replymessage = "Unsupported command."
					} else {
						replymessage = "The bot cannot understand."
					}
					await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							chat_id: chatId,
							text: replymessage
						})
					});
				}
			} catch (err) {
				console.error("Send Message Failed.", err);
			}
		}
		return new Response("OK");
	}
};
export {
	index_default as default
};
