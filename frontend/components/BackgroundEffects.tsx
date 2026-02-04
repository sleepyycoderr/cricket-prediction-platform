"use client";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[hsla(280,60%,40%,0.08)] rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[hsla(200,80%,40%,0.08)] rounded-full blur-3xl animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-[hsla(165,70%,35%,0.06)] rounded-full blur-3xl animate-float"
        style={{ animationDelay: "-1.5s" }}
      />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(165,100,255,.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(165,100,255,.2) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
