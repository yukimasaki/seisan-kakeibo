import ReactMarkdown from "react-markdown";
import { markdownString } from "./markdown";

export const AboutPageComponent = () => {
  return (
    <div className="p-4">
      <ReactMarkdown className="markdown">{markdownString}</ReactMarkdown>
    </div>
  );
};
