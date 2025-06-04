import React, { useEffect, useState } from "react";
import styles from "../style.module.scss";
import EXAMS from "@/assets/icons/exams.svg?react";
import { Band, mockBand } from "../../types/Bands";

interface BandSidebarProps {
  activeBand: Band;
  onSelect: (band: Band) => void;
}

const BandSidebar = ({ activeBand, onSelect }: BandSidebarProps) => {
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    setBands(mockBand);
  }, [activeBand]);

  return (
    <aside className={styles.bandSidebar}>
      {bands.map((band) => (
        <button
          key={band.id}
          onClick={() => onSelect(band)}
          className={`${styles.bandButton} ${
            activeBand.id === band.id
              ? "bg-[#d0f5eb] font-semibold"
              : "hover:bg-[#e0f7f1]"
          }`}
        >
          <div className="flex items-center gap-1">
            <EXAMS className={styles.bandIcon} />
            {band.name}
          </div>
        </button>
      ))}
    </aside>
  );
};

export default BandSidebar;
