const sliceDesc = (desc) => {
  let text = desc;
  if (text.length > 200) {
    for (let i = 200; i < text.length; i++) {
      if (text[i] === " ") {
        text = text.slice(0, i) + "...";
      }
    }
  }
  return text;
};

export default sliceDesc;
