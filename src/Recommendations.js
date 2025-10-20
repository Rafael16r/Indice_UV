import React from "react";

function Recommendations({ uvIndex }) {
  let rec = "";
  let icon = "";

  if (uvIndex <= 2) {
    rec = "Baixo: Pode ficar ao sol com segurança.";
    icon = "🌞";
  } else if (uvIndex <= 5) {
    rec = "Moderado: Use proteção solar e óculos de sol.";
    icon = "🕶️";
  } else if (uvIndex <= 7) {
    rec = "Alto: Evite exposição direta e use chapéu.";
    icon = "👒";
  } else if (uvIndex <= 10) {
    rec = "Muito alto: Evite exposição, use protetor e roupa adequada.";
    icon = "🧴";
  } else {
    rec = "Extremo: Evite exposição ao sol e proteja-se ao máximo.";
    icon = "🚫";
  }

  return (
    <div className="recommendation-card">
      <h3>{icon} Recomendações</h3>
      <p>{rec}</p>
    </div>
  );
}

export default Recommendations;
