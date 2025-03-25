function StarRating({ size, onRate }) {
  const [lastRated, setLastRated] = useState(-1);
  const [hover, setHover] = useState(-1);

  const handleRating = (id) => {
    onRate(id + 1);
    setLastRated(id);
  };

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: size }, (_, index) => (
        <Star
          key={index}
          className="cursor-pointer transition-all duration-200"
          fill={
            index <= (hover !== -1 ? hover : lastRated) ? "yellow" : "white"
          }
          color="grey"
          onClick={() => handleRating(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(-1)}
        />
      ))}
    </div>
  );
}
