import React from "react";
import Button from "../Button";
import PlayerInfo from "./PlayerInfo";

export default function BattleResult({ players, onRestart }) {
  const [player1, player2] = players;
  const score1 = player1.followers + player1.stars;
  const score2 = player2.followers + player2.stars;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "2em" }}>
        <div>
          <h2>{score1 > score2 ? "Winner 🥳" : "Loser 🥵"}</h2>
          <PlayerInfo player={player1} showReset={false} battleStarted={true} />
        </div>
        <div>
          <h2>{score2 > score1 ? "Winner 🥳" : "Loser 🥵"}</h2>
          <PlayerInfo player={player2} showReset={false} battleStarted={true} />
        </div>
      </div>
      <Button title="Restart 🔄" handleClick={onRestart} />
    </div>
  );
}