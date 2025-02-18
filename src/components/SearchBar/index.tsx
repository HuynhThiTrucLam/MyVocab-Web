import { Input } from "../ui/input";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import styles from "./styles.module.scss";
import SearchIcon from "@/assets/icons/search.svg?react";
interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <SearchIcon />
      </div>
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && onSearch(search)}
        placeholder="Thêm từ vựng cần tìm ..."
        className={styles.input}
      />
      <Button className={styles.searchButton} onClick={() => onSearch(search)}>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default SearchBar;
