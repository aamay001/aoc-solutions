import { useState, useCallback } from 'react';

interface UseFetchButtonValue {
  FetchButton: React.FC,
  data: string,
  error?: Error | string | number,
}

const useFetchButton = (
  label: string,
  url: string,
  helpMessage?: string,
): UseFetchButtonValue => {

  const [data, setData] = useState<string>('');
  const [error, setError] = useState<Error | string | number | undefined>(undefined);

  const fetchDataFromURL = useCallback(() => {
    const getData = async () => {
      try {
        const res = await fetch(url, { method: 'GET' });

        if (!res.ok) {
          setError(res.status);
          return;
        }

        setData(await res.text());

      } catch (err) {
        setError(err as Error);
      }
    }

    getData();

  }, [url]);

  const FetchButton = () => {
    return (
      <div className="fetch-button-wrapper">
        <label><strong>{label}</strong></label>
        <div>
          <button type="button" onClick={fetchDataFromURL}>Fetch Data</button>
          <button 
            type="button"
            onClick={() => alert(helpMessage)}
            style={{
              borderRadius: 360,
              width: 50,
              height: 50,
              textAlign: 'center'
            }}
          >
            ?
          </button>
        </div>
      </div>
    )
  }
  return {
    FetchButton: () => <FetchButton />,
    data,
    error,
  };
}

export { useFetchButton };