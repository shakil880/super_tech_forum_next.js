import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0f172a 0%, #0f766e 100%)",
          borderRadius: 120,
        }}
      >
        <div
          style={{
            width: 340,
            height: 340,
            borderRadius: 96,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "0 40px 120px rgba(15, 23, 42, 0.35)",
          }}
        >
          <div
            style={{
              width: 220,
              height: 164,
              borderRadius: 44,
              background: "linear-gradient(180deg, #ffffff 0%, #d1fae5 100%)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "inset 0 -2px 0 rgba(15,118,110,0.15)",
            }}
          >
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 42 }}>
              <div style={{ width: 18, height: 18, borderRadius: 999, background: "#0f172a" }} />
              <div style={{ width: 18, height: 18, borderRadius: 999, background: "#0f172a" }} />
              <div style={{ width: 18, height: 18, borderRadius: 999, background: "#0f172a" }} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 46,
                bottom: -30,
                width: 52,
                height: 52,
                borderRadius: 18,
                background: "#ecfdf5",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}