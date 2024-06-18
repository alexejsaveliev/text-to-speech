import {useEffect, useRef} from "react";

/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {

  const currentReadingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = currentReadingRef.current?.firstChild;
    if (node) {
      // @ts-ignore
      CSS.highlights.clear();

      const range = new Range();
      range.setStart(node, currentWordRange[0]);
      range.setEnd(node, currentWordRange[1]);

      // @ts-ignore
      const speechHighlight = new Highlight(range);
      // @ts-ignore
      CSS.highlights.set('text-speech', speechHighlight);
    }
  }, [currentWordRange]);

  return (
      <div className="currently-reading" data-testid="currently-reading">
        <span ref={currentReadingRef} className="currently-reading-text">{sentences[currentSentenceIdx]}</span>
        <p>{sentences.join(' ')}</p>
      </div>
  );
};
