import { useState, useEffect } from "react";

const defaultFormData = {
  title: "",
  image: "",
  content: "",
  categories: ["HTML", "CSS", "JS", "Php", "Express", "NODE", "React.js"],
  published: false,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);

  const fetchPosts = () => {
    fetch("http://127.0.0.1:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(() => [...data]);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFormData = (e) => {
    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((formData) => ({
      ...formData,
      [e.target.name]: newValue,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.image ||
      !formData.content ||
      !formData.published
    )
      return alert("Riempi tutti i campi");

    setPosts((posts) => [...posts, { ...formData }]);
    setFormData(defaultFormData);
  };

  const handleDelete = (id) => {
    setPosts([...posts.filter((post) => post.id !== id)]);
  };

  return (
    <>
      <header>
        <h1>REACT BLOG FORM</h1>
      </header>
      <main>
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Titolo</label>
            <input
              name="title"
              onChange={handleFormData}
              type="text"
              className="form-input"
              id="title"
              value={formData.title}
            />
            <label htmlFor="image">Image</label>
            <input
              name="image"
              onChange={handleFormData}
              type="text"
              className="form-input"
              id="image"
              value={formData.image}
            />
            <label htmlFor="content">Description</label>
            <textarea
              name="content"
              onChange={handleFormData}
              className="form-input text-area"
              id="content"
              value={formData.content}
            />
            <div>
              <label htmlFor="published">Published</label>
              <input
                name="published"
                checked={formData.published}
                onChange={handleFormData}
                type="checkbox"
                className="form-input checkbox"
                id="published"
              />
              <select
                name="category"
                onChange={handleFormData}
                className="form-input select"
              >
                {formData.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button className="form-button">AGGIUNGI</button>
          </form>
          <div className="card-wrapper">
            {posts.map((post) => (
              <div className="card" key={post.id}>
                <div className="card-header">
                  <img className="card-image" src={post.image} />
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => handleDelete(post.id)}
                  ></i>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-description">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
