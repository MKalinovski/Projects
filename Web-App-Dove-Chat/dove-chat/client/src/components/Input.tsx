import React, { useState } from "react";

interface Props {
  defautValue?: string;
}

export const Input: React.FC<Props> = (props: Props) => {
  const { defautValue } = props;

  const [value, setValue] = useState<string | undefined>(defautValue);

  return (
    <input value={value} onChange={(e) => setValue(e.target.value)}></input>
  );
};
