import React from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  display?: boolean;
}

export const MathView: React.FC<MathViewProps> = ({ math, display = false }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: display,
      throwOnError: false
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (e) {
    return <span>{math}</span>;
  }
};
