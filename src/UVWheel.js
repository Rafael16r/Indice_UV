import React from "react";
import "./UVWheel.css";

function UVCardHalloweenFinal({ uvIndex }) {
  const levels = [
    { label: "Baixo", max: 2, color: "#4caf50", advice: "Aproveita o sol com moderação." },
    { label: "Moderado", max: 5, color: "#ffeb3b", advice: "Usa óculos de sol e protetor." },
    { label: "Alto", max: 7, color: "#ff9800", advice: "Evita exposição prolongada." },
    { label: "Muito Alto", max: 10, color: "#f44336", advice: "Procura sombra e proteção." },
    { label: "Extremo", max: 12, color: "#9c27b0", advice: "Evita o sol. Proteção total." },
  ];

  const level = levels.find((l) => uvIndex <= l.max);

  // Calcula o progresso do medidor UV em %
  const uvProgress = Math.min((uvIndex / 12) * 100, 100);

  return (
    <div className="uv-card-final" style={{ borderColor: level.color }}>
      {/* Fundo animado de névoa */}
      <div className="fog-layer fog1"></div>
      <div className="fog-layer fog2"></div>
      <div className="fog-layer fog3"></div>

      {/* Teias de aranha */}
      <div className="web web-top-left"></div>
      <div className="web web-bottom-right"></div>

      {/* Medidor de UV */}
      <div className="uv-meter">
        <div className="uv-fill" style={{ width: `${uvProgress}%`, backgroundColor: level.color }}></div>
      </div>

      {/* Índice UV */}
      <div className="uv-index" style={{ color: level.color }}>{uvIndex.toFixed(1)}</div>

      {/* Label e conselho */}
      <div className="uv-label">{level.label}</div>
      <div className="uv-advice">{level.advice}</div>

      {/* Ícones animados */}
      <div className="spooky-icon pumpkin">🎃</div>
      <div className="spooky-icon bat bat1">🦇</div>
      <div className="spooky-icon bat bat2">🦇</div>
      <div className="spooky-icon eyes">👀</div>
    </div>
  );
}

export default UVCardHalloweenFinal;