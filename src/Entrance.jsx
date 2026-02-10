import { useAuth } from "./AuthContext";

/** Users can enter their name to receive a token from the API. */
export default function Entrance() {
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the refresh
    const formData = new FormData(e.target); // grab the data [notes on bottom]
    const username = formData.get("name"); // get the name input
    signup(username); //call signup
  };

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        {" "}
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Passing function to our form to use on submit*/}
        <label>
          Name
          <input name="name" />
        </label>
        <button>Respond</button>
      </form>
    </>
  );
}

/* 
What's going on with new FormData(e.target)? This should be an object creation syntax so what's going on here?

e.target is the form element itself (the <form> in DOM)
FormData is a built in JS class (not an object I'm accessing?)
new FormData(e.target) > Creates a new FormData object from the form

Mental Model: "Hey FormData class, take this form and give me an easy way to access all its input value"
*/
