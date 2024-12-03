import { useState } from 'react';
import { v4 } from 'uuid';

interface UseCheckBoxValue {
  CheckBox: React.FC,
  checked: boolean,
}

const useCheckBox = (
  label: string,
  id: string,
  defaultValue?: boolean,
  name?: string,
): UseCheckBoxValue => {
  
  const [checked, setChecked] = useState<boolean>(defaultValue || false);

  const CheckBox: JSX.Element = (
    <div className="checkbox-input">
      <label htmlFor={id}>
        <strong>{label || 'Check Box'}</strong>
      </label>
      &nbsp;
      <input 
        type="checkbox" 
        id={id}
        name={name || `checkbox-input-${v4()}`}
        checked={checked} 
        onChange={() => setChecked(!checked)} 
      />
    </div>
  );

  return {
    CheckBox: () => (<>{CheckBox}</>),
    checked,
  };
}

export { useCheckBox };