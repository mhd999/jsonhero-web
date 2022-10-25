import { Form } from "remix";
import { useEffect, useState } from "react";

export type UrlFormProps = {
  className?: string;
};

const styles = {
  container: {
    display: 'flex',
    "flex-direction": 'column',
    padding: '50px',
    height: '100%',
    "justify-content": 'center',
    margin: '0 20% 0 20%'
  },
  clearBtn: {
    margin: '50px 0 0 0'
  }
};

export function UrlForm({ className }: UrlFormProps) {
  const [state, setState] = useState({
    data: ""
  });
  useEffect(() => {
    fetch('http://localhost:3330')
      .then((response) => response.json())
      .then((data) => {
        setState({ ...state, data: JSON.stringify(data) });
      });
  }, [])
  function clear(e: any) {
    e.preventDefault();
    setState({ ...state, data: '' });
    fetch('http://localhost:3330', {method: 'delete'})
  }

  return (
    <div style={styles.container}>
      <Form
        method="post"
        action="/actions/createFromUrl"
        className={`${className}`}
      >
        <div className="flex">
          <input
            value={state.data}
            type="text"
            name="jsonUrl"
            id="jsonUrl"
            className="block flex-grow text-base text-slate-200 placeholder:text-slate-300 bg-slate-800 border border-slate-600 rounded-l-sm py-2 px-3 transition duration-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter a JSON URL or paste in JSON here..."
          />
          <button
            type="submit"
            value="Go"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-r-sm text-white bg-lime-500 transition hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          >
            Go
          </button>
        </div>
      </Form>
      <button
        onClick={clear}
        style={styles.clearBtn}
        value="Clear"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-r-sm text-white bg-lime-500 transition hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
      >
        Clear
      </button>
    </div>
  );
}
