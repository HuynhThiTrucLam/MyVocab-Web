import { useState } from "react";
import BandSidebar from "./sidebar/BandSidebar";
import styles from "./style.module.scss";
import { Card } from "@/components/ui/card";
import SidebarContent from "./sidebar/SidebarContent";
import { Band, mockBand } from "../types/Bands";
import { mockExams } from "../types/Exams";

const ListeningTab = () => {
  const [activeBand, setActiveBand] = useState<Band>(mockBand[0]);

  return (
    <div className="py-3">
      <h1 className="text-[20px] font-bold mb-6">
        Tổng hợp đề Listening theo các band điểm
      </h1>
      <Card className={styles.listeningTab}>
        <Card className={styles.bandSidebar}>
          <BandSidebar activeBand={activeBand} onSelect={setActiveBand} />
        </Card>
        <SidebarContent
          activeBand={activeBand}
          description={activeBand.description}
          testsMock={mockExams}
        />
      </Card>
    </div>
  );
};

export default ListeningTab;
