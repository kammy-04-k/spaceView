import React, { useState } from "react";
import "./ParamCard.css";

interface ParamCardProps {
  title: string;
  showDateInput?: boolean;
  onPickDate?: (date?: string) => void;
  showCountInput?: boolean;
  onPickCount?: (count: number) => void;
}

const ParamCard: React.FC<ParamCardProps> = ({
  title,
  showDateInput = true,
  onPickDate,
  showCountInput = false,
  onPickCount,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [count, setCount] = useState<number>(5);

  const handleSubmit = () => {
    if (showDateInput && onPickDate) {
      onPickDate(selectedDate || undefined);
    }
    if (showCountInput && onPickCount) {
      onPickCount(Math.min(Math.max(count, 1), 100)); // clamp count between 1 and 100
    }
  };

  return (
    <div className="param-card">
      <h3>{title}</h3>

      {showDateInput && (
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="param-date-input"
        />
      )}

      {showCountInput && (
        <input
          type="number"
          value={count}
          min={1}
          max={100}
          onChange={(e) => setCount(Number(e.target.value))}
          className="param-date-input"
        />
      )}

      <button onClick={handleSubmit}>
        {showDateInput ? "Show Photo" : "Fetch Photos"}
      </button>
    </div>
  );
};

export default ParamCard;
