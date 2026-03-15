export function renderer(data, isExpanded, selectedId) {
  const style = { color: selectedId == data.id ? 'blue' : 'black' };

  if (data.children === undefined) {
    return <span style={style}>[file] {data.name} </span>;
  }

  if (data.children) {
    console.log();
    return (
      <div>
        <span style={{ color: 'blue' }}>{isExpanded ? 'X' : '>'} </span>[folder]
        <span style={style}>{data.name}</span>
      </div>
    );
  }
}
