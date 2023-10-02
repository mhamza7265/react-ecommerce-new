function ScrollToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <a
        id="scrollUp"
        onClick={handleClick}
        style={{ position: "fixed", zIndex: "2147483647", cursor: "pointer" }}
      >
        <i className="fi-rs-arrow-small-up"></i>
      </a>
    </div>
  );
}

export default ScrollToTop;
