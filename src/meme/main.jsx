import { useEffect, useState } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    imgURL:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.adobe.com%2Fuk%2Fexpress%2Flearn%2Fblog%2Fwhat-is-a-meme&psig=AOvVaw0jkGKTFVKf7ZwomYpvG-nj&ust=1760426276740000&source=images&cd=vfe&opi=89978449&ved=0CAMQjB1qFwoTCMiBrozRoJADFQAAAAAdAAAAABAE",
    topText: "One does not simply",
    bottomText: "Walk into a mirror",
  });

  const [allMemes, setAllMemes] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((response) =>
        setAllMemes(response.data.memes)
      );
  }, []);

  function getRandomImg() {
    const rndmNum = Math.floor(Math.random() * allMemes.length);
    setMeme(prev => ({
        ...prev,
        imgURL: allMemes[rndmNum].url
    } 
))
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            name="topText"
            placeholder={meme.topText}
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder={meme.bottomText}
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </label>
        <button onClick={getRandomImg}>Get a new meme image</button>
      </div>

      <div className="meme" aria-live="polite">
        <img src={meme.imgURL} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
