import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import SearchBar from "@/components/SearchBar";
import { WordHeader } from "./components/WordHeader";
import { WordMeaningSection } from "./components/WordMeaningSection";
import { Meaning, Phonetic, WordData } from "./types";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/Spinner";

export default function Dictionary() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const word = searchParams.get("word") || "";
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!word) {
      navigate("/");
    } else {
      async function fetchWord() {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get<WordData[]>(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
          );
          const meanings = response.data[0].meanings;
          // merge all meanings have the same partOfSpeech
          const mergedMeanings = meanings.reduce(
            (acc: Meaning[], curr: Meaning) => {
              const existing = acc.find(
                (m) => m.partOfSpeech === curr.partOfSpeech
              );
              if (existing) {
                existing.definitions.push(...curr.definitions);
              } else {
                acc.push(curr);
              }
              return acc;
            },
            []
          );
          const phonetics = response.data[0].phonetics;
          // merge all phonetics have the same text and have audio
          const mergedPhonetics = phonetics.reduce(
            (acc: Phonetic[], curr: Phonetic) => {
              const existing = acc.find((p) => p.text === curr.text && p.audio);
              if (existing) {
                existing.audio = curr.audio;
              } else {
                acc.push(curr);
              }
              return acc;
            },
            []
          );
          setWordData({
            ...response.data[0],
            meanings: mergedMeanings,
            phonetics: mergedPhonetics,
          });
        } catch (err) {
          setError("Word not found");
          setWordData(null);
        } finally {
          setIsLoading(false);
        }
      }

      fetchWord();
    }
  }, [word, navigate]);

  const handleSearch = (search: string) => {
    if (search) {
      navigate(`/dictionary?word=${search}`);
    }
  };

  const getAudioUrl = () => {
    if (!wordData?.phonetics) return undefined;
    const phoneticWithAudio = wordData.phonetics.find((p) => p.audio);
    return phoneticWithAudio?.audio;
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeft />
        <span>Trở lại</span>
      </Link>

      <div className={styles.searchSection}>
        <h1 className={styles.title}>Tra cứu từ vựng</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        wordData && (
          <>
            <WordHeader
              word={wordData.word}
              phonetic={wordData.phonetic}
              audioUrl={getAudioUrl()}
            />

            {wordData.meanings.map((meaning, index) => (
              <WordMeaningSection
                key={index}
                partOfSpeech={meaning.partOfSpeech}
                definitions={meaning.definitions}
                synonyms={meaning.synonyms}
                antonyms={meaning.antonyms}
              />
            ))}
          </>
        )
      )}
    </div>
  );
}
