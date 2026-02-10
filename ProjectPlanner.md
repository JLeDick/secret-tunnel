# Task Planner: Secret Tunnel Project

## Phase 1: User Registration

- [x] Create `signup` function in AuthContext (username → POST `/signup`)
- [x] Save token, set location to "TABLET"
- [x] Hook up Entrance form onSubmit
- [x] Export `signup` in context value

## Phase 2: Token Authentication

- [ ] Create `authenticate` function in AuthContext
- [ ] Check token exists (throw error if not)
- [ ] GET `/authenticate` with Authorization header `Bearer ${token}`
- [ ] On success, set location to "TUNNEL"
- [ ] Hook up Tablet form onSubmit
- [ ] Export `authenticate` in context value

## Phase 3: Extensions _Optional if time permits_

- [ ] Store token in sessionStorage
- [ ] Load token from sessionStorage on mount (useEffect)
- [ ] Add error handling/feedback UI _Currently just freezes on error_

**= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =**
**= = = = = = = = = = = = = = = The big takeaway here is context = = = = = = = = = = = = =**
**= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =**

# What is context?

_Context is our replacement for props when we're going through multiple layers_

# How can I do it?

1. Create the Context

```js
const AuthContext = createContext();
```

This creates the `channel` for sharing data.

2. Provide the Data [Provider]
   I'll wrap the App in a `Provider` component that holds the shared data.
   _This sounds a little bit like we use asyncHandlers. Use this as a mental reference for now._

```js
export function AuthProvider({ children }) {
  const [token, setToken] = useState();

  const signup = (username) => {
    // Stuff goes here
  }

  const value = { token, signup }; // << this is the data we're gonna share

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provier>
}
```

_This seems so unneededly complex all the time. Surely there's easier ways to share data..._

3. Consume the Data [Hook]
   Consoooom
   Any component can now access that data with:

```js
export function useAuth() {
  const context = useContext(AuthContext);
  return context; // This receieves our stuff from above, in this 'context' (ha) it's { token, signup }
}
```

_So basically we're just wrapping our stuff in a complicated function and then snagging it with context._

Also > Tokens.

**==============================================================================**
**=============== What the hell is going on with new FormData? =================**
**==============================================================================**

# const formData = new FormData(e.target)

_This should create a class? So what is it actually doing?_

**What FormData is actually doing**

1. Looks at the form element (e.target)
2. Finds all inputs inside it that have a "name" attribute
3. Creates a key-value map where:

- Key = the "name" attribute
- Value = what the user typed

So it's something like this then?

```js
<input name="name" /> // <!-- user typed "Jason" -->
<input name="email" /> // <!-- user types "Jason@email.com -->
```

Then FormData outputs something like;

```js
{
  "name": "Jason",
  "email": "Jason@email.com"
}
```

Without FormData it's something like this;

```js
const username = e.target.element.name.value;
const email = e.target.element.email.value;
```

With FormData it's something like this;

```js
const formData = new FormData(e.target);
const username = formData.get("name");
const email = formData.get("email");
```

Ok so it basically just packages up our form data so we can query it with .get(). So it's just for .get() and to be a bit cleaner I guess.

**Are there ways to do this without using a class?**

idk let's do this later. Too mych of a rabbit-hole. Doesn't seem to matter for webdev.
