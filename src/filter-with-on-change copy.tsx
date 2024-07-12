import { useSearchParams } from "react-router-dom";
import { categories } from "./data";
import "./App.css";

function OnChangeFilter() {
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const handleChangeRadio = (keyFilter: string, value: string) => {
    const current = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...current, [keyFilter]: value });
  };

  const handleChangeCheckbox = (keyFilter: string, value: string) => {
    const current = Object.fromEntries(searchParams.entries());

    const valuesKey = searchParams.get(keyFilter);

    let string = value;

    if (!!valuesKey) {
      const valuesRaw = valuesKey.split("-");
      if (valuesRaw.includes(value)) {
        // remove selected filter value
        string = valuesRaw.filter((v) => v !== value).join("-");
      } else {
        // append new value
        string = [...valuesRaw, value].join("-");
      }
    }

    if (!string) {
      const copy = { ...current };
      // remove key filter when has no value
      delete copy[keyFilter];
      setSearchParams(copy);
      return;
    }

    setSearchParams({ ...current, [keyFilter]: string });
  };

  return (
    <div className="main">
      <aside>
        {categories.map((cat) => {
          return (
            <div key={cat.key} className="category-filter">
              <h5>{cat.label}</h5>

              <div className="category-filter-options">
                {cat.type === "radio"
                  ? cat.options.map((op) => {
                      const value = searchParams.get(cat.key);
                      return (
                        <div
                          key={op.value}
                          className="category-filter-option-item"
                        >
                          <label htmlFor={op.value}>
                            <input
                              id={op.value}
                              type="radio"
                              value={op.value}
                              checked={op.value === value}
                              name={`${cat.key}`}
                              onChange={() =>
                                handleChangeRadio(cat.key, op.value)
                              }
                            />
                            {op.label}
                          </label>
                        </div>
                      );
                    })
                  : cat.options.map((op) => {
                      const value = searchParams.get(cat.key)?.split("-") || [];
                      return (
                        <div
                          key={op.value}
                          className="category-filter-option-item"
                        >
                          <label htmlFor={op.value}>
                            <input
                              id={op.value}
                              type="checkbox"
                              value={op.value}
                              checked={value.includes(op.value)}
                              name={`${cat.key}`}
                              onChange={() =>
                                handleChangeCheckbox(cat.key, op.value)
                              }
                            />
                            {op.label}
                          </label>
                        </div>
                      );
                    })}
              </div>
            </div>
          );
        })}
      </aside>
      <main>
        <pre>
          {JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)}
        </pre>
      </main>
    </div>
  );
}

export { OnChangeFilter };
