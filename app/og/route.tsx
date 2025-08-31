import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "未知道";
  const description = searchParams.get("description") || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0b0b0f",
          color: "#fff",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 58, fontWeight: 700, textAlign: "center" }}>
          {title}
        </div>
        {description ? (
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              opacity: 0.8,
              textAlign: "center",
              maxWidth: 1000,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
