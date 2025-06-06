import {useState} from 'react';

export function Playboard({onStartQuiz}) {
const [form, setForm] = useState({name: '', category: '', difficulty: ''});
const [fading, setFading] = useState(false);


async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.category || !form.difficulty) {
      alert("Please fill out all fields before starting the quiz.");
      return;
    }
    const apiUrl = `https://opentdb.com/api.php?amount=10&category=${encodeURIComponent(form.category)}&difficulty=${form.difficulty.toLowerCase()}&type=multiple`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("API response:", data);

    if (data.response_code !== 0) {
        alert("No questions found for your selection. Try different options.");
        console.log("API Response Code:", data.response_code);
        console.log("API Response Message:", data.response_message);
        return;
      }

      setFading(true);
      setTimeout(() => {
        onStartQuiz({ ...form, questions: data.results });
      }, 500);
    } catch (err) {
        console.error(err);
      alert("Failed to fetch quiz data. Please try again.");
    }
  }
  return (
    <div className={`playboard${fading ? ' fade-out' : ''}`}>
      <h1>Welcome to the marvelous Fake Quiz App!</h1>
      <h2>Here you can start your quiz journey.</h2>
      <form className="playerInfo-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="name-label">What shall we call you?: </label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="name-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <p>Choose a category and difficulty level to begin.</p>
            <label htmlFor="category">Category:</label>
            <select
                id="category" 
                name="category" 
                className="select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                >


            <option value="">--Choose a category--</option>
            <option value="9">General</option>
            <option value="12">Music</option>
            <option value="15">Video Games</option>
            <option value="11">Film</option> 
        </select>
        <label htmlFor="Difficulty" className="Difficulty-label">Difficulty:</label>
        <select
            id="Difficulty"
            name="Difficulty"
            className="select"
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
            <option value="">--Choose a difficulty--</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
        </select>
        <button className="start-quiz-button">Start Quiz</button>
      </form>

          <div className="quiz-info">

          </div>
    </div>
  );
}
