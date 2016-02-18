import React from 'react';

const name = 'GraphBack';

const GraphBack = () => {
  // create background lines
  const lines = [];

  for (let i = 100; i > 0; i -= 5) {
    lines.push(i);
  }

  return (
    <div className={name}>
      {lines.map((line) => {
        return <div className={`${name}_line`} key={line} data-line={line} />;
      })}
    </div>
  );
};

export default GraphBack;
