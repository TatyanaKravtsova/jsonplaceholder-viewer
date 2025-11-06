import React, { useEffect, useState } from 'react';

interface PostLengthFilterProps {
  minLength: number;
  maxLength?: number;
  onChange: (next: { minLength: number; maxLength?: number }) => void;
}

export const PostLengthFilter: React.FC<PostLengthFilterProps> = ({ minLength, maxLength, onChange }) => {
  const [minInput, setMinInput] = useState<string>(String(minLength ?? 0));
  const [maxInput, setMaxInput] = useState<string>(typeof maxLength === 'number' ? String(maxLength) : '');

  useEffect(() => {
    setMinInput(String(minLength ?? 0));
  }, [minLength]);

  useEffect(() => {
    setMaxInput(typeof maxLength === 'number' ? String(maxLength) : '');
  }, [maxLength]);

  const commitMin = (raw: string) => {
    const parsedMin = raw === '' ? 0 : Math.max(0, Number(raw));
    const parsedMax = maxInput === '' ? undefined : Math.max(0, Number(maxInput));
    onChange({ minLength: Number.isFinite(parsedMin) ? parsedMin : 0, maxLength: Number.isFinite(parsedMax as number) ? parsedMax : undefined });
  };

  const commitMax = (raw: string) => {
    const parsedMax = raw === '' ? undefined : Math.max(0, Number(raw));
    const parsedMin = minInput === '' ? 0 : Math.max(0, Number(minInput));
    onChange({ minLength: Number.isFinite(parsedMin) ? parsedMin : 0, maxLength: Number.isFinite(parsedMax as number) ? parsedMax : undefined });
  };

  return (
    <div className="post-length-filter">
      <label>
        Min post title length
        <input
          type="number"
          min={0}
          step={1}
          value={minInput}
          onChange={(e) => { const v = e.target.value; setMinInput(v); if (v !== '') commitMin(v); }}
          onBlur={() => commitMin(minInput)}
          onKeyDown={(e) => { if (e.key === 'Enter') { commitMin(minInput); (e.target as HTMLInputElement).blur(); } }}
        />
      </label>
      <label>
        Max post title length
        <input
          type="number"
          min={0}
          step={1}
          value={maxInput}
          placeholder="optional"
          onChange={(e) => { const v = e.target.value; setMaxInput(v); if (v !== '') commitMax(v); }}
          onBlur={() => commitMax(maxInput)}
          onKeyDown={(e) => { if (e.key === 'Enter') { commitMax(maxInput); (e.target as HTMLInputElement).blur(); } }}
        />
      </label>
    </div>
  );
};

export default PostLengthFilter;


