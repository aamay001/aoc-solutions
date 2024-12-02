import { useCallback, useState } from 'react';
import { v4 } from 'uuid';

interface UseFileInputValue {
  FileInput: JSX.Element,
  fileName: string,
  fileData: string,
}

const useFileInput = (
  label: string,
  accept: string,
  id: string,
  helpMessage?: string,
  name?: string,
): UseFileInputValue => {

  const [fileName, setFileName] = useState<string>('');
  const [fileData, setFileData] = useState<string>('');

  const onFileChanged = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const { currentTarget: { value }} = event;

    setFileName(value);
    setFileData('');

    try {
      const file = event?.target?.files?.[0];

      if (file) {

        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const { target } = event;
          if (target?.result) {
            setFileData(target.result as string);
          }
        }

        reader.readAsText(file);

      }
    } catch (error) {

      alert(error);

    }
  }, []);

  const FileInput: JSX.Element = (
    <div className="file-input-wrapper">
      <label htmlFor={id}><strong>{label}</strong></label>
      <div>
        <input
          type="file"
          id={id}
          accept={accept}
          name={name || `fileInput-${v4()}`}
          value={fileName}
          onChange={onFileChanged}
        />
        <button 
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
  );

  return {
    // The input component has to be returned as a JSX Element because
    // the browser will complain about the value being set programmatically
    FileInput,
    fileName,
    fileData,
  };
}

export {
  useFileInput
};