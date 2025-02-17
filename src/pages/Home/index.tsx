import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import MAN_BG from "@/assets/icons/man_bg.svg?react";
import BOOKMARK from "@/assets/icons/bookmark.svg?react";
import CHATBOX from "@/assets/icons/chatbox.svg?react";
import SEARCH from "@/assets/icons/search.svg?react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <div className="relative">
        <h1 className={styles.title}>Tra cứu từ vựng</h1>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <SEARCH />
          </div>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Thêm từ vựng cần tìm ..."
            className={styles.searchInput}
          />
          <Button className={styles.searchButton}>
            <ArrowRight />
          </Button>
        </div>

        {/* Illustration */}
        <div className={styles.illustration}>
          <MAN_BG />
        </div>

        {/* Quote */}
        <p className={styles.quote}>
          <span>"Nothing</span> is impossible"
        </p>
      </div>

      {/* Feature Cards */}
      <div className={styles.featureGrid}>
        <Link to="/my-vocab">
          <Card className={styles.featureCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <BOOKMARK />
              </div>
              <h2 className={styles.cardTitle}>Từ vựng của tôi</h2>
              <p className={styles.cardDescription}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/chatbox">
          <Card className={styles.featureCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <CHATBOX />
              </div>
              <h2 className={styles.cardTitle}>Chatbox</h2>
              <p className={styles.cardDescription}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
