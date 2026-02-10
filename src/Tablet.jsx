import { useAuth } from "./AuthContext";

/** Button that attempts to use the token in context when clicked */
export default function Tablet() {
  // TODO: call authenticate when form is submitted
  const { authenticate } = useAuth();

  const handleAuthenticate = (e) => {
    e.preventDefault();
    authenticate();
  };

  return (
    <section>
      <p>
        The sound of your name thuds against the gate as the two badgers furrow
        their brows. The badger on the right beckons you to approach.
      </p>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p>"Only those who are pure of heart may pass."</p>
      <p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        "Place your hand upon this stone tablet, and thus will your true self be
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        revealed."
      </p>
      <p>
        It holds out a rectangular stone tablet carved with an intricate design.
      </p>
      <form onSubmit={handleAuthenticate}>
        <button>Place your palm upon the tablet.</button>
      </form>
    </section>
  );
}
