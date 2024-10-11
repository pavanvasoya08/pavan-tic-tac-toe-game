import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [PlayerName, SetPlayerName] = useState(initialName);
  const [isEditing, SetIsEditing] = useState(false);

  function handleEditClick() {
    SetIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, PlayerName);
    }
  }

  function handleChange(event) {
    SetPlayerName(event.target.value);
  }

  let EditPlayerName = <span className="player-name">{PlayerName}</span>;

  if (isEditing) {
    EditPlayerName = (
      <input type="text" required value={PlayerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {EditPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
