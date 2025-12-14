import React from "react";
import { BaseNode } from "./baseNode";

/**
 * Enhanced NodeFactory:
 * - Recognizes custom renderers
 * - Recognizes table and complex fields
 */
export function NodeFactory({ id, data = {}, config }) {
  const [state, setState] = React.useState(() => {
    const defaults = {};
    (config.fields || []).forEach((f) => {
      defaults[f.name] = data[f.name] ?? f.defaultValue ?? "";
    });
    return defaults;
  });

  const handleFieldChange = (name, value) => {
    setState((s) => ({ ...s, [name]: value }));
    data.onChange?.(name, value);
  };

  const dynamicHandles =
    typeof config.dynamicHandles === "function"
      ? config.dynamicHandles(state, data)
      : [];

  const allHandles = [
    ...(config.inputs || []),
    ...(config.outputs || []),
    ...dynamicHandles
  ];

  const renderField = (field) => {
    // CUSTOM
    if (field.type === "custom" && field.render) {
      return field.render({ state, setState });
    }

    // TABLE FIELD for API node / List node
    if (field.type === "table") {
      const rows = state[field.name] || [];
      const updateRow = (idx, key, value) => {
        const newRows = [...rows];
        newRows[idx] = { ...newRows[idx], [key]: value };
        handleFieldChange(field.name, newRows);
      };
      const deleteRow = (idx) => {
        const newRows = rows.filter((_, i) => i !== idx);
        handleFieldChange(field.name, newRows);
      };
      const addRow = () => handleFieldChange(field.name, [...rows, { key: "", value: "" }]);

      return (
        <div className="table-editor w-full border border-gray-300 rounded-md p-2 flex flex-col gap-2">
          {rows.map((row, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Key"
                value={row.key}
                onChange={(e) => updateRow(i, "key", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              />
              <input
                placeholder="Value"
                value={row.value}
                onChange={(e) => updateRow(i, "value", e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1"
              />
              <button 
                onClick={() => deleteRow(i)} 
                className="border border-red-500 text-red-500 rounded-md px-2 py-1 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={addRow} className="border border-gray-600 rounded-md px-2 py-1">Add Parameter</button>
        </div>
      );
    }

    // IMAGE UPLOAD FIELD
    if (field.type === "file") {
      const file = state[field.name];
      const previewUrl = file ? URL.createObjectURL(file) : null;
      
      return (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={(e) => handleFieldChange(field.name, e.target.files[0])}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
          Preview:
          {previewUrl && (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-w-full h-auto max-h-48 rounded-md border border-gray-300"
            />
          )}
        </div>
      );
    }

    // TEXTAREA FIELD - auto-resizing
    if (field.type === "textarea") {
      return (
        <textarea
          value={state[field.name]}
          placeholder={field.placeholder}
          onChange={(e) => {
            handleFieldChange(field.name, e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          className="border border-gray-300 rounded-md px-2 py-1 w-full resize-none overflow-hidden"
          style={{ minHeight: '60px' }}
          ref={(el) => {
            if (el) {
              el.style.height = 'auto';
              el.style.height = el.scrollHeight + 'px';
            }
          }}
        />
      );
    }

    // DEFAULT INPUT / SELECT
    return field.type === "select" ? (
      <select
        value={state[field.name]}
        onChange={(e) => handleFieldChange(field.name, e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value} className="px-2 py-1 font-normal text-gray-700">
            {opt.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={field.type || "text"}
        value={state[field.name]}
        placeholder={field.placeholder}
        onChange={(e) => handleFieldChange(field.name, e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 w-full"
      />
    );
  };

  return (
    <BaseNode
      id={id}
      title={config.title}
      className={config.className}
      style={config.style}
      handles={allHandles}
    >
      <div className="flex flex-col gap-6">
        {(config.fields || []).map((field) => (
          <div key={field.name} className="flex flex-row gap-3 ">
            <label className="text-base font-semibold text-gray-600">{field.label}</label>
            {renderField(field)}
          </div>
        ))}
        {config.extraContent &&
          config.extraContent({ id, data, state, setState })}
      </div>
    </BaseNode>
  );
}
