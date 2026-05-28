import {
  ChatConversationMode,
  type ChatRequestPayload,
  type ChatResponsePayload,
} from "@/app/lib/chat";

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return Response.json(
      { error: "BACKEND_URL is not configured." },
      { status: 500 }
    );
  }

  let payload: ChatRequestPayload;

  try {
    payload = (await request.json()) as ChatRequestPayload;
    console.log("Received chat request with payload:", payload);
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (
    typeof payload.message !== "string" ||
    typeof payload.session_id !== "string" ||
    !Object.values(ChatConversationMode).includes(payload.mode) ||
    typeof payload.current_location !== "string"
  ) {
    return Response.json({ error: "Invalid chat payload." }, { status: 400 });
  }
  try {
    const backendResponse = await fetch(backendUrl + "/chat", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const responseText = await backendResponse.text();
    const responseBody = responseText
      ? (JSON.parse(responseText) as ChatResponsePayload | { detail?: unknown })
      : null;

    if (!backendResponse.ok) {
      return Response.json(
        {
          error: "Backend chat request failed.",
          detail: responseBody,
        },
        { status: backendResponse.status }
      );
    }
    // console.log("Chat response from backend:", responseBody);

    return Response.json(responseBody);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to reach backend.";

    return Response.json(
      { error: "Unable to reach backend.", detail: message },
      { status: 502 }
    );
  }
}
